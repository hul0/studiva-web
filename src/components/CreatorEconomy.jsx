import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { CreditCard, PlayCircle, Rocket, Sparkles, TrendingUp, Users, FileText, Wallet } from 'lucide-react';
import './CreatorEconomy.css';

gsap.registerPlugin(ScrollTrigger);

const modes = [
    {
        id: 'paid',
        icon: <CreditCard size={32} strokeWidth={1.5} />,
        title: 'Paid Access',
        badge: 'Highest earners',
        desc: 'Set a one-time price for your academic mastery. Learners pay to access your full notes. You earn 70% of every sale.',
        earn: '₹15,000 / month avg.',
    },
    {
        id: 'rewarded',
        icon: <PlayCircle size={32} strokeWidth={1.5} />,
        title: 'Rewarded Ads',
        badge: 'Best reach',
        desc: 'Notes are free — learners watch a 30-second ad to unlock. You earn from ad revenue automatically with zero friction.',
        earn: '₹6,000 / month avg.',
    },
    {
        id: 'free',
        icon: <Rocket size={32} strokeWidth={1.5} />,
        title: 'Lead Magnet',
        badge: 'Build reputation',
        desc: 'Share freely to grow your follower base and rank in search. Lead Magnet notes drive higher conversion for your paid content.',
        earn: 'Reputation + discovery',
    },
];

const stats = [
    { label: 'Creator payouts', value: 24, prefix: '₹', suffix: 'L+' },
    { label: 'Active creators', value: 4200, prefix: '', suffix: '+' },
    { label: 'Notes monetised', value: 32, prefix: '', suffix: 'K+' },
    { label: 'Avg monthly earn', value: 8400, prefix: '₹', suffix: '' },
];

function useCounter(target, duration = 1.0, start = false) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!start) return;
        let startTime = null;
        const step = (ts) => {
            if (!startTime) startTime = ts;
            const progress = Math.min((ts - startTime) / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [start, target, duration]);
    return count;
}

const StatItem = ({ stat, animate }) => {
    const count = useCounter(stat.value, 1.2, animate);
    return (
        <div className="creator-stat">
            <span className="creator-stat__val">{stat.prefix}{count}{stat.suffix}</span>
            <span className="creator-stat__label">{stat.label}</span>
        </div>
    );
};

const CreatorEconomy = () => {
    const sectionRef = useRef(null);
    const [animateStats, setAnimateStats] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header Animation (Ultra Fast)
            gsap.fromTo(".creator__head > *", {
                y: 20,
                opacity: 0,
            }, {
                y: 0,
                opacity: 1,
                stagger: 0.05,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".creator__head",
                    start: "top 95%",
                }
            });

            // Plates Animation (Force Visible Stack)
            gsap.fromTo(".mode-plate", {
                x: -30,
                opacity: 0,
            }, {
                x: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".creator__modes",
                    start: "top 90%",
                    once: true,
                    onEnter: () => ScrollTrigger.refresh()
                }
            });

            // Stats row reveal
            gsap.fromTo(".creator__stats", {
                opacity: 0,
                y: 20,
            }, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".creator__stats",
                    start: "top 100%",
                    onEnter: () => setAnimateStats(true),
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="creator" id="creators" ref={sectionRef}>
            <div className="container">
                {/* Header Section */}
                <div className="creator__head">
                    <span className="creator__badge">Monetization Engine</span>
                    <h2 className="creator__title">Earn from what<br />you already know.</h2>
                    <p className="creator__desc">
                        Our marketplace transforms your academic hard work into a sustainable income stream through unique monetization paths.
                    </p>
                </div>

                {/* 💠 Modes: Horizontal Stack Plates (NON-GRID) */}
                <div className="creator__modes">
                    {modes.map((m, i) => (
                        <div key={m.id} className="mode-plate">
                            <div className="mode-plate__icon-box">
                                {m.icon}
                            </div>
                            <div className="mode-plate__content">
                                <div className="mode-plate__title">
                                    {m.title}
                                    <span className="mode-plate__badge">{m.badge}</span>
                                </div>
                                <p className="mode-plate__desc">{m.desc}</p>
                            </div>
                            <div className="mode-plate__earn-block">
                                <span className="mode-plate__earn-label">Expected Earnings</span>
                                <div className="mode-plate__earn-val">{m.earn}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 📊 Animated Analytics Grid */}
                <div className="creator__stats">
                    {stats.map((s, i) => (
                        <StatItem key={i} stat={s} animate={animateStats} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CreatorEconomy;
