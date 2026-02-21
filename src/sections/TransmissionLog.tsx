import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Disc, Users, Radio } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const transmissions = [
  {
    icon: Disc,
    title: 'Ritual Protocol (EP)',
    description: 'Out now. 6 tracks. No features.',
  },
  {
    icon: Users,
    title: 'Static Syndicate: Phase 1',
    description: 'Early access + limited merch for members.',
  },
  {
    icon: Radio,
    title: 'Dead Channel Radio 002',
    description: 'Mixtape update. 45 min of chaos.',
  },
];

export default function TransmissionLog() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true,
          },
        }
      );

      // Body animation
      gsap.fromTo(
        bodyRef.current,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bodyRef.current,
            start: 'top 75%',
            end: 'top 55%',
            scrub: true,
          },
        }
      );

      // Cards animation
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { x: '8vw', opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 55%',
              scrub: true,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-flowing bg-dead-black relative"
      style={{ zIndex: 20 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left Column */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <h2
              ref={titleRef}
              className="font-display text-section leading-snug text-dead-white mb-6"
            >
              TRANSMISSION LOG
            </h2>
            <p
              ref={bodyRef}
              className="text-dead-muted text-base md:text-lg leading-relaxed mb-6"
            >
              Latest drops, broadcasts, and syndicate updates. If it&apos;s not here, it&apos;s noise.
            </p>
            <a
              href="#archive"
              className="link-underline font-mono text-sm text-dead-red hover:text-dead-white transition-colors inline-flex items-center gap-2"
            >
              Open the archive
              <span className="text-xs">→</span>
            </a>
          </div>

          {/* Right Column - Cards */}
          <div className="space-y-6">
            {transmissions.map((item, index) => (
              <div
                key={item.title}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="card-dark p-6 flex items-start gap-5 group hover:border-dead-red/30 transition-colors cursor-pointer"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-dead-red/10 flex items-center justify-center group-hover:bg-dead-red/20 transition-colors">
                  <item.icon className="w-5 h-5 text-dead-red" />
                </div>
                <div>
                  <h3 className="font-display text-lg text-dead-white mb-1 group-hover:text-dead-red transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-dead-muted text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
