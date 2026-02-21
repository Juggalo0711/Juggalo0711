import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import TransmissionLog from './sections/TransmissionLog';
import SignalTest from './sections/SignalTest';
import ReleaseDrop from './sections/ReleaseDrop';
import SyndicateRoster from './sections/SyndicateRoster';
import LiveRitual from './sections/LiveRitual';
import DeadChannelTV from './sections/DeadChannelTV';
import MerchGrid from './sections/MerchGrid';
import JoinContact from './sections/JoinContact';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Wait for all ScrollTriggers to be created
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);

      if (!maxScroll || pinned.length === 0) return;

      // Build pinned ranges with settle ratios
      const pinnedRanges = pinned.map((st) => {
        const trigger = st.trigger as HTMLElement;
        const settleRatio = parseFloat(trigger?.dataset.settleRatio || '0.5');
        const start = st.start / maxScroll;
        const end = (st.end ?? st.start) / maxScroll;
        const center = start + (end - start) * settleRatio;

        return { start, end, center };
      });

      // Global snap configuration
      ScrollTrigger.create({
        snap: {
          snapTo: (value) => {
            // Check if within any pinned range (with small buffer)
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02
            );

            if (!inPinned) return value; // Flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );

            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="relative bg-dead-black min-h-screen">
      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Scanlines Overlay */}
      <div className="scanlines-overlay" />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative">
        <Hero />
        <TransmissionLog />
        <SignalTest />
        <ReleaseDrop />
        <SyndicateRoster />
        <LiveRitual />
        <DeadChannelTV />
        <MerchGrid />
        <JoinContact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
