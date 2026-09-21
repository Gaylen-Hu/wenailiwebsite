import sanitizeHtml from 'sanitize-html';

// 尽量保留用户粘贴的 HTML：除 script/iframe/object/embed 等可执行载体外全放行
const allowedTags = [
  // 分区与标题
  'address', 'article', 'aside', 'footer', 'header', 'hgroup', 'main', 'nav',
  'section', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  // 段落与列表
  'blockquote', 'dd', 'div', 'dl', 'dt', 'figcaption', 'figure', 'hr', 'li',
  'ol', 'p', 'pre', 'ul',
  // 行内文本
  'a', 'abbr', 'b', 'bdi', 'bdo', 'br', 'cite', 'code', 'data', 'dfn', 'em',
  'i', 'kbd', 'mark', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'small', 'span',
  'strong', 'sub', 'sup', 'time', 'u', 'var', 'wbr', 'del', 'ins',
  // 媒体
  'area', 'audio', 'img', 'map', 'picture', 'source', 'track', 'video',
  // 表格
  'caption', 'col', 'colgroup', 'table', 'tbody', 'td', 'tfoot', 'th',
  'thead', 'tr',
  // 表单
  'button', 'datalist', 'fieldset', 'form', 'input', 'label', 'legend',
  'meter', 'optgroup', 'option', 'output', 'progress', 'select', 'textarea',
  // 交互
  'details', 'dialog', 'summary'
];

// New API-authored articles should use semantic markup and the shared article
// stylesheet. The broader list above remains available for existing content.
const semanticAllowedTags = [
  'article', 'aside', 'section', 'h2', 'h3', 'h4', 'h5', 'h6',
  'blockquote', 'dd', 'div', 'dl', 'dt', 'figcaption', 'figure', 'hr', 'li',
  'ol', 'p', 'pre', 'ul',
  'a', 'abbr', 'b', 'br', 'cite', 'code', 'del', 'em', 'i', 'ins', 'kbd',
  'mark', 'q', 's', 'samp', 'small', 'span', 'strong', 'sub', 'sup', 'time',
  'u', 'var', 'wbr',
  'audio', 'img', 'picture', 'source', 'track', 'video',
  'caption', 'col', 'colgroup', 'table', 'tbody', 'td', 'tfoot', 'th',
  'thead', 'tr',
  'details', 'summary'
];

