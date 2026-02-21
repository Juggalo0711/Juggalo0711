import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ReleaseDrop() {
  const sectionRef = useRef<HTMLElement>(null);
  const coverRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const microRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.7,
        },
      });

      // ENTRANCE (0%-30%)
      // Cover from left
      scrollTl.fromTo(
        coverRef.current,
        { x: '-60vw', opacity: 0, scale: 0.92, rotateZ: -2 },
        { x: 0, opacity: 1, scale: 1, rotateZ: 0, ease: 'none' },
        0
      );

      // Title from right
      scrollTl.fromTo(
        titleRef.current,
        { x: '40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // CTA from bottom
      scrollTl.fromTo(
        ctaRef.current,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );

      // Micro from bottom
      scrollTl.fromTo(
        microRef.current,
        { y: '6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.2
      );

      // SETTLE (30%-70%): Hold

      // EXIT (70%-100%)
      scrollTl.fromTo(
        titleRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        microRef.current,
        { y: 0, opacity: 1 },
        { y: '-8vh', opacity: 0, ease: 'power2.in' },
        0.74
      );

      scrollTl.fromTo(
        coverRef.current,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned z-40 bg-dead-black flex items-center"
      data-settle-ratio="0.52"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Cover Image */}
          <div className="flex justify-center lg:justify-start">
            <img
              ref={coverRef}
              src="/release-cover.jpg"
              alt="Release Cover"
              className="w-[70vw] max-w-[400px] lg:w-[38vw] lg:max-w-[520px] h-auto shadow-dark"
            />
          </div>

          {/* Content */}
          <div className="text-center lg:text-left">
            <div ref={titleRef}>
              <h2 className="font-display text-section leading-snug text-dead-white mb-8">
                THIS IS THE<br />DEAD CHANNEL
              </h2>
            </div>

            <button
              ref={ctaRef}
              className="btn-primary inline-flex items-center gap-3 mb-6"
            >
              <Play className="w-4 h-4" />
              LISTEN NOW
            </button>

            <p
              ref={microRef}
              className="font-mono text-xs text-dead-muted/60"
            >
              Available on all platforms. Limited vinyl drop next month.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
