import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function JoinContact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Left column animation
      gsap.fromTo(
        leftRef.current,
        { x: '-4vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: leftRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true,
          },
        }
      );

      // Right column animation
      gsap.fromTo(
        rightRef.current,
        { x: '4vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: rightRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Subscribed: ${email}`);
    setEmail('');
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Transmission sent!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section
      ref={sectionRef}
      className="section-flowing bg-dead-black relative"
      style={{ zIndex: 90 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left Column - Newsletter */}
          <div ref={leftRef}>
            <h2 className="font-display text-section leading-snug text-dead-white mb-6">
              JOIN THE<br />SYNDICATE
            </h2>
            <p className="text-dead-muted text-base md:text-lg mb-8">
              Get early access to drops, tickets, and broadcast updates.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dead-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="input-dark w-full pl-11 pr-4 py-3.5 text-sm"
                  required
                />
              </div>
              <button type="submit" className="btn-primary">
                SUBSCRIBE
              </button>
            </form>
          </div>

          {/* Right Column - Contact Form */}
          <div ref={rightRef}>
            <h3 className="font-display text-xl text-dead-white mb-6">
              SEND A TRANSMISSION
            </h3>

            <form onSubmit={handleSend} className="space-y-4">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Name"
                className="input-dark w-full px-4 py-3.5 text-sm"
                required
              />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email"
                className="input-dark w-full px-4 py-3.5 text-sm"
                required
              />
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Message"
                rows={4}
                className="input-dark w-full px-4 py-3.5 text-sm resize-none"
                required
              />
              <button
                type="submit"
                className="btn-primary inline-flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <Send className="w-4 h-4" />
                SEND
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
