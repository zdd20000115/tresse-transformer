
export const fadeInUpAnimation = (delay: number = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.5,
    ease: [0.33, 1, 0.68, 1],
    delay: delay,
  },
});

export const fadeInAnimation = (delay: number = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: {
    duration: 0.4,
    ease: [0.33, 1, 0.68, 1],
    delay: delay,
  },
});

export const scaleAnimation = (delay: number = 0) => ({
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: {
    duration: 0.4,
    ease: [0.33, 1, 0.68, 1],
    delay: delay,
  },
});

// Intersection Observer utility for scroll animations
export const setupScrollAnimation = () => {
  if (typeof window === 'undefined') return;

  const callback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  };

  const observer = new IntersectionObserver(callback, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  });

  const elements = document.querySelectorAll('.animate-on-scroll, .stagger-animation');
  elements.forEach((element) => {
    observer.observe(element);
  });
};
