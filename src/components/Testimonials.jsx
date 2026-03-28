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
    id: 't1', name: 'Aarav Sharma', role: 'JEE Advanced AIR 247',
    badge: 'Top Ranker',
    text: 'Uploaded my 3 years of JEE prep and now earn ₹15K/month passively. The auto-tagging is spot on.',
    earn: '₹15K / month',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face',
  },
  {
    id: 't2', name: 'Priya Nair', role: 'NEET UG AIR 512',
    badge: 'Creator',
    text: "NEET biology notes are flying off the shelf. The rewarded ad model is brilliant — students who can't pay still get access.",
    earn: '₹22K / month',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
  },
  {
    id: 't3', name: 'Rohit Verma', role: 'Engineering, IIT Delhi',
    badge: 'Learner',
    text: 'I used to spend ₹3K on coaching material every month. Now I pay ₹200 or watch an ad. Peer notes beat textbooks.',
    earn: 'Saved ₹2,800 / mo',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
  },
  {
    id: 't4', name: 'Sneha Patel', role: 'CBSE Class 12 — 99.6%',
    badge: 'Creator + Learner',
    text: 'Just scan and tag. Withdrawal to UPI happens same day. I never thought selling notes could be this frictionless.',
    earn: '₹8K / month',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
  },
  {
    id: 't5', name: 'Arjun Reddy', role: 'UPSC Aspirant, CSE 2024',
    badge: 'Learner',
    text: "Civil services prep is expensive. Studiva changed that. IAS toppers' notes at a fraction of coaching cost.",
    earn: 'Saved ₹5K / mo',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
  },
  {
    id: 't6', name: 'Kavya Iyer', role: 'B.Com, Delhi University',
    badge: 'Creator',
    text: 'CA Foundation notes as a side hustle. The creator dashboard shows exactly where each rupee comes from. 5 stars.',
    earn: '₹6K / month',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face',
  },
];

const trustStats = [
  {
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
    val: '4.9', valColor: '#fbbf24', label: 'App Store',
  },
  {
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    val: '200K+', valColor: '#7dd3fc', label: 'Active users',
  },
  {
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>,
    val: '₹2Cr+', valColor: '#6ee7b7', label: 'Paid to creators',
  },
  {
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>,
    val: '50K+', valColor: '#d8b4fe', label: 'Notes published',
  },
  {
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>,
    val: '98%', valColor: '#fdba74', label: 'Satisfaction rate',
  },
  {
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f472b6" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>,
    val: '15+', valColor: '#f9a8d4', label: 'Exam categories',
  },
];

const Testimonials = () => {
  const gridRef = useRef(null);
  const headRef = useRef(null);
  const trustRef = useRef(null);

  useEffect(() => {
    const head = headRef.current;
    const grid = gridRef.current;
    const trust = trustRef.current;
    if (!head || !grid || !trust) return;

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

    // ── Cards: cascade in with alternating y offset
    const cards = grid.querySelectorAll('.tcard');
    gsap.set(cards, { opacity: 0, y: 32 });
    gsap.to(cards, {
      opacity: 1, y: 0,
      duration: 0.65, stagger: { amount: 0.5, from: 'start' },
      ease: 'power3.out',
      scrollTrigger: { trigger: grid, start: 'top 88%', once: true },
    });

    // ── Card earn lines: slide in from left
    const earns = grid.querySelectorAll('.tcard__earn');
    gsap.set(earns, { opacity: 0, x: -10 });
    gsap.to(earns, {
      opacity: 1, x: 0, duration: 0.5, stagger: { amount: 0.4, from: 'start' }, ease: 'power2.out',
      delay: 0.3,
      scrollTrigger: { trigger: grid, start: 'top 88%', once: true },
    });

  }, []);

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">

        {/* Header */}
        <div className="testimonials__head" ref={headRef}>
          <p className="testimonials__eyebrow" data-anim>Reviews</p>
          <h2 className="testimonials__title" data-anim>Real students.<br />Real results.</h2>
          <p className="testimonials__sub" data-anim>Over 200,000 students and creators trust Studiva.</p>
        </div>

        {/* Trust stats */}
        <div className="trust-row" ref={trustRef}>
          {trustStats.map((b, i) => (
            <div key={i} className="trust-badge">
              <span className="trust-badge__icon">{b.icon}</span>
              <span className="trust-badge__val" style={{ color: b.valColor }}>{b.val}</span>
              <span className="trust-badge__label">{b.label}</span>
            </div>
          ))}
        </div>

        {/* Cards */}
        <div className="testimonials__grid" ref={gridRef}>
          {testimonials.map(t => (
            <div className="tcard" key={t.id}>
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
    </section>
  );
};

export default Testimonials;