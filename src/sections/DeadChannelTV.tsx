import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const videos = [
  {
    title: 'Ritual (Official Video)',
    thumbnail: '/video-1.jpg',
    duration: '4:23',
  },
  {
    title: 'Static Sessions: 001',
    thumbnail: '/video-2.jpg',
    duration: '12:45',
  },
  {
    title: 'Behind the Broadcast',
    thumbnail: '/video-3.jpg',
    duration: '8:17',
  },
];

export default function DeadChannelTV() {
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
          { y: 30, opacity: 0, scale: 0.98 },
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
      className="section-flowing bg-dead-black relative"
      style={{ zIndex: 70 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h2
            ref={titleRef}
            className="font-display text-section leading-snug text-dead-white mb-4"
          >
            DEAD CHANNEL TV
          </h2>
          <p ref={subRef} className="text-dead-muted text-base md:text-lg">
            Visual transmissions. Corrupted footage. Uncut.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <div
              key={video.title}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-video overflow-hidden card-dark">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Play Overlay */}
                <div className="absolute inset-0 bg-dead-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 bg-dead-red flex items-center justify-center">
                    <Play className="w-6 h-6 text-dead-black fill-dead-black" />
                  </div>
                </div>
                {/* Duration */}
                <div className="absolute bottom-3 right-3 bg-dead-black/80 px-2 py-1">
                  <span className="font-mono text-xs text-dead-white">
                    {video.duration}
                  </span>
                </div>
              </div>
              <h3 className="font-display text-sm text-dead-white mt-4 group-hover:text-dead-red transition-colors">
                {video.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
