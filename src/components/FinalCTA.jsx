import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Apple, Smartphone, CheckCircle2 } from 'lucide-react';
import './FinalCTA.css';

gsap.registerPlugin(ScrollTrigger);

const FinalCTA = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none',
                once: true
            },
        });

        tl.fromTo(el.querySelectorAll('.cta-animate'),
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out' }
        );

        return () => tl.kill();
    }, []);

    return (
        <section className="final-cta" id="download" ref={sectionRef}>
            <div className="final-cta__grid-bg" />
            <div className="container final-cta__inner">
                <span className="label cta-animate">Ready to Begin?</span>
                <h2 className="final-cta__title cta-animate">
                    Join 200,000 students <br />
                    growing on <span className="accent-text">Studyvia.</span>
                </h2>
                <p className="section-sub final-cta__sub cta-animate">
                    Start monetising your notes today. Instant setup,
                    70% earnings, and same-day withdrawals.
                </p>

                <div className="final-cta__btns cta-animate">
                    <a href="#" className="cta-store-btn" id="final-cta-appstore">
                        <Apple size={22} fill="currentColor" stroke="none" />
                        <div>
                            <span className="cta-store-btn__sub">Download on the</span>
                            <span className="cta-store-btn__name">App Store</span>
                        </div>
                    </a>
                    <a href="#" className="cta-store-btn" id="final-cta-playstore">
                        <Smartphone size={22} />
                        <div>
                            <span className="cta-store-btn__sub">Get it on</span>
                            <span className="cta-store-btn__name">Google Play</span>
                        </div>
                    </a>
                </div>

                <div className="final-cta__feature-tags cta-animate">
                    {[
                        'No forced ads — ever',
                        'Earn from Day 1',
                        'Secure payments',
                        'Verified content'
                    ].map(t => (
                        <span key={t} className="final-cta__tag">
                            <CheckCircle2 size={12} color="var(--accent-light)" />
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FinalCTA;
