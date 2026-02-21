import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SignalTest() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const slicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=125%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0%-30%)
      // Image entrance from bottom
      scrollTl.fromTo(
        imageRef.current,
        { y: '100vh', opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      // Headline entrance from top
      scrollTl.fromTo(
        headlineRef.current,
        { y: '-18vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      // Caption entrance
      scrollTl.fromTo(
        captionRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );

      // Glitch slices effect (0%-22%)
      const slices = slicesRef.current?.children;
      if (slices) {
        Array.from(slices).forEach((slice, i) => {
          const direction = i % 2 === 0 ? 12 : -12;
          scrollTl.fromTo(
            slice,
            { x: 0 },
            { x: direction, ease: 'none' },
            0
          );
          scrollTl.to(
            slice,
            { x: 0, ease: 'none' },
            0.22
          );
        });
      }

      // SETTLE (30%-70%): Hold - no animation

      // EXIT (70%-100%)
      scrollTl.fromTo(
        headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-14vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        imageRef.current,
        { y: 0, opacity: 1, scale: 1 },
        { y: '18vh', opacity: 0, scale: 0.96, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        captionRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned z-30 flex items-center justify-center bg-dead-black"
      data-settle-ratio="0.5"
    >
      {/* Glitch Portrait Container */}
      <div className="relative" style={{ zIndex: 3 }}>
        {/* Main Image */}
        <img
          ref={imageRef}
          src="/glitch-portrait.jpg"
          alt="Signal Test"
          className="w-[min(62vw,840px)] h-auto object-contain"
        />

        {/* Glitch Slices Overlay */}
        <div ref={slicesRef} className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute left-0 right-0 h-[20%] overflow-hidden"
              style={{
                top: `${i * 20}%`,
                clipPath: `inset(${i * 20}% 0 ${80 - i * 20}% 0)`,
              }}
            >
              <img
                src="/glitch-portrait.jpg"
                alt=""
                className="w-[min(62vw,840px)] h-auto object-contain absolute"
                style={{ top: `-${i * 20}%` }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Headline Overlay */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 5 }}
      >
        <h2
          ref={headlineRef}
          className="font-display text-hero leading-tight text-dead-white text-center glitch-text"
          data-text="LET THE STATIC IN"
        >
          LET THE<br />STATIC IN
        </h2>
      </div>

      {/* Caption */}
      <p
        ref={captionRef}
        className="absolute bottom-8 right-8 font-mono text-xs text-dead-muted/60"
        style={{ zIndex: 4 }}
      >
        Dead Channel · Broadcast 2026
      </p>
    </section>
  );
}
