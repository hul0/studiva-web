import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Testimonials.css';

gsap.registerPlugin(ScrollTrigger);

const StarIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ color: '#a78bfa' }}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const testimonials = [
  {
    id: 't1', name: 'Early Creator', role: 'Engineering Student',
    badge: 'Creator',
    text: 'Finally a platform where I can share my handwritten notes and actually get discovered. The upload process is super smooth.',
    earn: 'Building audience',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face',
  },
  {
    id: 't2', name: 'Beta User', role: 'MAKAUT Student',
    badge: 'Learner',
    text: "No more scrolling through cluttered Telegram groups. Studiva lets me search and find exactly what I need for my exams.",
    earn: 'Saving time daily',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
  },
  {
    id: 't3', name: 'Content Creator', role: 'B.Tech Final Year',
    badge: 'Creator',
    text: 'I uploaded my 4 years of lab reports and assignment solutions. The tagging system makes everything instantly discoverable.',
    earn: 'Growing reach',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
  },
  {
    id: 't4', name: 'Study Enthusiast', role: 'Exam Prep',
    badge: 'Learner',
    text: 'Love that I can either pay a small amount or watch a quick ad to access notes. No forced subscriptions, no hidden fees.',
    earn: 'Smart savings',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
  },
  {
    id: 't5', name: 'Note Seller', role: 'Topper',
    badge: 'Creator',
    text: "The 70% revenue share is the best I've seen. Plus the rewarded ads model means my notes reach students who can't pay upfront.",
    earn: 'Fair monetization',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
  },
  {
    id: 't6', name: 'Active Learner', role: 'University Student',
    badge: 'Learner',
    text: 'Organized, searchable, and no content gets buried like in WhatsApp groups. This is what academic resources should look like.',
    earn: 'Better grades',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face',
  },
];

const trustStats = [
  {
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
    val: '4.9', valColor: '#fbbf24', label: 'App Rating',
  },
  {
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    val: '150+', valColor: '#7dd3fc', label: 'Early adopters',
  },
  {
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>,
    val: '70%', valColor: '#6ee7b7', label: 'Creator revenue share',
  },
  {
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>,
    val: '8+', valColor: '#d8b4fe', label: 'Content types',
  },
  {
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>,
    val: '3', valColor: '#fdba74', label: 'Monetization modes',
  },
  {
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f472b6" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>,
    val: 'UPI', valColor: '#f9a8d4', label: 'Instant withdrawals',
  },
];

const Testimonials = () => {
  const headRef = useRef(null);
  const trustRef = useRef(null);
  const marqueeRef = useRef(null);
  const trackRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const head = headRef.current;
    const track = trackRef.current;
    const trust = trustRef.current;
    if (!head || !track || !trust) return;

    // ── Header: line wipe then stagger up
    const headItems = head.querySelectorAll('[data-anim]');
    gsap.set(headItems, { opacity: 0, y: 20 });
    gsap.to(headItems, {
      opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: head, start: 'top 82%', once: true },
    });

    // ── Trust row: fade + slide up with spring
    const badges = trust.querySelectorAll('.trust-badge');
    gsap.set(badges, { opacity: 0, y: 16, scale: 0.96 });
    gsap.to(badges, {
      opacity: 1, y: 0, scale: 1,
      duration: 0.5, stagger: 0.06, ease: 'back.out(1.4)',
      scrollTrigger: { trigger: trust, start: 'top 86%', once: true },
    });

    // ── Trust values: count up animation
    badges.forEach((badge) => {
      const valEl = badge.querySelector('.trust-badge__val');
      if (!valEl) return;
      const raw = valEl.textContent;
      const num = parseFloat(raw.replace(/[^0-9.]/g, ''));
      if (isNaN(num)) return;
      const prefix = raw.match(/^[^0-9]*/)?.[0] ?? '';
      const suffix = raw.match(/[^0-9.]+$/)?.[0] ?? '';
      const decimals = raw.includes('.') ? 1 : 0;
      gsap.fromTo({ val: 0 }, { val: num }, {
        val: num, duration: 1.4, ease: 'power2.out', delay: 0.2,
        onUpdate: function () { valEl.textContent = prefix + this.targets()[0].val.toFixed(decimals) + suffix; },
        scrollTrigger: { trigger: trust, start: 'top 86%', once: true },
      });
    });

    // ── Marquee Loop Animation
    const trackWidth = track.scrollWidth;
    const loopTime = 40; // Total duration for one cycle

    // Create the infinite loop
    animationRef.current = gsap.to(track, {
      x: `-${trackWidth / 2}px`,
      duration: loopTime,
      ease: 'none',
      repeat: -1,
      paused: false
    });

    // Entrance animation for the whole marquee
    gsap.fromTo(marqueeRef.current, 
      { opacity: 0, y: 40 },
      { 
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: marqueeRef.current, start: 'top 90%' }
      }
    );

    return () => {
      if (animationRef.current) animationRef.current.kill();
    };
  }, []);

  const handleMouseEnter = () => animationRef.current?.pause();
  const handleMouseLeave = () => animationRef.current?.play();

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">

        {/* Header */}
        <div className="testimonials__head" ref={headRef}>
          <p className="testimonials__eyebrow" data-anim>Reviews</p>
          <h2 className="testimonials__title" data-anim>Real students.<br />Real results.</h2>
          <p className="testimonials__sub" data-anim>Here's what our early adopters are saying about Studiva.</p>
        </div>

        {/* Trust stats */}
        {/* <div className="trust-row" ref={trustRef}>
          {trustStats.map((b, i) => (
            <div key={i} className="trust-badge">
              <span className="trust-badge__icon">{b.icon}</span>
              <span className="trust-badge__val" style={{ color: b.valColor }}>{b.val}</span>
              <span className="trust-badge__label">{b.label}</span>
            </div>
          ))}
        </div> */}

        {/* Marquee Wrapper */}
        <div 
          className="testimonials__marquee" 
          ref={marqueeRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="testimonials__track" ref={trackRef}>
            {[...testimonials, ...testimonials].map((t, idx) => (
              <div className="tcard" key={`${t.id}-${idx}`}>
                <div className="tcard__top">
                  <img
                    className="tcard__avatar"
                    src={t.avatar}
                    alt={t.name}
                    loading="lazy"
                  />
                  <div className="tcard__meta">
                    <span className="tcard__name">{t.name}</span>
                    <span className="tcard__role">{t.role}</span>
                  </div>
                  <span className="tcard__badge">{t.badge}</span>
                </div>
                <div className="tcard__stars">
                  {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
                </div>
                <p className="tcard__text">"{t.text}"</p>
                <div className="tcard__earn">{t.earn}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;