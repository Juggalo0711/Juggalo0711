import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const microRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Auto-play entrance animation on page load
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Image entrance
      tl.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 1.2 },
        0
      );

      // Vignette entrance
      tl.fromTo(
        vignetteRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        0.2
      );

      // Eyebrow entrance
      tl.fromTo(
        eyebrowRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45 },
        0.4
      );

      // Headline entrance
      tl.fromTo(
        headlineRef.current,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        0.5
      );

      // CTA entrance
      tl.fromTo(
        ctaRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.7
      );

      // Micro entrance
      tl.fromTo(
        microRef.current,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4 },
        0.85
      );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([eyebrowRef.current, headlineRef.current, ctaRef.current, microRef.current], {
              opacity: 1,
              y: 0,
            });
            gsap.set(imageRef.current, { opacity: 1, scale: 1, x: 0 });
            gsap.set(vignetteRef.current, { opacity: 1 });
          },
        },
      });

      // ENTRANCE (0%-30%): Hold - already visible from load animation
      // SETTLE (30%-70%): Hold
      // EXIT (70%-100%): Animate out
      scrollTl.fromTo(
        headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        eyebrowRef.current,
        { y: 0, opacity: 1 },
        { y: '-14vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(
        microRef.current,
        { y: 0, opacity: 1 },
        { y: '-8vh', opacity: 0, ease: 'power2.in' },
        0.78
      );

      scrollTl.fromTo(
        imageRef.current,
        { scale: 1, x: 0, opacity: 1 },
        { scale: 1.08, x: '-4vw', opacity: 0.65, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        vignetteRef.current,
        { opacity: 1 },
        { opacity: 0.85, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned z-10 flex items-center justify-center"
      data-settle-ratio="0.5"
    >
      {/* Background Image */}
      <img
        ref={imageRef}
        src="/hero-bg.jpg"
        alt="Dead Channel"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 1 }}
      />

      {/* Vignette Overlay */}
      <div
        ref={vignetteRef}
        className="absolute inset-0 vignette"
        style={{ zIndex: 2 }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4" style={{ zIndex: 5 }}>
        {/* Eyebrow */}
        <p
          ref={eyebrowRef}
          className="font-mono text-xs md:text-sm tracking-wider text-dead-muted mb-4"
        >
          BROADCASTING FROM
        </p>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="font-display text-hero leading-tight text-dead-white mb-8"
        >
          THE DEAD CHANNEL
        </h1>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <button className="btn-primary text-sm md:text-base">
            ENTER THE DEAD CHANNEL
          </button>
          <a
            href="#syndicate"
            className="link-underline font-mono text-sm text-dead-muted hover:text-dead-red transition-colors"
          >
            Join the Static Syndicate
          </a>
        </div>
      </div>

      {/* Bottom Microcopy */}
      <p
        ref={microRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs text-dead-muted/60 text-center px-4"
        style={{ zIndex: 4 }}
      >
        New transmission every month. Limited merch drops.
      </p>
    </section>
  );
}
