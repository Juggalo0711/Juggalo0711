import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const syndicateMembers = [
  {
    handle: '@gh0st_frequencies',
    quote: 'Signal strong in the Midwest.',
    image: '/syndicate-1.jpg',
  },
  {
    handle: '@ritual_noise',
    quote: 'Dead Channel daily.',
    image: '/syndicate-2.jpg',
  },
  {
    handle: '@static_bones',
    quote: 'Merch + mixtapes = life.',
    image: '/syndicate-3.jpg',
  },
  {
    handle: '@cold_transmission',
    quote: 'Played it until it corrupted.',
    image: '/syndicate-4.jpg',
  },
];

export default function SyndicateRoster() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true,
          },
        }
      );

      // Subtitle animation
      gsap.fromTo(
        subRef.current,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: subRef.current,
            start: 'top 78%',
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
          { y: 40, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
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
      id="syndicate"
      className="section-flowing bg-dead-black relative"
      style={{ zIndex: 50 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h2
            ref={titleRef}
            className="font-display text-section leading-snug text-dead-white mb-4"
          >
            STATIC SYNDICATE
          </h2>
          <p ref={subRef} className="text-dead-muted text-base md:text-lg">
            Tagged broadcasts. Real members. No filters.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {syndicateMembers.map((member, index) => (
            <div
              key={member.handle}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="card-dark overflow-hidden group hover:border-dead-red/30 transition-colors"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={member.image}
                  alt={member.handle}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <p className="font-mono text-sm text-dead-red mb-1">
                  {member.handle}
                </p>
                <p className="text-dead-white text-sm">{member.quote}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
