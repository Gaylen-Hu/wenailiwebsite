const COUNTER_SELECTOR = '[data-counter-target]';
const WIDGET_SELECTOR = '[data-about-section-widget]';
const FRAME_DURATION = 16;

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

const parseValue = (rawValue = '') => {
  const value = rawValue.trim();
  const regex = /-?\d+(?:[.,]\d+)?/;
  const match = regex.exec(value);

  if (!match) {
    return {
      number: 0,
      decimals: 0,
      prefix: '',
      suffix: value
    };
  }

  const numericString = match[0].replace(',', '.');
  const decimals = numericString.includes('.') ? numericString.split('.')[1].length : 0;

  return {
    number: parseFloat(numericString),
    decimals,
    prefix: value.slice(0, match.index),
    suffix: value.slice(match.index + match[0].length)
  };
};

const animateCounter = (element) => {
  if (!element || element.dataset.counterInitialized) {
    return;
  }

  const duration = Math.max(parseInt(element.dataset.counterDuration, 10) || 2000, FRAME_DURATION);
  const { number: targetNumber, decimals, prefix, suffix } = parseValue(element.dataset.counterTarget);

  if (targetNumber === 0) {
    element.textContent = `${prefix}${targetNumber.toFixed(decimals)}${suffix}`;
    element.dataset.counterInitialized = 'true';
    return;
  }

  const startTime = performance.now();

  const update = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutCubic(progress);
    const currentValue = targetNumber * easedProgress;
    const formattedValue = currentValue.toFixed(decimals);

    element.textContent = `${prefix}${formattedValue}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = `${prefix}${targetNumber.toFixed(decimals)}${suffix}`;
    }
  };

  element.dataset.counterInitialized = 'true';
  element.textContent = `${prefix}${(0).toFixed(decimals)}${suffix}`;
  requestAnimationFrame(update);
};

const observeCounters = (widget) => {
  const counters = widget.querySelectorAll(COUNTER_SELECTOR);

  if (!counters.length) {
    return;
  }

  const observer = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observerInstance.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.4,
    rootMargin: '0px 0px -20% 0px'
  });

  counters.forEach((counter) => observer.observe(counter));
};

export default () => {
  const init = () => {
    const widgets = document.querySelectorAll(WIDGET_SELECTOR);

    widgets.forEach(observeCounters);
  };

  if (window.apos?.util?.onReady) {
    window.apos.util.onReady(init);
  } else {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  }
};