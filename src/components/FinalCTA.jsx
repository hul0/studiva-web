import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
            <div className="container final-cta__inner">
                <div className="final-cta__content">
                    <h2 className="final-cta__title cta-animate">
                        You're still here!
                    </h2>
                    <p className="final-cta__sub cta-animate">
                        Don't let your study goals go the way of the dinosaurs. Get started now.
                    </p>

                    <a href="https://play.google.com/store/apps/details?id=com.studiva.app" className="btn-primary-white cta-animate" id="final-cta-btn">
                        Download Now
                    </a>
                </div>

                <div className="final-cta__graphic cta-animate">
                    <img
                        src="/images/funny_guy.png"
                        alt="Funny guy sipping from cup illustration"
                        className="dino-image"
                        draggable="false"
                        loading="lazy"
                    />
                </div>
            </div>
        </section>
    );
};

export default FinalCTA;
