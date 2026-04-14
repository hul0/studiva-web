import Spline from '@splinetool/react-spline';
import { useRef, useEffect, useState, useCallback } from 'react';

/**
 * SplineScene — Optimised 3D scene with:
 *  - Firefox detection (WebGL issues) → shows nothing, fallback placeholder shown instead
 *  - IntersectionObserver to pause when off-screen
 *  - Reduced pixel ratio for performance
 *  - User interaction disabled (pointer-events: none on parent)
 */

const isFirefox = typeof navigator !== 'undefined' && /firefox/i.test(navigator.userAgent);
const isMobile = typeof navigator !== 'undefined' && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

const SplineScene = () => {
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Don't render on Firefox or mobile at all
  if (isFirefox || isMobile) return null;

  useEffect(() => {
    const container = canvasRef.current?.parentElement;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: '300px' }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const handleLoad = useCallback((splineApp) => {
    setHasLoaded(true);
    // Reduce quality for performance
    if (splineApp?.setZoom) {
      try { splineApp.setZoom(0.8); } catch (_) {}
    }
  }, []);

  return (
    <div
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        opacity: hasLoaded ? 1 : 0,
        transition: 'opacity 0.8s ease',
      }}
    >
      {isVisible && (
        <Spline
          scene="https://prod.spline.design/0iqzUdlSbWmA4Nib/scene.splinecode"
          onLoad={handleLoad}
          style={{ width: '100%', height: '100%' }}
          renderOnDemand
        />
      )}
    </div>
  );
};

export default SplineScene;