const allowedAttributes = {
  '*': [ 'id', 'class', 'title', 'lang', 'dir', 'hidden', 'role', 'tabindex', 'translate', 'data-*', 'aria-*', 'style' ],
  a: [ 'href', 'target', 'rel', 'download', 'name', 'hreflang', 'type', 'referrerpolicy' ],
  area: [ 'alt', 'coords', 'shape', 'href', 'target' ],
  img: [ 'src', 'srcset', 'sizes', 'alt', 'width', 'height', 'loading', 'decoding', 'crossorigin', 'referrerpolicy', 'ismap', 'usemap' ],
  audio: [ 'src', 'controls', 'preload', 'autoplay', 'loop', 'muted', 'crossorigin' ],
  video: [ 'src', 'poster', 'controls', 'preload', 'autoplay', 'loop', 'muted', 'playsinline', 'width', 'height', 'crossorigin' ],
  source: [ 'src', 'srcset', 'sizes', 'type', 'media', 'width', 'height' ],
  track: [ 'src', 'kind', 'srclang', 'label', 'default' ],
  ol: [ 'start', 'reversed', 'type' ],
  li: [ 'value', 'type' ],
  table: [ 'border', 'cellpadding', 'cellspacing', 'summary', 'width' ],
  td: [ 'colspan', 'rowspan', 'scope', 'headers', 'abbr', 'align', 'valign', 'width', 'height' ],
  th: [ 'colspan', 'rowspan', 'scope', 'headers', 'abbr', 'align', 'valign', 'width', 'height' ],
  col: [ 'span', 'width' ],
  colgroup: [ 'span', 'width' ],
  blockquote: [ 'cite' ],
  q: [ 'cite' ],
  del: [ 'cite', 'datetime' ],
  ins: [ 'cite', 'datetime' ],
  time: [ 'datetime' ],
  details: [ 'open' ],
  dialog: [ 'open' ],
  form: [ 'action', 'method', 'name', 'target', 'enctype', 'novalidate', 'autocomplete' ],
  input: [ 'accept', 'alt', 'autocomplete', 'checked', 'disabled', 'form', 'height', 'list', 'max', 'maxlength', 'min', 'minlength', 'multiple', 'name', 'pattern', 'placeholder', 'readonly', 'required', 'size', 'src', 'step', 'type', 'value', 'width', 'inputmode' ],
  select: [ 'name', 'multiple', 'required', 'size', 'disabled', 'autocomplete' ],
  option: [ 'value', 'selected', 'disabled', 'label' ],
  optgroup: [ 'label', 'disabled' ],
  textarea: [ 'name', 'rows', 'cols', 'placeholder', 'required', 'readonly', 'disabled', 'maxlength', 'minlength', 'wrap', 'autocomplete' ],
  button: [ 'name', 'type', 'value', 'disabled', 'form', 'formaction', 'formmethod', 'formtarget' ],
  label: [ 'for' ],
  fieldset: [ 'disabled', 'name', 'form' ],
  meter: [ 'value', 'min', 'max', 'low', 'high', 'optimum' ],
  progress: [ 'value', 'max' ],
  output: [ 'for', 'name', 'form' ],
  map: [ 'name' ]
};

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'HTML 内容',
    preview: true,
    alias: 'htmlContent'
  },
  fields: {
    add: {
      html: {
        type: 'string',
        label: 'HTML 代码',
        textarea: true,
        help: '推荐只使用标题、段落、列表、引用、图片和表格等语义化 HTML，由网站统一控制排版。'
      },
      styleMode: {
        type: 'select',
        label: '排版模式',
        def: 'semantic',
        choices: [
          {
            label: '统一文章样式（推荐）',
            value: 'semantic'
          },
          {
            label: '保留内联样式（兼容旧内容）',
            value: 'legacy'
          }
        ],
        help: 'API 新建内容请使用 semantic；legacy 仅用于依赖内联样式的旧文章。'
      }
    },
    group: {
      content: {
        label: 'HTML 内容',
        fields: [ 'styleMode', 'html' ]
      }
    }
  },
  helpers(self) {
    return {
      sanitize(html, preserveInlineStyles = false) {
        if (typeof html !== 'string' || !html.length) {
          return '';
        }
        const attributes = Object.fromEntries(
          Object.entries(allowedAttributes).map(([ tag, values ]) => [
            tag,
            preserveInlineStyles
              ? values
              : values.filter(attribute => attribute !== 'style')
          ])
        );

        return sanitizeHtml(html, {
          allowedTags: preserveInlineStyles ? allowedTags : semanticAllowedTags,
          allowedAttributes: attributes,
          // 相对链接、#锚点 不受此限制；仅拦截 javascript: 等危险协议
          allowedSchemes: [ 'http', 'https', 'mailto', 'tel' ],
          // 允许 base64 内嵌图片/音视频
          allowedSchemesByTag: {
            img: [ 'http', 'https', 'data' ],
            source: [ 'http', 'https', 'data' ],
            audio: [ 'http', 'https', 'data' ],
            video: [ 'http', 'https', 'data' ],
            track: [ 'http', 'https', 'data' ]
          },
          // 新窗口打开的链接追加 noopener，尽量不覆盖作者已写的 rel
          transformTags: {
            a: (tagName, attribs) => {
              if (attribs.target === '_blank' && !/\bnoopener\b/.test(attribs.rel || '')) {
                return {
                  tagName,
                  attribs: {
                    ...attribs,
                    rel: attribs.rel ? `${attribs.rel} noopener noreferrer` : 'noopener noreferrer'
                  }
                };
              }
              return { tagName, attribs };
            }
          }
        });
      }
    };
  }
};
