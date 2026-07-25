import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: number | string;
  label: string;
  duration?: number;
}

export function AnimatedCounter({ value, label, duration = 2 }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const numValue = typeof value === "string" ? parseInt(value) : value;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    let animationId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);

      setDisplayValue(Math.floor(numValue * progress));

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [hasStarted, numValue, duration]);

  return (
    <div ref={ref} className="text-center animate-fade-in-up">
      <div className="font-serif text-3xl md:text-5xl font-bold text-accent">{displayValue}+</div>
      <div className="mt-2 text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
    </div>
  );
}
