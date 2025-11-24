export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'AI 工具库展示'
  },
  fields: {
    add: {
      sectionEyebrow: {
        label: '段落上方提示',
        type: 'string',
        def: ''
      },
      sectionTitle: {
        label: '主标题',
        type: 'string',
        required: true,
        def: '奈李AI工具库 - 您的专属智能解决方案'
      },
      sectionSubtitle: {
        label: '副标题',
        type: 'string',
        textarea: true,
        def: '我们将AI工具按场景分类，为您提供量身定制的智能解决方案'
      },
      sections: {
        label: '场景区块',
        type: 'array',
        required: true,
        titleField: 'title',
        max: 6,
        def: [  
          {
            icon: 'fa-solid fa-robot',
            title: '智能客户开发与跟进',
            description: '针对智能客户开发与跟进场景，我们提供专业的AI工具，帮助您实现关键流程的自动化与智能化，提高工作效率，降低运营成本。',
            reverseLayout: false,
            cards: [
              {
                cardIcon: 'fa-solid fa-magnifying-glass-chart',
                cardTitle: '潜客挖掘与画像分析AI',
                cardDescription: '自动从海关数据、行业名录等公开信息中，筛选并分析出符合您目标市场的高潜客户，并生成包括主营品类、出货规律在内的客户画像。',
                benefitIcon: 'fa-solid fa-chart-line',
                benefitText: '您的获益: 精准定位，让销售团队有的放矢，提升开发信成功率。'
              },
              {
                cardIcon: 'fa-solid fa-envelope-circle-check',
                cardTitle: '智能邮件/消息营销中心',
                cardDescription: '超越基础群发。AI根据客户行为（如打开某条航线报价）自动触发个性化跟进邮件，并可进行A/B测试，优化内容策略。',
                benefitIcon: 'fa-solid fa-chart-line',
                benefitText: '您的获益: 实现规模化的一对一沟通，提升客户转化与忠诚度。'
              }
            ]
          },
          {
            icon: 'fa-solid fa-robot',
            title: '智能操作与单证处理',
            description: '针对智能操作与单证处理场景，我们提供专业的AI工具，帮助您实现关键流程的自动化与智能化，提高工作效率，降低运营成本。',
            reverseLayout: true,
            cards: [
              {
                cardIcon: 'fa-solid fa-file-circle-check',
                cardTitle: 'AI单证自动识别与录入',
                cardDescription: '通过OCR技术，自动识别提单、箱单、发票等文件上的关键信息，并一键填入您的TMS/ERP系统，无需手动输入。',
                benefitIcon: 'fa-solid fa-chart-line',
                benefitText: '您的获益: 录入效率提升300%，近乎零错误，解放操作人员。'
              },
              {
                cardIcon: 'fa-solid fa-ship',
                cardTitle: '智能订舱助手',
                cardDescription: '整合多家船公司/航空公司的舱位与价格，AI根据您的历史偏好和当前需求，智能推荐最优订舱选择。',
                benefitIcon: 'fa-solid fa-chart-line',
                benefitText: '您的获益: 简化订舱流程，确保每次选择都是性价比最优解。'
              }
            ]
          },
          {
            icon: 'fa-solid fa-robot',
            title: '智能数据分析与决策支持',
            description: '针对智能数据分析与决策支持场景，我们提供专业的AI工具，帮助您实现关键流程的自动化与智能化，提高工作效率，降低运营成本。',
            reverseLayout: false,
            cards: [
              {
                cardIcon: 'fa-solid fa-calculator',
                cardTitle: '利润预测与报价AI',
                cardDescription: '输入起运港、目的港、货品信息，AI即时核算综合成本，并基于市场行情与预期利润，为您生成建议报价区间。',
                benefitIcon: 'fa-solid fa-chart-line',
                benefitText: '您的获益: 快速响应询价，确保报价的竞争力与盈利能力。'
              },
              {
                cardIcon: 'fa-solid fa-chart-line',
                cardTitle: '货量预测与风险预警平台',
                cardDescription: '分析您的历史出货数据、季节性因素和市场动态，AI预测未来货量趋势，并对潜在运营风险（如航线拥堵、成本波动）提前发出预警。',
                benefitIcon: 'fa-solid fa-chart-line',
                benefitText: '您的获益: 实现科学备货与运力规划，化被动应对为主动管理。'
              }
            ]
          }
        ],
        fields: {
          add: {
            icon: {
              label: '主图标（Font Awesome 类名）',
              type: 'string',
              def: 'fa-solid fa-robot'
            },
            title: {
              label: '区块标题',
              type: 'string',
              required: true
            },
            description: {
              label: '区块描述',
              type: 'string',
              textarea: true
            },
            reverseLayout: {
              label: '内容左右反转',
              type: 'boolean',
              def: false
            },
            cards: {
              label: '工具卡片',
              type: 'array',
              min: 1,
              fields: {
                add: {
                  cardIcon: {
                    label: '卡片图标类名',
                    type: 'string',
                    def: 'fa-solid fa-chart-line'
                  },
                  cardTitle: {
                    label: '卡片标题',
                    type: 'string',
                    required: true
                  },
                  cardDescription: {
                    label: '卡片描述',
                    type: 'string',
                    textarea: true
                  },
                  benefitIcon: {
                    label: '收益图标类名',
                    type: 'string',
                    def: 'fa-solid fa-chart-line'
                  },
                  benefitText: {
                    label: '收益描述',
                    type: 'string',
                    textarea: true
                  }
                }
              }
            }
          }
        }
      }
    },
    group: {
      header: {
        label: '顶部内容',
        fields: ['sectionEyebrow', 'sectionTitle', 'sectionSubtitle']
      },
      body: {
        label: '场景列表',
        fields: ['sections']
      }
    }
  }
};

