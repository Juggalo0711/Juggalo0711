import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingBag } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const merchItems = [
  {
    name: 'Dead Channel Longsleeve',
    price: 38,
    image: '/merch-1.jpg',
  },
  {
    name: 'Static Syndicate Tee',
    price: 28,
    image: '/merch-2.jpg',
  },
  {
    name: 'Signal Cap',
    price: 24,
    image: '/merch-3.jpg',
  },
  {
    name: 'Ritual Hoodie',
    price: 54,
    image: '/merch-4.jpg',
  },
  {
    name: 'Corrupted Tote',
    price: 18,
    image: '/merch-5.jpg',
  },
  {
    name: 'Syndicate Pin Set',
    price: 12,
    image: '/merch-6.jpg',
  },
];

export default function MerchGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

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

      // Items animation
      itemsRef.current.forEach((item) => {
        if (!item) return;
        gsap.fromTo(
          item,
          { y: 40, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
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
      style={{ zIndex: 80 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h2
            ref={titleRef}
            className="font-display text-section leading-snug text-dead-white mb-4"
          >
            OFFICIAL MERCH
          </h2>
          <p ref={subRef} className="text-dead-muted text-base md:text-lg">
            Small batches. No restocks. Wear the signal.
          </p>
        </div>

        {/* Merch Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {merchItems.map((item, index) => (
            <div
              key={item.name}
              ref={(el) => { itemsRef.current[index] = el; }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-square overflow-hidden card-dark mb-4 group-hover:-translate-y-1 transition-transform duration-300">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                {/* Quick Add Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-dead-red/90 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center justify-center gap-2 text-dead-black font-semibold text-sm">
                    <ShoppingBag className="w-4 h-4" />
                    ADD TO CART
                  </div>
                </div>
              </div>
              <h3 className="font-display text-sm text-dead-white group-hover:text-dead-red transition-colors">
                {item.name}
              </h3>
              <p className="font-mono text-sm text-dead-muted mt-1">
                ${item.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
