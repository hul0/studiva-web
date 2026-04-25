import { useEffect, useState } from 'react';
import { useScreenSize } from '../../hooks/use-screen-size';
import { PixelTrail } from './pixel-trail';
import { GooeyFilter } from './gooey-filter';

/*───────────────────────────────────────────────────────────
  GooeyBackground — full-page pixel trail overlay
  
  Uses the exact danielpetho PixelTrail + GooeyFilter
  components. Sits on top of all page content with
  pointer-events: none on the wrapper so clicks fall through,
  but pointer-events: auto on the trail grid so mousemove
  events are captured.
  
  Pixel colour toggles with the theme:
  • Dark mode → white squares
  • Light mode → black squares
───────────────────────────────────────────────────────────*/
export default function GooeyBackground() {
  const screenSize = useScreenSize();
  const [isDark, setIsDark] = useState(
    () => document.documentElement.getAttribute('data-theme') === 'dark'
  );

  // Watch for theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: 9998,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <GooeyFilter id="gooey-filter-pixel-trail" strength={5} />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          filter: 'url(#gooey-filter-pixel-trail)',
          pointerEvents: 'auto',
        }}
      >
        <PixelTrail
          pixelSize={screenSize.lessThan('md') ? 24 : 32}
          fadeDuration={0}
          delay={500}
          pixelClassName={isDark ? 'pixel-white' : 'pixel-black'}
        />
      </div>
    </div>
  );
}
