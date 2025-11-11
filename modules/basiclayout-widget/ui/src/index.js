// Basiclayout Widget JavaScript
export default () => {
  class BasiclayoutWidget {
    constructor(element) {
      this.element = element;
      this.init();
    }

    init() {
      this.setupIntersectionObserver();
      this.setupScrollEffects();
      this.setupParallaxEffect();
      this.setupResponsiveAdjustments();
    }

    // 设置交叉观察器用于动画
    setupIntersectionObserver() {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateElements(entry.target);
          }
        });
      }, observerOptions);

      observer.observe(this.element);
    }

    // 动画元素
    animateElements(widget) {
      const title = widget.querySelector('.basiclayout-widget__title');
      const description = widget.querySelector('.basiclayout-widget__description');
      const content = widget.querySelector('.basiclayout-widget__content');

      // 添加动画类
      if (title && !title.classList.contains('animate-on-scroll')) {
        title.classList.add('animate-on-scroll');
      }
      if (description && !description.classList.contains('animate-on-scroll')) {
        description.classList.add('animate-on-scroll');
      }

      // 延迟添加可见类以触发动画
      setTimeout(() => {
        if (title) title.classList.add('visible');
        if (description) description.classList.add('visible');
      }, 100);

      // 内容区域动画
      if (content) {
        const children = content.children;
        Array.from(children).forEach((child, index) => {
          child.style.opacity = '0';
          child.style.transform = 'translateY(20px)';
          child.style.transition = `all 0.6s ease ${index * 0.1}s`;
          
          setTimeout(() => {
            child.style.opacity = '1';
            child.style.transform = 'translateY(0)';
          }, 200 + (index * 100));
        });
      }
    }

    // 设置滚动效果
    setupScrollEffects() {
      let ticking = false;

      const handleScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            this.updateScrollEffects();
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // 更新滚动效果
    updateScrollEffects() {
      const rect = this.element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // 视差效果
      if (this.element.classList.contains('basiclayout-widget--parallax')) {
        const speed = 0.5;
        const yPos = -(rect.top * speed);
        this.element.style.transform = `translateY(${yPos}px)`;
      }

      // 滚动进度指示器
      const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / windowHeight));
      this.element.style.setProperty('--scroll-progress', progress);
    }

    // 设置视差效果
    setupParallaxEffect() {
      if (!this.element.classList.contains('basiclayout-widget--parallax')) {
        return;
      }

      // 为视差元素添加必要的样式
      this.element.style.position = 'relative';
      this.element.style.overflow = 'hidden';
    }

    // 设置响应式调整
    setupResponsiveAdjustments() {
      const handleResize = () => {
        this.adjustForScreenSize();
      };

      window.addEventListener('resize', handleResize);
      this.adjustForScreenSize(); // 初始调整
    }

    // 根据屏幕大小调整
    adjustForScreenSize() {
      const width = window.innerWidth;
      
      // 移动端优化
      if (width < 768) {
        this.element.classList.add('mobile-optimized');
      } else {
        this.element.classList.remove('mobile-optimized');
      }

      // 平板端优化
      if (width >= 768 && width < 1024) {
        this.element.classList.add('tablet-optimized');
      } else {
        this.element.classList.remove('tablet-optimized');
      }

      // 桌面端优化
      if (width >= 1024) {
        this.element.classList.add('desktop-optimized');
      } else {
        this.element.classList.remove('desktop-optimized');
      }
    }

    // 公共方法：刷新动画
    refresh() {
      this.animateElements(this.element);
    }

    // 公共方法：销毁
    destroy() {
      // 清理事件监听器
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('resize', this.handleResize);
    }
  }

  // 初始化所有 Basiclayout Widget
  document.addEventListener('DOMContentLoaded', () => {
    const widgets = document.querySelectorAll('[data-basiclayout-widget]');
    
    widgets.forEach(widget => {
      new BasiclayoutWidget(widget);
    });
  });

  // 全局暴露（用于调试）
  if (typeof window !== 'undefined') {
    window.BasiclayoutWidget = BasiclayoutWidget;
  }
};
