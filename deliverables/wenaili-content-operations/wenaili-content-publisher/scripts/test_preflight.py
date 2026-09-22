"""Offline regression checks. Run: python scripts/test_preflight.py"""
import copy
import unittest
from preflight import validate


class PreflightTests(unittest.TestCase):
    def setUp(self):
        self.payload = {
            'title': '离线测试文章', 'category': 'industry',
            'publishedAt': '2026-09-22', 'excerpt': '仅用于离线测试',
            'seoTitle': '测试标题', 'seoDescription': '测试描述', 'seoKeywords': '测试',
            '_coverImage': [{'_id': 'offline-image-id'}],
            'body': {'items': [{'type': 'html-content', 'styleMode': 'semantic',
                                'html': '<h2>测试</h2><p>不会上传的测试文字。</p>'}]}
        }

    def test_valid_news(self):
        self.assertEqual(validate('news', self.payload)[0], [])

    def test_valid_case(self):
        payload = copy.deepcopy(self.payload)
        for key in ('publishedAt', 'excerpt'):
            del payload[key]
        payload.update(category='tech', company='匿名测试', summary='离线测试')
        self.assertEqual(validate('case', payload)[0], [])

    def test_invalid_variants(self):
        for mutation in [
            {'_publish': True}, {'scheduledPublish': False}, {'category': '物流资讯'},
            {'_coverImage': ['not-an-object']}, {'seoKeywords': ['bad-type']},
            {'title': '__待填写__'}, {'publishedAt': '2026-02-30'},
            {'scheduledPublish': '2099-01-01T09:00:00'},
            {'scheduledPublish': '2020-01-01T09:00:00Z'}
        ]:
            with self.subTest(mutation=mutation):
                payload = copy.deepcopy(self.payload)
                payload.update(mutation)
                self.assertTrue(validate('news', payload)[0])

    def test_html_rejected(self):
        for html in ['<h1>重复标题</h1>', '<p style="color:red">样式</p>',
                     '<img src="data:image/png;base64,aaa" alt="坏图">',
                     '<script>alert(1)</script>', '<img src="https://example.com/a.jpg">']:
            with self.subTest(html=html):
                payload = copy.deepcopy(self.payload)
                payload['body']['items'][0]['html'] = html
                self.assertTrue(validate('news', payload)[0])

    def test_schedule_warning(self):
        self.payload['scheduledPublish'] = '2099-01-01T01:00:00Z'
        errors, warnings = validate('news', self.payload)
        self.assertFalse(errors)
        self.assertTrue(warnings)


if __name__ == '__main__':
    unittest.main()
