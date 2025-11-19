export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '联系我们页面',
    icon: 'phone',
    preview: true
  },
  fields: {
    add: {
      notificationEmail: {
        type: 'string',
        label: '通知邮箱',
        required: true,
        def: 'melanie@wenaili.com'
      },
      contactHeading: {
        type: 'string',
        label: '联系方式标题',
        def: '联系方式'
      },
      contactItems: {
        type: 'array',
        label: '联系信息项',
        titleField: 'title',
        def: [
          {
            iconClass: 'fa-solid fa-location-dot',
            title: '公司地址',
            description: '上海市奉贤区场中路629号'
          },
          {
            iconClass: 'fa-solid fa-phone',
            title: '联系电话',
            description: '17367332304'
          },
          {
            iconClass: 'fa-solid fa-envelope',
            title: '电子邮箱',
            description: 'melanie@wenaili.com'
          },
          {
            iconClass: 'fa-regular fa-clock',
            title: '工作时间',
            description: '周一至周日 9:00-18:00'
          }
        ],
        fields: {
          add: {
            iconClass: {
              type: 'string',
              label: '图标类名',
              def: 'fa-solid fa-location-dot',
              help: '输入 Font Awesome 图标类名'
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
      faqHeading: {
        type: 'string',
        label: '常见问题标题',
        def: '常见问题'
      },
      faqItems: {
        type: 'array',
        label: '常见问题项',
        titleField: 'question',
        def: [
          {
            question: '贵公司提供哪些货代企业代运营服务？',
            answer: '我们主要提供市场部代运营和技术部代运营两大核心服务，具体包括市场策划、品牌推广、获客转化、网站建设、系统开发、数据分析等服务内容。'
          },
          {
            question: '企业需要准备哪些资料来开展代运营合作？',
            answer: '企业需要提供基本的公司介绍、现有业务情况、目标市场和客户群体、现有营销和技术资源等信息，我们会根据这些信息制定个性化的代运营方案。'
          },
          {
            question: '代运营服务的周期和费用如何计算？',
            answer: '我们的代运营服务周期通常为3-12个月，费用根据服务内容、企业规模和服务周期等因素综合确定。我们会在前期沟通后提供详细的报价方案。'
          }
        ],
        fields: {
          add: {
            question: {
              type: 'string',
              label: '问题',
              required: true
            },
            answer: {
              type: 'string',
              label: '答案',
              textarea: true,
              required: true
            }
          }
        }
      },
      formHeading: {
        type: 'string',
        label: '表单标题',
        def: '发送咨询'
      },
      formDescription: {
        type: 'string',
        label: '表单描述',
        textarea: true,
        def: '请填写以下表单，我们的专业团队将在24小时内与您联系，为您提供货代企业运营解决方案。'
      },
      formText: {
        type: 'object',
        label: '表单字段文案',
        fields: {
          add: {
            nameLabel: {
              type: 'string',
              label: '姓名标签',
              def: '姓名'
            },
            namePlaceholder: {
              type: 'string',
              label: '姓名占位符',
              def: '姓名'
            },
            emailLabel: {
              type: 'string',
              label: '邮箱标签',
              def: '电子邮箱'
            },
            emailPlaceholder: {
              type: 'string',
              label: '邮箱占位符',
              def: '电子邮箱'
            },
            phoneLabel: {
              type: 'string',
              label: '电话标签',
              def: '联系电话'
            },
            phonePlaceholder: {
              type: 'string',
              label: '电话占位符',
              def: '联系电话'
            },
            subjectLabel: {
              type: 'string',
              label: '主题标签',
              def: '咨询主题'
            },
            subjectPlaceholder: {
              type: 'string',
              label: '主题占位符',
              def: '咨询主题'
            },
            messageLabel: {
              type: 'string',
              label: '内容标签',
              def: '咨询内容'
            },
            messagePlaceholder: {
              type: 'string',
              label: '内容占位符',
              def: '咨询内容'
            },
            consentText: {
              type: 'string',
              label: '隐私条款文案',
              def: '我已阅读并同意隐私政策和服务条款'
            },
            submitText: {
              type: 'string',
              label: '提交按钮文案',
              def: '提交咨询'
            },
            loadingText: {
              type: 'string',
              label: '提交中提示文案',
              def: '提交中，请稍候...'
            },
            successText: {
              type: 'string',
              label: '成功提示文案',
              def: '提交成功，我们将在24小时内与您联系。'
            },
            errorText: {
              type: 'string',
              label: '失败提示文案',
              def: '提交失败，请稍后再试或直接联系我们。'
            }
          }
        }
      }
    },
    group: {
      contact: {
        label: '联系方式设置',
        fields: ['contactHeading', 'contactItems']
      },
      faq: {
        label: '常见问题设置',
        fields: ['faqHeading', 'faqItems']
      },
      form: {
        label: '表单设置',
        fields: ['notificationEmail', 'formHeading', 'formDescription', 'formText']
      }
    }
  },
  methods(self) {
    return {
      sanitizeText(value) {
        if (!value) {
          return '';
        }
        if (Array.isArray(value)) {
          return value
            .map((item) => self.sanitizeText(item))
            .filter(Boolean)
            .join(', ');
        }
        return String(value).trim();
      },
      parseEmailList(value) {
        const sanitized = self.sanitizeText(value);
        if (!sanitized) {
          return [];
        }
        return sanitized
          .split(/[,;]/)
          .map((entry) => entry.trim())
          .filter(Boolean);
      },
      async handleSubmit(req) {
        const body = req.body || {};
        const hasOwn = Object.prototype.hasOwnProperty;
        const getField = (candidates = [], fallback = '') => {
          for (const key of candidates) {
            if (hasOwn.call(body, key)) {
              const value = self.sanitizeText(body[key]);
              if (value) {
                return value;
              }
            }
          }
          return fallback;
        };
        const name = getField(['name', 'userName', 'username', 'contactName', 'customerName'], '未填写');
        const email = getField(['email', 'userEmail', 'contactEmail']);
        const phone = getField(['phone', 'tel', 'telephone', 'mobile', 'contactPhone']);
        const subject = getField(['subject', 'suject', 'title', 'topic']);
        const message = getField(['message', 'content', 'body', 'remark', 'comments']);
        const consentSource = body.privacy ?? body.agree ?? body.acceptPrivacy ?? body.acceptPolicy;
        const consent = (() => {
          if (typeof consentSource === 'boolean') {
            return consentSource;
          }
          if (typeof consentSource === 'number') {
            return consentSource === 1;
          }
          if (typeof consentSource === 'string') {
            return [ 'true', 'on', '1', 'yes', 'y' ].includes(consentSource.toLowerCase());
          }
          return false;
        })();
        const pageId = getField(['pageId', 'page_id', 'docId', 'doc_id', 'pieceId']);
        const widgetId = getField(['widgetId', 'widget_id']);

        const notificationEmailRaw = body.notificationEmail ?? body.to ?? body.receiver;
        const toAddresses = self.parseEmailList(notificationEmailRaw || self.options.defaultNotificationEmail);
        if (!toAddresses.length) {
          self.apos.util.error('contact-page-widget: 未配置通知邮箱，邮件未发送。');
          req.res.status(500);
          return {
            success: false,
            message: '配置错误：未设置通知邮箱。请联系网站管理员。'
          };
        }

        const emailSubject = self.sanitizeText(body.notificationSubject || body.subject || body.suject || body.title) || self.options.defaultNotificationSubject || '新的咨询提交';
        const emailModule = self.apos.modules['@apostrophecms/email'];
        const configuredSender =
          self.options.defaultFromAddress ||
          emailModule?.options?.transport?.auth?.user ||
          emailModule?.options?.nodemailer?.auth?.user;
        const fromAddress = configuredSender || `no-reply@${req.hostname || 'localhost'}`;

        const formPayload = {
          name,
          email,
          phone,
          subject,
          message,
          consent,
          pageId,
          widgetId
        };
        console.log('formPayload', formPayload);
        try {
          await self.email(
            req,
            'email.html',
            { form: formPayload, submittedAt: new Date().toISOString() },
            {
              to: toAddresses,
              from: fromAddress,
              subject: emailSubject,
              replyTo: email || undefined
            }
          );
        } catch (err) {
          self.apos.util.error('contact-page-widget: 邮件发送失败', err);
          req.res.status(500);
          return {
            success: false,
            message: '抱歉，邮件发送失败，请稍后再试或直接联系我们。'
          };
        }

        return {
          success: true,
          message: '提交成功，我们将在24小时内与您联系。'
        };
      }
    };
  },
  apiRoutes(self) {
    return {
      post: {
        async submit(req) {
          console.log('req', req);
          return self.handleSubmit(req);
        }
      }
    };
  }
};

