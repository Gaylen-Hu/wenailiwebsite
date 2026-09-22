"""Offline checks for complete NEW article payloads; never sends requests.

Usage: python preflight.py news payload.json [--image cover.jpg]
Python 3 standard library; Pillow optional for image dimensions.
Not a PATCH validator, HTML sanitizer, fact checker or publication approval.
"""
import argparse
import json
import re
import sys
from datetime import date, datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit


class BodyCheck(HTMLParser):
    def __init__(self, errors):
        super().__init__()
        self.errors = errors
        self.text = []

    def handle_starttag(self, tag, attrs):
        if tag in {'html', 'head', 'body', 'h1', 'style', 'script', 'iframe', 'form', 'input'}:
            self.errors.append('正文包含不允许的标签: ' + tag)
        values = dict(attrs)
        if any(k == 'style' or k.startswith('on') for k in values):
            self.errors.append('正文包含内联样式或事件处理器')
        for key in ('src', 'href'):
            if key not in values:
                continue
            url = (values[key] or '').strip()
            parsed = urlsplit(url)
            if parsed.scheme and parsed.scheme.lower() not in {'https', 'http', 'mailto', 'tel'}:
                self.errors.append('不允许的URL协议: ' + key)
            if tag == 'img' and (parsed.scheme != 'https' or not parsed.netloc):
                self.errors.append('正文图片必须为上传后真实HTTPS地址')
        if tag == 'img' and (not values.get('src') or not values.get('alt', '').strip()):
            self.errors.append('正文图片缺少src或alt')

    handle_startendtag = handle_starttag

    def handle_data(self, value):
        self.text.append(value)


def validate(kind, payload):
    errors = []
    warnings = []
    if not isinstance(payload, dict):
        return ['顶层必须为JSON对象'], warnings
    encoded = json.dumps(payload, ensure_ascii=False)
    if re.search(r'__[^\n]*?__|\bTODO\b|\bTBD\b', encoded, re.I):
        errors.append('仍有模板占位符')
    if any(key in payload for key in ('_publish', 'published', 'aposMode', 'aposLocale', '_id')):
        errors.append('新建草稿不应包含发布开关或系统状态/ID字段')
    required = ['title', 'seoTitle', 'seoDescription', 'seoKeywords']
    required += ['excerpt', 'publishedAt'] if kind == 'news' else ['summary', 'company']
    for field in required:
        if not isinstance(payload.get(field), str) or not payload[field].strip():
            errors.append('缺少非空字符串: ' + field)
    choices = {'news': {'industry', 'exhibition', 'company'},
               'case': {'market', 'tech', 'brand', 'consulting', 'digital'}}
    if payload.get('category') not in choices[kind]:
        errors.append('分类不属于该类型枚举')
    wrong = {'news': ('summary', 'company', 'featured'),
             'case': ('excerpt', 'publishedAt', 'highlight')}
    if any(field in payload for field in wrong[kind]):
        errors.append('混入另一内容类型的字段')
    if kind == 'news':
        try:
            value = payload.get('publishedAt', '')
            if not isinstance(value, str) or not re.fullmatch(r'\d{4}-\d{2}-\d{2}', value):
                raise ValueError()
            date.fromisoformat(value)
        except ValueError:
            errors.append('publishedAt必须为有效YYYY-MM-DD')
        if payload.get('readUrl'):
            warnings.append('readUrl非空，列表阅读全文会跳外链；需明确授权此行为')
    covers = payload.get('_coverImage')
    if (not isinstance(covers, list) or len(covers) != 1
            or not isinstance(covers[0], dict)
            or not isinstance(covers[0].get('_id'), str) or not covers[0]['_id'].strip()):
        errors.append('封面必须含且仅含一个图片文档_id对象')
    for field in ('highlight', 'featured'):
        if field in payload and not isinstance(payload[field], bool):
            errors.append(field + '必须为boolean')
    for field, keys in [('tags', ('tag',)), ('results', ('label', 'value'))]:
        if field in payload:
            items = payload[field]
            if not isinstance(items, list) or any(
                not isinstance(item, dict) or any(
                    not isinstance(item.get(k), str) or not item[k].strip() for k in keys
                ) for item in items
            ):
                errors.append(field + '数组条目格式错误')
    times = {}
    for field in ('scheduledPublish', 'scheduledUnpublish'):
        if field not in payload:
            continue
        try:
            raw = payload[field]
            if not isinstance(raw, str) or 'T' not in raw:
                raise ValueError()
            stamp = datetime.fromisoformat(raw.replace('Z', '+00:00'))
            if stamp.tzinfo is None or stamp <= datetime.now(timezone.utc):
                raise ValueError()
            times[field] = stamp
            warnings.append(field + '已设置；必须有排期授权并核对时区，不可立即publish')
        except (ValueError, TypeError):
            errors.append(field + '必须是未来、带时区的ISO时间，不可用boolean')
    if len(times) == 2 and times['scheduledUnpublish'] <= times['scheduledPublish']:
        errors.append('下架时间必须晚于发布时间')
    body = payload.get('body')
    widgets = body.get('items') if isinstance(body, dict) else None
    if not isinstance(widgets, list) or not widgets:
        errors.append('body.items必须是非空数组')
    else:
        for widget in widgets:
            if not isinstance(widget, dict) or widget.get('type') != 'html-content':
                errors.append('本检查器只支持semantic html-content；其他组件需人工核对schema')
                continue
            if widget.get('styleMode') != 'semantic':
                errors.append('html-content必须显式指定styleMode=semantic')
            html = widget.get('html')
            if not isinstance(html, str) or not html.strip():
                errors.append('正文HTML为空')
                continue
            parser = BodyCheck(errors)
            try:
                parser.feed(html)
                parser.close()
                if not ''.join(parser.text).strip():
                    errors.append('正文缺少可读文字')
            except ValueError:
                errors.append('正文包含无法解析的URL或HTML')
    if payload.get('seoRobots'):
        warnings.append('seoRobots非空，请核对是否错误禁止索引/跟随')
    return errors, warnings


