const HREFLANG_BY_LOCALE = {
  zh: 'zh-CN',
  en: 'en'
};

const DEFAULT_META = {
  zh: {
    title: '货代市场部代运营与AI/GEO优化服务商｜上海奈李',
    description: '上海奈李专注货代行业市场部与技术部代运营，提供货代GEO优化、AI数字化落地、官网建设、品牌设计与数据分析服务。',
    keywords: [
      '货代市场部代运营',
      '货代技术部代运营',
      '货代GEO优化',
      '货代AI',
      '物流数字营销',
      '上海奈李'
    ]
  },
  en: {
    title: 'Freight Forwarding Marketing & AI/GEO Services | Wenaili',
    description: 'Wenaili provides marketing operations, technology services, AI and GEO optimization, website development, branding and data analytics for freight forwarders.',
    keywords: [
      'freight forwarding marketing',
      'freight forwarding technology',
      'GEO optimization',
      'logistics AI',
      'logistics digital marketing',
      'Wenaili'
    ]
  }
};

const TYPE_META = {
  news: {
    zh: {
      description: '了解国际物流、货代运营、数字营销与行业发展的最新资讯和实用洞察。',
      keywords: [ '货代资讯', '物流资讯', '国际物流', '货代运营' ]
    },
    en: {
      description: 'Read the latest freight forwarding, logistics operations, digital marketing and industry insights.',
      keywords: [ 'freight forwarding news', 'logistics news', 'international logistics', 'freight operations' ]
    }
  },
  'news-page': {
    zh: {
      description: '了解最新的货代物流行业动态、运营趋势、数字营销方法与企业新闻。',
      keywords: [ '货代资讯', '物流行业动态', '国际物流', '货代运营' ]
    },
    en: {
      description: 'Explore freight forwarding news, logistics trends, digital marketing insights and company updates.',
      keywords: [ 'freight forwarding news', 'logistics trends', 'digital marketing', 'Wenaili news' ]
    }
  },
  case: {
    zh: {
      description: '查看上海奈李服务货代企业的真实案例、实施过程与业务增长成果。',
      keywords: [ '货代案例', '物流企业运营', '市场部代运营', '数字化转型' ]
    },
    en: {
      description: 'Explore Wenaili case studies, implementation approaches and growth results for freight forwarding companies.',
      keywords: [ 'freight forwarding case studies', 'logistics operations', 'marketing operations', 'digital transformation' ]
    }
  },
  'case-page': {
    zh: {
      description: '了解上海奈李如何通过市场、技术、品牌与数字化服务帮助货代企业提升运营效率和业务增长。',
      keywords: [ '货代成功案例', '物流企业服务', '货代市场代运营', '货代数字化' ]
    },
    en: {
      description: 'See how Wenaili helps freight forwarding companies improve operations and growth through marketing, technology, branding and digital services.',
      keywords: [ 'freight forwarding success stories', 'logistics services', 'freight marketing', 'digital transformation' ]
    }
  },
  faq: {
    zh: {
      description: '上海奈李为货代企业整理的常见问题解答，涵盖服务、价格、技术支持和企业运营。',
      keywords: [ '货代常见问题', '物流企业服务', '货代运营问答', '奈李服务' ]
    },
    en: {
      description: 'Answers to common questions about Wenaili services, pricing, technical support and freight forwarding operations.',
      keywords: [ 'freight forwarding FAQ', 'logistics services', 'freight operations FAQ', 'Wenaili services' ]
    }
  },
  'faq-page': {
    zh: {
      description: '查找上海奈李货代企业服务、价格、技术支持与运营相关的常见问题解答。',
      keywords: [ '货代常见问题', '物流企业服务问答', '货代技术支持', '奈李服务' ]
    },
    en: {
      description: 'Find answers about Wenaili freight forwarding services, pricing, technical support and business operations.',
      keywords: [ 'freight forwarding FAQ', 'logistics service FAQ', 'technical support', 'Wenaili services' ]
    }
  }
};

