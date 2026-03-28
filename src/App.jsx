import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Lenis from '@studio-freight/lenis';
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

// Legal Pages
import Privacy from './pages/legal/Privacy';
import TOS from './pages/legal/TOS';
import DeleteAccount from './pages/legal/DeleteAccount';

import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Sync ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Listen for back/forward browser buttons
    const handleLocationChange = () => {
      setPath(window.location.pathname);
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('navigate', handleLocationChange);

    // Initial ScrollTrigger setup
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    const handleResize = () => {
        ScrollTrigger.refresh();
        lenis.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('navigate', handleLocationChange);
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      lenis.destroy();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);


  // Simple Router
  const renderContent = () => {
    switch (path) {
      case '/privacy':
        return <Privacy />;
      case '/tos':
        return <TOS />;
      case '/delete-account':
        return <DeleteAccount />;
      default:
        return (
          <>
            <Navbar />
            <main>
              <Hero />
              <Marquee />
              <Features />
              <HowItWorks />
              <CreatorEconomy />
              <Testimonials />
              <Comparison />
              <FAQ />
              <FinalCTA />
            </main>
            <Footer />
          </>
        );
    }
  };

  return (
    <>
      {/* Premium Texture Noise */}
      <div className="noise" aria-hidden="true" />
      {renderContent()}
    </>
  );
}

export default App;

