export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '品牌升级流程',
    icon: 'list-ol',
    preview: true
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: '标题',
        def: '品牌升级流程'
      },
      description: {
        type: 'string',
        label: '副标题/描述',
        textarea: true,
        def: '我们采用系统化的品牌升级流程，确保每个环节都精准到位'
      },
      steps: {
        type: 'array',
        label: '流程步骤',
        titleField: 'title',
        min: 1,
        max: 10,
        fields: {
          add: {
            stepNumber: {
              type: 'integer',
              label: '步骤编号',
              required: true,
              min: 1
            },
            imageUrl: {
              type: 'url',
              label: '步骤图片地址',
              required: true,
              help: '推荐 4:3 比例，支持外部链接或对象存储地址'
            },
            imageAlt: {
              type: 'string',
              label: '图片替代文本',
              required: true
            },
            icon: {
              type: 'string',
              label: 'Font Awesome 图标类名',
              def: 'fa-solid fa-search',
              help: '例如：fa-solid fa-search, fa-solid fa-bullseye'
            },
            title: {
              type: 'string',
              label: '步骤标题',
              required: true
            },
            description: {
              type: 'string',
              label: '步骤描述',
              textarea: true,
              required: true
            }
          }
        },
        def: [
          {
            stepNumber: 1,
            imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=market%20research%20for%20logistics%20company',
            imageAlt: '市场调研与需求分析',
            icon: 'fa-solid fa-search',
            title: '市场调研与需求分析',
            description: '深入了解达睿贸易的企业定位、目标客户群体和市场竞争环境，明确品牌升级方向'
          },
          {
            stepNumber: 2,
            imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=brand%20positioning%20workshop',
            imageAlt: '品牌定位与Slogan确立',
            icon: 'fa-solid fa-bullseye',
            title: '品牌定位与Slogan确立',
            description: '基于创始人创业初心，提炼达睿贸易核心价值主张，确立全新品牌定位和品牌口号'
          },
          {
            stepNumber: 3,
            imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=logo%20design%20for%20freight%20forwarder',
            imageAlt: '品牌Logo设计与视觉系统',
            icon: 'fa-solid fa-palette',
            title: '品牌Logo设计与视觉系统',
            description: '设计全新品牌标志，打造统一的视觉识别系统，包括配色方案、字体和应用规范'
          },
          {
            stepNumber: 4,
            imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=brand%20marketing%20campaign',
            imageAlt: '品牌市场宣传与推广',
            icon: 'fa-solid fa-bullhorn',
            title: '品牌市场宣传与推广',
            description: '制定全面的品牌宣传策略，通过多渠道推广新品牌形象，提升市场影响力'
          }
        ]
      }
    },
    group: {
      content: {
        label: '内容设置',
        fields: [ 'title', 'description', 'steps' ]
      }
    }
  }
};