def main():
    cli = argparse.ArgumentParser(description=__doc__)
    cli.add_argument('kind', choices=['news', 'case'])
    cli.add_argument('payload', type=Path)
    cli.add_argument('--image', action='append', type=Path, default=[])
    args = cli.parse_args()
    try:
        payload = json.loads(args.payload.read_text(encoding='utf-8-sig'))
    except (OSError, UnicodeError, ValueError) as exc:
        print('FAIL: 无法读取JSON: ' + str(exc))
        return 2
    errors, warnings = validate(args.kind, payload)
    for path in args.image:
        try:
            size = path.stat().st_size
            print('IMAGE: {} | {} bytes'.format(path.name, size))
            if size >= 10 * 1024 * 1024:
                errors.append(path.name + '已超过/达到整个上传请求限额，需压缩')
            elif size > 2 * 1024 * 1024:
                warnings.append(path.name + '超过运营建议2MiB，建议压缩')
            try:
                from PIL import Image
                with Image.open(path) as img:
                    print('IMAGE: {} | {}x{} | {}'.format(path.name, *img.size, img.format))
                    img.verify()
            except ImportError:
                warnings.append('未安装可选Pillow：图片格式、像素和裁切需其他工具检查')
        except (OSError, ValueError) as exc:
            errors.append('无法检查图片: ' + str(exc))
    for item in dict.fromkeys(errors):
        print('FAIL: ' + item)
    for item in dict.fromkeys(warnings):
        print('WARN: ' + item)
    if not errors:
        print('PASS: 结构检查通过；不代表事实、版权、媒体ID真实性、视觉或上线验收通过。')
    return 1 if errors else 0


if __name__ == '__main__':
    sys.exit(main())
