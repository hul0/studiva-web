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
      xPercent: -50,
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