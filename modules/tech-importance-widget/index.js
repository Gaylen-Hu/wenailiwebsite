export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '技术重要性洞察',
    icon: 'microchip',
    preview: true
  },
  fields: {
    add: {
      backgroundClasses: {
        type: 'string',
        label: '整体背景类名',
        def: 'bg-gradient-to-br from-gray-50 to-blue-50'
      },
      heading: {
        type: 'string',
        label: '主标题',
        def: '为什么货代公司一定要重视技术？'
      },
      subheading: {
        type: 'string',
        label: '主副标题',
        textarea: true,
        def: '在数字化时代，技术已经成为货代企业提升竞争力的关键因素'
      },
      headingAccentClasses: {
        type: 'string',
        label: '标题底部强调条类名',
        def: 'absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-blue-600 rounded-full'
      },
      challengesTitle: {
        type: 'string',
        label: '痛点标题',
        def: '常见技术痛点'
      },
      challengesItems: {
        type: 'array',
        label: '技术痛点列表',
        titleField: 'title',
        min: 1,
        def: [
          {
            iconClass: 'fa-solid fa-exclamation-circle',
            accentColorClass: 'text-red-500',
            badgeBackgroundClass: 'absolute -right-4 -top-4 w-20 h-20 bg-red-50 rounded-full -z-1',
            title: '系统老旧，效率低下',
            description: '现有系统功能落后，操作复杂，员工需要花费大量时间处理日常业务，效率低下'
          },
          {
            iconClass: 'fa-solid fa-exclamation-circle',
            accentColorClass: 'text-red-500',
            badgeBackgroundClass: 'absolute -right-4 -top-4 w-20 h-20 bg-red-50 rounded-full -z-1',
            title: '数据孤岛，难以整合',
            description: '不同业务系统之间数据不互通，形成数据孤岛，难以进行全面的数据分析和决策支持'
          },
          {
            iconClass: 'fa-solid fa-exclamation-circle',
            accentColorClass: 'text-red-500',
            badgeBackgroundClass: 'absolute -right-4 -top-4 w-20 h-20 bg-red-50 rounded-full -z-1',
            title: '技术人才短缺',
            description: '专业的 IT 技术人才短缺，难以维护和优化现有系统，更无法开发新的应用'
          },
          {
            iconClass: 'fa-solid fa-exclamation-circle',
            accentColorClass: 'text-red-500',
            badgeBackgroundClass: 'absolute -right-4 -top-4 w-20 h-20 bg-red-50 rounded-full -z-1',
            title: '安全隐患大',
            description: '系统安全防护措施不足，存在数据泄露、系统崩溃等安全隐患'
          },
          {
            iconClass: 'fa-solid fa-exclamation-circle',
            accentColorClass: 'text-red-500',
            badgeBackgroundClass: 'absolute -right-4 -top-4 w-20 h-20 bg-red-50 rounded-full -z-1',
            title: '难以适应业务发展',
            description: '随着业务的发展，现有系统难以满足新的业务需求，制约了企业的发展'
          },
          {
            iconClass: 'fa-solid fa-exclamation-circle',
            accentColorClass: 'text-red-500',
            badgeBackgroundClass: 'absolute -right-4 -top-4 w-20 h-20 bg-red-50 rounded-full -z-1',
            title: '技术投入成本高',
            description: '自主开发和维护系统需要大量的资金投入，对于中小型货代企业来说负担较重'
          }
        ],
        fields: {
          add: {
            iconClass: {
              type: 'string',
              label: '图标类名',
              def: 'fa-solid fa-exclamation-circle'
            },
            accentColorClass: {
              type: 'string',
              label: '图标/文字强调颜色类名',
              def: 'text-red-500'
            },
            badgeBackgroundClass: {
              type: 'string',
              label: '右上角强调背景类名',
              def: 'absolute -right-4 -top-4 w-20 h-20 bg-red-50 rounded-full -z-1'
            },
            title: {
              type: 'string',
              label: '痛点标题',
              required: true
            },
            description: {
              type: 'string',
              label: '痛点描述',
              textarea: true,
              required: true
            }
          }
        }
      },
      impactHeading: {
        type: 'string',
        label: '影响区块标题',
        def: '技术痛点对企业的影响'
      },
      impactItems: {
        type: 'array',
        label: '影响卡片',
        titleField: 'title',
        def: [
          {
            iconClass: 'fa-solid fa-chart-pie',
            title: '业务发展受阻',
            description: '技术落后导致业务流程效率低下，难以满足客户需求，制约企业业务发展'
          },
          {
            iconClass: 'fa-solid fa-user-clock',
            title: '人工效率低下',
            description: '员工需要花费大量时间处理繁琐的手动操作，工作效率低下，工作满意度下降'
          },
          {
            iconClass: 'fa-solid fa-trophy',
            title: '竞争力下降',
            description: '在数字化时代，技术落后的货代企业难以与采用先进技术的竞争对手抗衡'
          }
        ],
        fields: {
          add: {
            iconClass: {
              type: 'string',
              label: '图标类名',
              def: 'fa-solid fa-circle-check'
            },
            title: {
              type: 'string',
              label: '标题',
              required: true
            },
            description: {
              type: 'string',
              label: '描述',
              textarea: true,
              required: true
            }
          }
        }
      },
      impactDecorStart: {
        type: 'string',
        label: '影响区块起始装饰背景类',
        def: 'absolute -left-20 -top-20 w-64 h-64 bg-indigo-50 rounded-full -z-1'
      },
      impactDecorEnd: {
        type: 'string',
        label: '影响区块结束装饰背景类',
        def: 'absolute -right-20 -bottom-20 w-64 h-64 bg-blue-50 rounded-full -z-1'
      },
      impactAccentBarClasses: {
        type: 'string',
        label: '影响区块顶部渐变条类',
        def: 'absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-600'
      },
      reasonsHeading: {
        type: 'string',
        label: '选择我们标题',
        def: '为什么选择上海奈李？'
      },
      reasonsHeadingAccent: {
        type: 'string',
        label: '选择我们强调条类名',
        def: 'absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-green-500 rounded-full'
      },
      reasonsItems: {
        type: 'array',
        label: '选择我们理由',
        titleField: 'title',
        def: [
          {
            iconClass: 'fa-solid fa-check-circle',
            accentColorClass: 'text-green-500',
            badgeBackgroundClass: 'absolute -right-4 -top-4 w-20 h-20 bg-green-50 rounded-full -z-1',
            title: '专业的技术团队',
            description: '我们拥有一支经验丰富的技术团队，熟悉物流行业的业务流程和系统需求'
          },
          {
            iconClass: 'fa-solid fa-check-circle',
            accentColorClass: 'text-green-500',
            badgeBackgroundClass: 'absolute -right-4 -top-4 w-20 h-20 bg-green-50 rounded-full -z-1',
            title: '定制化的解决方案',
            description: '根据企业的实际需求，提供定制化的技术解决方案，确保系统符合企业特点'
          },
          {
            iconClass: 'fa-solid fa-check-circle',
            accentColorClass: 'text-green-500',
            badgeBackgroundClass: 'absolute -right-4 -top-4 w-20 h-20 bg-green-50 rounded-full -z-1',
            title: '一站式的代运营服务',
            description: '从系统开发、维护到优化，提供一站式的技术代运营服务，让企业专注于核心业务'
          },
          {
            iconClass: 'fa-solid fa-check-circle',
            accentColorClass: 'text-green-500',
            badgeBackgroundClass: 'absolute -right-4 -top-4 w-20 h-20 bg-green-50 rounded-full -z-1',
            title: '提升管理效率',
            description: '通过定制化的技术工具，帮助货代公司提高管理人效，优化业务流程'
          },
          {
            iconClass: 'fa-solid fa-check-circle',
            accentColorClass: 'text-green-500',
            badgeBackgroundClass: 'absolute -right-4 -top-4 w-20 h-20 bg-green-50 rounded-full -z-1',
            title: '降低运营成本',
            description: '相比自主开发和维护系统，技术代运营能够显著降低企业的技术投入成本'
          },
          {
            iconClass: 'fa-solid fa-check-circle',
            accentColorClass: 'text-green-500',
            badgeBackgroundClass: 'absolute -right-4 -top-4 w-20 h-20 bg-green-50 rounded-full -z-1',
            title: '持续的技术支持',
            description: '提供 7×24 小时的技术支持，确保系统稳定运行，及时解决各种技术问题'
          }
        ],
        fields: {
          add: {
            iconClass: {
              type: 'string',
              label: '图标类名',
              def: 'fa-solid fa-check-circle'
            },
            accentColorClass: {
              type: 'string',
              label: '图标/文字强调颜色类名',
              def: 'text-green-500'
            },
            badgeBackgroundClass: {
              type: 'string',
              label: '右上角强调背景类名',
              def: 'absolute -right-4 -top-4 w-20 h-20 bg-green-50 rounded-full -z-1'
            },
            title: {
              type: 'string',
              label: '标题',
              required: true
            },
            description: {
              type: 'string',
              label: '描述',
              textarea: true,
              required: true
            }
          }
        }
      }
    },
    group: {
      base: {
        label: '基础设置',
        fields: [ 'heading', 'subheading', 'backgroundClasses', 'headingAccentClasses' ]
      },
      challenges: {
        label: '技术痛点',
        fields: [ 'challengesItems' ]
      },
      impact: {
        label: '影响分析',
        fields: [ 'impactHeading', 'impactItems', 'impactAccentBarClasses', 'impactDecorStart', 'impactDecorEnd' ]
      },
      reasons: {
        label: '选择理由',
        fields: [ 'reasonsHeading', 'reasonsHeadingAccent', 'reasonsItems' ]
      }
    }
  }
};

