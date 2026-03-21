import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HowItWorks.css';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        num: '01',
        title: 'Upload your notes',
        desc: 'Scan, photograph, or export your notes as PDF. Our AI automatically categorises and tags them by subject and topic.',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
        ),
    },
    {
        num: '02',
        title: 'Set your price',
        desc: 'Choose free, paid, or ad-supported access. Set your own rate. No one tells you what your knowledge is worth.',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
        ),
    },
    {
        num: '03',
        title: 'Students unlock it',
        desc: 'Learners pay directly or watch a short rewarded ad to access your notes. They choose — no forced interruptions.',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
        ),
    },
    {
        num: '04',
        title: 'Earn & withdraw',
        desc: 'Revenue appears in your dashboard instantly. Withdraw any amount to UPI or bank account — same day.',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
        ),
    },
];

const HowItWorks = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const tl = gsap.timeline({
            scrollTrigger: { trigger: el, start: 'top 75%', toggleActions: 'play none none none' },
        });
        tl.from(el.querySelectorAll('.step-card'), {
            opacity: 0,
            y: 40,
            stagger: 0.12,
            duration: 0.65,
            ease: 'power3.out',
        });

        return () => tl.kill();
    }, []);

    return (
        <section className="how-it-works" id="how-it-works" ref={sectionRef}>
            <div className="container">
                <div className="how-it-works__head">
                    <span className="label">Process</span>
                    <h2 className="section-title">How it works</h2>
                    <p className="section-sub">From upload to withdrawal in four simple steps.</p>
                </div>
                <div className="how-it-works__grid">
                    {steps.map((step, i) => (
                        <div className="step-card card" key={i} id={`step-${i + 1}`}>
                            <div className="step-card__num">{step.num}</div>
                            <div className="step-card__icon">{step.icon}</div>
                            <h3 className="step-card__title">{step.title}</h3>
                            <p className="step-card__desc">{step.desc}</p>
                            {i < steps.length - 1 && (
                                <div className="step-card__connector" aria-hidden="true" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
