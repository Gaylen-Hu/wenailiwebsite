/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-11-10 09:29:27
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-11-11 19:05:57
 * @FilePath: \myapp\apos-app\modules\news\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default {
  extend: '@apostrophecms/piece-type',
  options: {
    label: '新闻资讯',
    pluralLabel: '新闻列表',
    slugPrefix: 'news-'
  },
  fields: {
    add: {
      category: {
        type: 'select',
        label: '资讯分类',
        required: true,
        choices: [
          { value: 'industry', label: '物流资讯' },
          { value: 'exhibition', label: '展会资讯' },
          { value: 'company', label: '公司新闻' }
        ],
        def: 'industry'
      },
      publishedAt: {
        type: 'date',
        label: '发布时间',
        required: true
      },
      author: {
        type: 'string',
        label: '作者',
        def: '奈李资讯团队'
      },  
      coverImage: {
        type: 'attachment',
        label: '封面图片',
        required: true,
        help: '推荐 16:9 比例'
      },
      excerpt: {
        type: 'string',
        label: '资讯摘要',
        textarea: true,
        required: true
      },
      readUrl: {
        type: 'url',
        label: '外部链接（可选）',
        help: '如填写则“阅读全文”会跳转至此链接；否则使用内部详情页'
      },
      tags: {
        type: 'array',
        label: '标签',
        titleField: 'tag',
        fields: {
          add: {
            tag: {
              type: 'string',
              label: '标签名称',
              required: true
            }
          }
        }
      },
      highlight: {
        type: 'boolean',
        label: '热门资讯',
        def: false
      },
      body: {
        type: 'area',
        label: '正文内容',
        options: {
          widgets: {
            '@apostrophecms/rich-text': {},
            '@apostrophecms/image': {},
            '@apostrophecms/video': {},
            
          }
        }
      }
    },
    group: {
      basics: {
        label: '基础信息',
        fields: [ 'title', 'category', 'publishedAt', 'author', 'coverImage', 'excerpt', 'highlight' ]
      },
      metadata: {
        label: '附加信息',
        fields: [ 'readUrl', 'tags' ]
      },
      content: {
        label: '正文内容',
        fields: [ 'body' ]
      }
    }
  },
  handlers(self) { 
    return {
    'afterSave': {
          async sendEmail(req, piece) {
        const options = {
          from: 'wenailisender@163.com',
          to: 'hxyrkcy@outlook.com',
          subject: 'New Article added'
        };
        try {
         const res =  await self.email(req, 'email.html', { piece }, options);
         console.log(res);
        } catch (err) {
          console.log(err);
          self.apos.util.error('email notification error: ', err);
        }
      }
    }
  }
}
};


