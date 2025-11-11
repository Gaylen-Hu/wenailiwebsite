
export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '联系我们',
  },
  fields: {
    add: {
      notificationEmail: {
        type: 'string',
        label: '通知邮箱',
        required: true,
        def: 'melanie@wenaili.com'
      },
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
          self.apos.util.error('react-contacts-widget: 未配置通知邮箱，邮件未发送。');
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
        console.log('formPayload',formPayload)
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
          self.apos.util.error('react-contacts-widget: 邮件发送失败', err);
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
          console.log('req',req)
          return self.handleSubmit(req);
        }
      }
    };
  },
};