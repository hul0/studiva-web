import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import CreatorEconomy from './components/CreatorEconomy';
import Testimonials from './components/Testimonials';
import Comparison from './components/Comparison';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Delay refresh to ensure all dynamic heights are calculated
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', handleResize);

    // Ensure ScrollTrigger updates on native scroll
    window.addEventListener('scroll', () => {
      ScrollTrigger.update();
    }, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <>
      {/* Premium Texture Noise */}
      <div className="noise" aria-hidden="true" />

      <Navbar />

      <main>
        <Hero />
        <Marquee />
        <Features />
        <HowItWorks />
        <CreatorEconomy />
        <Testimonials />

        {/* Support & Community additions */}
        <Comparison />
        <FAQ />

        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}

export default App;