const FIXED_PAGE_META = {
  aboutIntro: {
    zh: {
      title: '关于上海奈李｜货代企业运营与数字化服务商',
      description: '了解上海奈李及其面向货代企业的市场运营、技术支持、AI数字化、品牌与网站服务。',
      keywords: [ '上海奈李', '奈李介绍', '货代企业服务', '物流数字化' ]
    },
    en: {
      title: 'About Wenaili | Freight Forwarding Growth Partner',
      description: 'Learn about Wenaili and its marketing, technology, AI, branding and website services for freight forwarding companies.',
      keywords: [ 'about Wenaili', 'freight forwarding services', 'logistics digitalization', 'logistics growth partner' ]
    }
  },
  services: {
    zh: {
      title: '货代企业一站式代运营服务｜上海奈李',
      description: '上海奈李为货代企业提供市场部、技术部、数据分析、官网建设、品牌设计和AI落地等一站式服务。',
      keywords: [ '货代代运营', '货代企业服务', '物流市场运营', '货代数字化' ]
    },
    en: {
      title: 'Freight Forwarding Operations Services | Wenaili',
      description: 'Wenaili provides marketing, technology, analytics, website, branding and AI implementation services for freight forwarders.',
      keywords: [ 'freight forwarding services', 'logistics marketing', 'logistics technology', 'logistics digitalization' ]
    }
  },
  marketing: {
    zh: {
      title: '货代市场部代运营服务｜上海奈李',
      description: '为货代企业提供内容营销、海外推广、客户开发、品牌传播与市场数据分析等市场部代运营服务。',
      keywords: [ '货代市场部代运营', '物流营销', '货代客户开发', '货代品牌推广' ]
    },
    en: {
      title: 'Freight Forwarding Marketing Operations | Wenaili',
      description: 'Marketing operations for freight forwarders, including content, international promotion, lead generation, branding and analytics.',
      keywords: [ 'freight forwarding marketing', 'logistics marketing', 'lead generation', 'freight branding' ]
    }
  },
  tech: {
    zh: {
      title: '货代技术部代运营服务｜上海奈李',
      description: '为货代企业提供系统建设、技术运维、流程自动化、AI工具落地与数字化转型支持。',
      keywords: [ '货代技术部代运营', '物流系统建设', '货代AI工具', '物流数字化转型' ]
    },
    en: {
      title: 'Freight Forwarding Technology Operations | Wenaili',
      description: 'Technology operations for freight forwarders, including systems, maintenance, automation, AI tools and digital transformation.',
      keywords: [ 'freight forwarding technology', 'logistics systems', 'logistics AI tools', 'digital transformation' ]
    }
  },
  data: {
    zh: {
      title: '货代数据分析与运营服务｜上海奈李',
      description: '通过业务、营销与客户数据分析，帮助货代企业建立数据看板、优化决策并提升运营效率。',
      keywords: [ '货代数据分析', '物流数据运营', '货代数据看板', '运营效率提升' ]
    },
    en: {
      title: 'Freight Forwarding Data Analytics | Wenaili',
      description: 'Business, marketing and customer analytics that help freight forwarders build dashboards and improve operational decisions.',
      keywords: [ 'freight analytics', 'logistics data', 'business dashboards', 'operational analytics' ]
    }
  },
  website: {
    zh: {
      title: '货代官网建设与SEO优化｜上海奈李',
      description: '面向物流货代企业提供官网策划、设计开发、SEO优化、内容更新和数据分析服务。',
      keywords: [ '货代官网建设', '物流网站建设', '货代SEO优化', '货代网站运营' ]
    },
    en: {
      title: 'Freight Forwarding Website & SEO Services | Wenaili',
      description: 'Website strategy, design, development, SEO, content and analytics services for logistics and freight forwarding companies.',
      keywords: [ 'freight forwarding website', 'logistics website design', 'freight SEO', 'website operations' ]
    }
  },
  brand: {
    zh: {
      title: '货代品牌设计与建设服务｜上海奈李',
      description: '为货代企业提供品牌定位、视觉识别、内容体系与品牌传播的一体化设计建设服务。',
      keywords: [ '货代品牌设计', '物流品牌建设', '企业视觉设计', '品牌传播' ]
    },
    en: {
      title: 'Freight Forwarding Brand Design | Wenaili',
      description: 'Brand positioning, visual identity, content systems and communications for freight forwarding companies.',
      keywords: [ 'freight forwarding branding', 'logistics brand design', 'visual identity', 'brand communications' ]
    }
  },
  team: {
    zh: {
      title: '货代AI工具库｜上海奈李',
      description: '探索适用于物流货代企业的AI工具、自动化应用与数字化效率解决方案。',
      keywords: [ '货代AI工具', '物流AI', '货代自动化', 'AI效率工具' ]
    },
    en: {
      title: 'AI Tools for Freight Forwarders | Wenaili',
      description: 'Explore AI tools, automation applications and productivity solutions for logistics and freight forwarding companies.',
      keywords: [ 'freight forwarding AI', 'logistics AI tools', 'freight automation', 'AI productivity' ]
    }
  }
};

