import { useEffect, useState, lazy, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Home from './pages/Home';
import Lenis from '@studio-freight/lenis';
import GooeyBackground from './components/ui/GooeyBackground';

// Legal Pages (Lazy Loaded)
const Privacy = lazy(() => import('./pages/legal/Privacy'));
const TOS = lazy(() => import('./pages/legal/TOS'));
const DeleteAccount = lazy(() => import('./pages/legal/DeleteAccount'));

// Main Pages (Lazy Loaded)
const Team = lazy(() => import('./pages/Team'));
const CampusRepresentative = lazy(() => import('./pages/CampusRepresentative'));
const ComingSoon = lazy(() => import('./pages/ComingSoon'));
const ShareRedirect = lazy(() => import('./pages/ShareRedirect'));
const VerifiedCreator = lazy(() => import('./pages/VerifiedCreator'));
const SuggestFeature = lazy(() => import('./pages/SuggestFeature'));
const RevenueCalc = lazy(() => import('./pages/RevenueCalc'));
const Support = lazy(() => import('./pages/Support'));
const Admin = lazy(() => import('./pages/Admin'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Dashboard (Lazy Loaded)
const DashboardLayout = lazy(() => import('./features/dashboard/DashboardLayout'));
const Overview = lazy(() => import('./features/dashboard/Overview'));
const NotesManager = lazy(() => import('./features/dashboard/NotesManager'));

import './styles/variables.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [dashboardTab, setDashboardTab] = useState('overview');

  useEffect(() => {
    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 1.5,
      infinite: false,
    });

    ScrollTrigger.config({ limitCallbacks: true });

    // Sync ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0); // Disable lag smoothing to prevent 'jumpy' resets with Lenis sync

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
    // Share/deeplink redirect — matches /share/* paths
    if (path.startsWith('/share')) {
      return <ShareRedirect />;
    }

    switch (path) {
      case '/privacy':
        return <Privacy />;
      case '/tos':
        return <TOS />;
      case '/delete-account':
        return <DeleteAccount />;
      case '/team':
        return <Team />;
      case '/campus-representatives':
      case '/campus-representative':
        return <CampusRepresentative />;
      case '/coming-soon':
        return <ComingSoon />;
      case '/verified-creator':
        return <VerifiedCreator />;
      case '/suggest-feature':
        return <SuggestFeature />;
      case '/revenue-calc':
        return <RevenueCalc />;
      case '/support':
        return <Support />;
      case '/admin':
        return <Admin />;
      case '/dashboard':
        return (
          <DashboardLayout 
            activeTab={dashboardTab} 
            onTabChange={setDashboardTab}
          >
            {dashboardTab === 'overview' && <Overview />}
            {dashboardTab === 'notes' && <NotesManager />}
            {dashboardTab === 'earnings' && <div className="dashboard-card">Earnings Coming Soon</div>}
            {dashboardTab === 'analytics' && <div className="dashboard-card">Analytics Coming Soon</div>}
          </DashboardLayout>
        );
      case '/':
        return <Home />;
      default:
        return <NotFound />;
    }
  };

  return (
    <>
      {/* Premium Texture Noise */}
      <div className="noise" aria-hidden="true" />
      <Suspense fallback={<div style={{ height: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-3)' }}>Loading dashboard...</div>}>
        {renderContent()}
      </Suspense>
    </>
  );
}

export default App;

