import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Testimonials.css';

gsap.registerPlugin(ScrollTrigger);

const StarIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="#a78bfa" stroke="none">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

const testimonials = [
    {
        id: 't1', name: 'Aarav Sharma', role: 'JEE Advanced AIR 247',
        badge: 'Top Ranker', text: 'Uploaded my 3 years of JEE prep and now earn ₹15K/month passively. The auto-tagging is spot on.',
        earn: '₹15K / month', initials: 'AS',
    },
    {
        id: 't2', name: 'Priya Nair', role: 'NEET UG AIR 512',
        badge: 'Creator', text: 'NEET biology notes are flying off the shelf. The rewarded ad model is brilliant — students who can\'t pay still get access. I earn either way.',
        earn: '₹22K / month', initials: 'PN',
    },
    {
        id: 't3', name: 'Rohit Verma', role: 'Engineering, IIT Delhi',
        badge: 'Learner', text: 'I used to spend ₹3K on coaching material every month. Now I pay ₹200 or watch an ad. Peer notes beat textbooks.',
        earn: 'Saved ₹2,800/mo', initials: 'RV',
    },
    {
        id: 't4', name: 'Sneha Patel', role: 'CBSE Class 12 — 99.6%',
        badge: 'Creator + Learner', text: 'Just scan and tag. Withdrawal to UPI happens same day. I never thought selling notes could be this frictionless.',
        earn: '₹8K / month', initials: 'SP',
    },
    {
        id: 't5', name: 'Arjun Reddy', role: 'UPSC Aspirant, CSE 2024',
        badge: 'Learner', text: 'Civil services prep is expensive. Studyvia changed that. IAS toppers\' notes at a fraction of coaching cost. Ad-unlock option is a lifesaver.',
        earn: 'Saved ₹5K/mo', initials: 'AR',
    },
    {
        id: 't6', name: 'Kavya Iyer', role: 'B.Com, Delhi University',
        badge: 'Creator', text: 'CA Foundation notes as a side hustle. The creator dashboard shows exactly where each rupee comes from. 5 stars.',
        earn: '₹6K / month', initials: 'KI',
    },
];

const Testimonials = () => {
    const gridRef = useRef(null);

    useEffect(() => {
        const el = gridRef.current;
        if (!el) return;
        const tl = gsap.timeline({
            scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
        });
        tl.fromTo(el.querySelectorAll('.tcard'),
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out' }
        );
        return () => tl.kill();
    }, []);

    return (
        <section className="testimonials" id="testimonials">
            <div className="container">
                <div className="testimonials__head">
                    <span className="label">Reviews</span>
                    <h2 className="section-title">Real students.<br />Real results.</h2>
                    <p className="section-sub">Over 200,000 students and creators trust Studyvia.</p>
                </div>

                {/* Trust row */}
                <div className="trust-row">
                    {[
                        {
                            icon: (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                            ), val: '4.9', label: 'App Store'
                        },
                        {
                            icon: (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                            ), val: '200K+', label: 'Active users'
                        },
                        {
                            icon: (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                    <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                </svg>
                            ), val: '₹2Cr+', label: 'Paid to creators'
                        },
                        {
                            icon: (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                </svg>
                            ), val: '50K+', label: 'Notes available'
                        },
                    ].map((b, i) => (
                        <div key={i} className="trust-badge" id={`trust-${i}`}>
                            <span className="trust-badge__icon">{b.icon}</span>
                            <span className="trust-badge__val">{b.val}</span>
                            <span className="trust-badge__label">{b.label}</span>
                        </div>
                    ))}
                </div>

                {/* Grid */}
                <div className="testimonials__grid" ref={gridRef}>
                    {testimonials.map(t => (
                        <div className="tcard card" key={t.id} id={t.id}>
                            <div className="tcard__top">
                                <div className="tcard__avatar" aria-label={t.name}>
                                    {t.initials}
                                </div>
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
