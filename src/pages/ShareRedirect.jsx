import { useEffect, useState, useMemo } from 'react';
import './ShareRedirect.css';

/**
 * ShareRedirect — Pure client-side deeplink redirect page.
 *
 * URL patterns handled:
 *   /share/content/:id   → studiva://content/:id
 *   /share/user/:username → studiva://user/:username
 *   /share/playlist/:id  → studiva://playlist/:id
 *   /share/note/:id      → studiva://note/:id
 *   /share/...           → studiva://home  (fallback)
 *
 * No backend or DB required — the path is parsed client-side and the
 * appropriate `studiva://` deeplink is constructed + attempted.
 */
const ShareRedirect = () => {
  const [showFallback, setShowFallback] = useState(false);

  // Parse the current path into a deeplink + display info
  const { deepLink, label, typeLabel } = useMemo(() => {
    const path = window.location.pathname;
    const segments = path.split('/').filter(Boolean); // ['share', 'content', 'abc123']

    // Default
    let dl = 'studiva://home';
    let lb = 'Studiva';
    let tl = 'App';

    if (segments.length >= 3 && segments[0] === 'share') {
      const kind = segments[1];
      const id = segments[2];

      switch (kind) {
        case 'content':
          dl = `studiva://content/${id}`;
          lb = 'Shared Content';
          tl = 'Content';
          break;
        case 'user':
          dl = `studiva://user/${id}`;
          lb = `@${id}`;
          tl = 'Profile';
          break;
        case 'note':
          dl = `studiva://note/${id}`;
          lb = 'Shared Note';
          tl = 'Note';
          break;
        case 'playlist':
          dl = `studiva://playlist/${id}`;
          lb = 'Shared Playlist';
          tl = 'Playlist';
          break;
        default:
          dl = `studiva://${kind}/${id}`;
          lb = `Shared ${kind}`;
          tl = kind.charAt(0).toUpperCase() + kind.slice(1);
          break;
      }
    }

    return { deepLink: dl, label: lb, typeLabel: tl };
  }, []);

  useEffect(() => {
    // Attempt deeplink redirect immediately
    window.location.href = deepLink;

    // After 2.5s, show fallback UI if still on this page
    const timer = setTimeout(() => {
      setShowFallback(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, [deepLink]);

  const handleOpenApp = () => {
    window.location.href = deepLink;
  };

  return (
    <div className="share-page">
      {/* Ambient gradient blobs */}
      <div className="share-page__ambient" aria-hidden="true" />
      {/* Grid pattern */}
      <div className="share-page__grid" aria-hidden="true" />

      <div className="share-card">
        {/* Logo with pulse rings */}
        <div className="share-card__icon-wrap">
          <img
            src="/images/studiva-quill-icon.svg"
            alt="Studiva"
            className="share-card__icon"
          />
          <span className="share-card__pulse share-card__pulse--1" aria-hidden="true" />
          <span className="share-card__pulse share-card__pulse--2" aria-hidden="true" />
          <span className="share-card__pulse share-card__pulse--3" aria-hidden="true" />
        </div>

        {/* Type pill */}
        <div className="share-card__type">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
          {typeLabel}
        </div>

        {/* Loading state */}
        <div className="share-card__spinner-wrap">
          <div className="share-card__spinner" />
          <span className="share-card__spinner-text">Opening Studiva…</span>
        </div>

        <h1 className="share-card__title">{label}</h1>
        <p className="share-card__desc">
          We're redirecting you to the Studiva app. If nothing happens, use the button below.
        </p>

        {/* Fallback — reveals after timeout */}
        <div className={`share-card__fallback ${showFallback ? 'visible' : ''}`}>
          <hr className="share-card__divider" />
          <p className="share-card__fallback-note">
            The app didn't open automatically? Tap below to try again or download Studiva.
          </p>

          <button
            id="open-app-btn"
            className="share-card__btn-primary"
            onClick={handleOpenApp}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Open in Studiva
          </button>

          <a
            id="download-link"
            href="/"
            className="share-card__btn-secondary"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Studiva
          </a>

          <div className="share-card__stores">
            <a
              href="https://play.google.com/store/apps/details?id=com.studiva.app"
              className="share-card__store-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Play →
            </a>
            <a
              href="https://apps.apple.com/app/studiva"
              className="share-card__store-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              App Store →
            </a>
          </div>
        </div>

        {/* Branding footer */}
        <div className="share-card__footer">
          <p className="share-card__branding">
            Powered by <strong>CRINE</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShareRedirect;
