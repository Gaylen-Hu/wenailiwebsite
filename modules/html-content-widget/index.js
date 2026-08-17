import sanitizeHtml from 'sanitize-html';

const allowedTags = [
  'address', 'article', 'aside', 'blockquote', 'br', 'caption', 'code', 'col',
  'colgroup', 'dd', 'details', 'div', 'dl', 'dt', 'em', 'figcaption', 'figure',
  'footer', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hr', 'img', 'li',
  'main', 'mark', 'nav', 'ol', 'p', 'picture', 'pre', 'section', 'small',
  'source', 'span', 'strong', 'sub', 'summary', 'sup', 'table', 'tbody', 'td',
  'tfoot', 'th', 'thead', 'time', 'tr', 'u', 'ul', 'video', 'a'
];

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
        required: true,
        help: '粘贴正文 HTML，保存后即可在页面中预览。为保障安全，script、iframe、表单、事件属性及内联样式会被移除。'
      }
    },
    group: {
      content: {
        label: 'HTML 内容',
        fields: [ 'html' ]
      }
    }
  },
  helpers(self) {
    return {
      sanitize(html) {
        return sanitizeHtml(html || '', {
          allowedTags,
          allowedAttributes: {
            '*': [ 'class', 'id', 'title', 'role', 'aria-*', 'data-*' ],
            a: [ 'href', 'name', 'target', 'rel' ],
            img: [ 'src', 'alt', 'width', 'height', 'loading' ],
            source: [ 'src', 'srcset', 'type', 'media' ],
            video: [ 'src', 'controls', 'poster', 'preload', 'width', 'height' ],
            col: [ 'span', 'width' ],
            colgroup: [ 'span', 'width' ],
            td: [ 'colspan', 'rowspan', 'headers' ],
            th: [ 'colspan', 'rowspan', 'headers', 'scope' ],
            time: [ 'datetime' ]
          },
          allowedSchemes: [ 'http', 'https', 'mailto', 'tel' ],
          allowedSchemesByTag: {
            img: [ 'http', 'https', 'data' ],
            source: [ 'http', 'https' ]
          },
          transformTags: {
            a(tagName, attribs) {
              if (attribs.target === '_blank') {
                attribs.rel = 'noopener noreferrer';
              }
              return { tagName, attribs };
            }
          }
        });
      }
    };
  }
};
