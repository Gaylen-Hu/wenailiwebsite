const HREFLANG_BY_LOCALE = {
  zh: 'zh-CN',
  en: 'en'
};

export default {
  handlers(self) {
    return {
      '@apostrophecms/page:beforeSend': {
        addFaqStructuredData(req) {
          const candidates = req.data.piece?.type === 'faq'
            ? [ req.data.piece ]
            : (req.data.pieces || []);

          req.data.seoFaqEntities = candidates
            .filter(item => item?.question && item?.answer2)
            .map(item => ({
              question: item.question,
              answer: item.answer2
            }));
        },
        addServiceStructuredData(req) {
          const template = req.data.page?.fixedPageTemplate ||
            req.data.doc?.fixedPageTemplate;
          const serviceTemplates = new Set([
            'marketing',
            'tech',
            'data',
            'website',
            'brand',
            'team'
          ]);
          const pathname = String(req.path || req.url || '/')
            .split('?')[0]
            .replace(/\/+$/, '') || '/';

          req.data.seoService = serviceTemplates.has(template) ||
            /^\/(?:en\/)?(?:services\/)?(?:marketing|tech|data|website|brand|team)$/.test(pathname);
        },
        async addSeoAlternates(req) {
          const context = req.data.piece || req.data.page;
          req.data.seoAlternates = [];
          req.data.seoAlternateByLocale = {};
          req.data.seoDefaultAlternate = null;

          if (!context?.aposDocId) {
            return;
          }

          const manager = self.apos.doc.getManager(context.type);
          if (!manager?.find || !manager.isLocalized()) {
            return;
          }

          const locales = Object.keys(self.apos.i18n.getLocales());
          const alternates = [];

          for (const locale of locales) {
            const localeReq = self.apos.util.cloneReq(req, {
              locale,
              mode: req.mode || 'published'
            });
            self.apos.i18n.setPrefixUrls(localeReq);

            let localizedDoc;
            if (
              locale === req.locale &&
              context._url &&
              String(context.aposLocale || '').startsWith(`${locale}:`)
            ) {
              localizedDoc = context;
            } else {
              localizedDoc = await manager
                .find(localeReq, { aposDocId: context.aposDocId })
                .areas(false)
                .relationships(false)
                .toObject();
            }

            if (!localizedDoc?._url) {
              continue;
            }

            const url = self.toCanonicalUrl(localizedDoc._url);
            if (!url) {
              continue;
            }

            alternates.push({
              locale,
              hreflang: HREFLANG_BY_LOCALE[locale] || locale,
              url
            });
          }

          req.data.seoAlternates = alternates;
          req.data.seoAlternateByLocale = Object.fromEntries(
            alternates.map(item => [ item.locale, item.url ])
          );
          req.data.seoDefaultAlternate = (
            alternates.find(item => item.locale === 'zh') || alternates[0]
          )?.url || null;
        }
      }
    };
  },
  methods(self) {
    return {
      toCanonicalUrl(value) {
        try {
          const url = new URL(value, self.apos.baseUrl);
          url.search = '';
          url.hash = '';
          return url.toString();
        } catch (error) {
          return null;
        }
      }
    };
  }
};
