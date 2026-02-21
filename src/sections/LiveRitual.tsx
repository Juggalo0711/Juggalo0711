import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Ticket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function LiveRitual() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
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
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0%-30%)
      // Background scale
      scrollTl.fromTo(
        bgRef.current,
        { scale: 1.08, opacity: 0.6 },
        { scale: 1, opacity: 1, ease: 'none' },
        0
      );

      // Vignette
      scrollTl.fromTo(
        vignetteRef.current,
        { opacity: 0 },
        { opacity: 1, ease: 'none' },
        0
      );

      // Headline from top
      scrollTl.fromTo(
        headlineRef.current,
        { y: '-18vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // Sub from bottom
      scrollTl.fromTo(
        subRef.current,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.12
      );

      // CTA from bottom
      scrollTl.fromTo(
        ctaRef.current,
        { y: '12vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.18
      );

      // Micro
      scrollTl.fromTo(
        microRef.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.22
      );

      // SETTLE (30%-70%): Hold

      // EXIT (70%-100%)
      scrollTl.fromTo(
        headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-12vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        subRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.74
      );

      scrollTl.fromTo(
        microRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.76
      );

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, opacity: 1 },
        { scale: 1.06, opacity: 0.6, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned z-60 flex items-center justify-center"
      data-settle-ratio="0.5"
    >
      {/* Background Image */}
      <img
        ref={bgRef}
        src="/stage-bg.jpg"
        alt="Live Stage"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 1 }}
      />

      {/* Vignette */}
      <div
        ref={vignetteRef}
        className="absolute inset-0 vignette"
        style={{ zIndex: 2 }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4" style={{ zIndex: 5 }}>
        <h2
          ref={headlineRef}
          className="font-display text-hero leading-tight text-dead-white mb-6"
        >
          THE RITUAL BEGINS
        </h2>

        <p
          ref={subRef}
          className="text-dead-muted text-lg md:text-xl mb-8"
        >
          Live broadcast. Limited tickets.
        </p>

        <button
          ref={ctaRef}
          className="btn-primary inline-flex items-center gap-3"
        >
          <Ticket className="w-4 h-4" />
          GET TICKETS
        </button>
      </div>

      {/* Micro */}
      <p
        ref={microRef}
        className="absolute bottom-8 left-8 font-mono text-xs text-dead-muted/60"
        style={{ zIndex: 4 }}
      >
        Next city reveal soon.
      </p>
    </section>
  );
}
