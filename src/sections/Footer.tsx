import { useState, useEffect } from 'react';

const taglines = [
  'Tune Into The Darkness',
  'This Is The Dead Channel',
  'Signal Breach Confirmed',
  'Let The Static In',
  'Transmission Hijacked',
];

export default function Footer() {
  const [currentTagline, setCurrentTagline] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-dead-black border-t border-white/10 py-12 relative" style={{ zIndex: 100 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <p className="font-mono text-sm text-dead-white mb-1">
              KRYPTIC STATIC
            </p>
            <p className="font-mono text-xs text-dead-muted/60">
              Dead Channel © Kryptic Static Productions
            </p>
          </div>

          {/* Rotating Tagline */}
          <div className="h-6 overflow-hidden">
            <p
              key={currentTagline}
              className="font-mono text-sm text-dead-red animate-flicker transition-all duration-500"
            >
              {taglines[currentTagline]}
            </p>
          </div>

          {/* Bottom Text */}
          <p className="font-mono text-xs text-dead-muted/60 text-center md:text-right">
            Broadcasting from the underground.
          </p>
        </div>
      </div>
    </footer>
  );
}