function toPlainText(value) {
  if (typeof value !== 'string') {
    return '';
  }

  return value
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function firstText(...values) {
  for (const value of values) {
    const text = toPlainText(value);
    if (text) {
      return text;
    }
  }
  return '';
}

function truncate(value, maxLength) {
  const characters = Array.from(value || '');
  if (characters.length <= maxLength) {
    return value;
  }
  return `${characters.slice(0, maxLength - 1).join('').replace(/[，,。；;：:\s]+$/u, '')}…`;
}

function withBrand(title, language) {
  if (!title || /(?:奈李|wenaili)/i.test(title)) {
    return title;
  }
  return language === 'en'
    ? `${title} | Wenaili`
    : `${title}｜上海奈李`;
}

function normalizeKeywords(...sources) {
  const seen = new Set();
  const keywords = [];

  const add = value => {
    const keyword = toPlainText(value);
    const normalized = keyword.toLocaleLowerCase();
    if (!keyword || seen.has(normalized)) {
      return;
    }
    seen.add(normalized);
    keywords.push(keyword);
  };

  for (const source of sources.flat(Infinity)) {
    if (typeof source !== 'string') {
      continue;
    }
    source.split(/[,，;；]+/).forEach(add);
  }

  return keywords.slice(0, 12).join(',');
}

function resolveMetadata(req) {
  const data = req.data || {};
  const piece = data.piece;
  const page = data.page;
  const home = data.home;
  const document = piece || page || home || {};
  const pathname = String(req.path || req.url || '/')
    .split('?')[0]
    .replace(/\/+$/, '') || '/';
  const isEnglish = req.locale === 'en' ||
    String(document.aposLocale || '').startsWith('en:') ||
    /^\/en(?:\/|$)/.test(pathname);
  const language = isEnglish ? 'en' : 'zh';
  const defaults = DEFAULT_META[language];
  const typeMeta = TYPE_META[document.type]?.[language] || {};
  const fixedMeta = document.type === 'fixed-page'
    ? FIXED_PAGE_META[document.fixedPageTemplate]?.[language] || {}
    : {};
  const explicitTitle = firstText(document.seoTitle);
  const contentTitle = firstText(document.question, document.title);
  let title;

  if (explicitTitle) {
    title = explicitTitle;
  } else if (document.type === '@apostrophecms/home-page') {
    title = defaults.title;
  } else {
    title = fixedMeta.title || withBrand(contentTitle, language) || defaults.title;
  }

  const explicitDescription = firstText(document.seoDescription);
  const fallbackDescription = firstText(
    document.excerpt,
    document.summary,
    document.answer2,
    document.description,
    document.heroSubtitle,
    fixedMeta.description,
    typeMeta.description,
    home?.seoDescription,
    data.global?.detail,
    defaults.description
  );
  const description = explicitDescription || truncate(fallbackDescription, 180);

  const tagKeywords = Array.isArray(document.tags)
    ? document.tags.map(item => item?.tag)
    : [];
  const explicitKeywords = normalizeKeywords(document.seoKeywords);
  const keywords = explicitKeywords || normalizeKeywords(
    tagKeywords,
    explicitTitle || document.type === '@apostrophecms/home-page'
      ? []
      : contentTitle,
    fixedMeta.keywords,
    typeMeta.keywords,
    defaults.keywords
  );

  return {
    title,
    description,
    keywords,
    language,
    isNotFound: req.res?.statusCode === 404 || data.statusCode === 404
  };
}

export default {
  handlers(self) {
    return {
      '@apostrophecms/page:beforeSend': {
        addResolvedMetadata(req) {
          req.data.seoResolved = resolveMetadata(req);
        },
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
