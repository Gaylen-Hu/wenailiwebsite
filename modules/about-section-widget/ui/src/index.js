const easeOutQuad = (t) => t * (2 - t);

const startAnimation = (el) => {
  const target = parseFloat(el.dataset.target || '0');
  const duration = parseInt(el.dataset.duration || '2000', 10);
  const decimals = Math.max(parseInt(el.dataset.decimals || '0', 10), 0);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';

  let startTime = null;
  let frame = null;

  const step = (timestamp) => {
    if (!startTime) {
      startTime = timestamp;
    }
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const easedProgress = easeOutQuad(progress);
    const currentValue = target * easedProgress;
    const formattedValue = currentValue.toFixed(decimals);

    el.textContent = `${prefix}${formattedValue}${suffix}`;

    if (progress < 1) {
      frame = window.requestAnimationFrame(step);
    } else {
      el.dataset.counting = 'false';
      el.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
    }
  };

  if (el.dataset.counting === 'true') {
    return;
  }

  el.dataset.counting = 'true';
  el.textContent = `${prefix}${Number(0).toFixed(decimals)}${suffix}`;
  frame = window.requestAnimationFrame(step);

  el._counterFrame = frame;
};

const setupCounter = (el) => {
  if (el.dataset.counterBound === 'true') {
    return;
  }
  el.dataset.counterBound = 'true';

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startAnimation(el);
        } else if (el.dataset.counting === 'true' && el._counterFrame) {
          window.cancelAnimationFrame(el._counterFrame);
          el.dataset.counting = 'false';
        }
      });
    },
    {
      threshold: 0.2
    }
  );

  observer.observe(el);
  el._counterObserver = observer;
};

const initCounters = (root = document) => {
  root.querySelectorAll('[data-counter]').forEach((counter) => {
    if (counter instanceof HTMLElement) {
      setupCounter(counter);
    }
  });
};

const observeDynamicContent = () => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) {
          return;
        }
        if (node.matches('[data-stats-section]') || node.querySelector('[data-counter]')) {
          initCounters(node);
        }
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
};

export default () => {
  if (window.__aboutStatsWidgetInitialized) {
    return;
  }
  window.__aboutStatsWidgetInitialized = true;

  const ready = () => {
    initCounters(document);
    observeDynamicContent();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready, { once: true });
  } else {
    ready();
  }
};

