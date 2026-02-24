import { useEffect, useRef, type ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function FadeIn({ children, className = '', style }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`fade-section ${className}`} style={style}>
      {children}
    </div>
  );
}
