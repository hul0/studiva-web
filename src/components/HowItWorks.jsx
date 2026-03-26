import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HowItWorks.css';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        pos: 'top-left',
        title: 'Upload your notes',
        desc: 'Quickly upload your PDFs in high resolution. Our <span class="text-gradient">advanced AI</span> instantly tags and categorizes your content for <span class="text-highlight">global reach</span> across the marketplace.',
        image: '/images/upload.svg',
    },
    {
        pos: 'top-right',
        title: 'Set your price',
        desc: 'Choose free, paid, or ad-supported access with <span class="text-gradient">total pricing control</span>. Monetize your expertise and set <span class="text-highlight">competitive rates</span> that reward your hard work.',
        image: '/images/price.svg',
    },
    {
        pos: 'bottom-left',
        title: 'Students unlock it',
        desc: 'Learners pay or watch ads to access your <span class="text-gradient">exclusive notes</span>. Instantly reach a massive audience seeking <span class="text-highlight">unique insights</span> only you can provide.',
        image: '/images/unlock.svg',
    },
    {
        pos: 'bottom-right',
        title: 'Instant Withdrawals',
        desc: 'Revenue appears instantly in your <span class="text-gradient">dedicated dashboard</span>. Withdraw total earnings same-day directly to UPI or any bank account with <span class="text-highlight">zero hidden fees</span>.',
        image: '/images/withdraw.svg',
    },
];

const HowItWorks = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const headerTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".how-it-works__head",
                    start: "top 90%",
                    toggleActions: "play none none reverse"
                }
            });

            headerTl
                .from(".how-it-works__badge", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" })
                .from(".how-it-works__title", { y: 50, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.4");

            // Central Core & Cross Beams
            const coreTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".how-it-works__hub-container",
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                }
            });

            coreTl
                .from(".how-it-works__core", { scale: 0, opacity: 0, duration: 1.2, ease: "elastic.out(1, 0.5)" })
                .from(".how-it-works__core-img", { scale: 1.5, opacity: 0, duration: 1, ease: "power2.out" }, "-=0.8")
                .from(".how-it-works__cross-line", { scaleX: 0, opacity: 0, duration: 1.2, stagger: 0.15, ease: "power2.inOut" }, "-=1");

            // Card Animations (Simultaneous from corners)
            const triggerSettings = {
                trigger: ".how-it-works__hub-container",
                start: "top 70%",
                toggleActions: "play none none reverse"
            };

            gsap.fromTo(".step-card-node--top-left", { x: -250, y: -180, opacity: 0, rotation: -10 }, { x: 0, y: 0, opacity: 1, rotation: 0, duration: 1.5, ease: "power4.out", scrollTrigger: triggerSettings });
            gsap.fromTo(".step-card-node--top-right", { x: 250, y: -180, opacity: 0, rotation: 10 }, { x: 0, y: 0, opacity: 1, rotation: 0, duration: 1.5, ease: "power4.out", scrollTrigger: triggerSettings });
            gsap.fromTo(".step-card-node--bottom-left", { x: -250, y: 180, opacity: 0, rotation: -10 }, { x: 0, y: 0, opacity: 1, rotation: 0, duration: 1.5, ease: "power4.out", scrollTrigger: triggerSettings });
            gsap.fromTo(".step-card-node--bottom-right", { x: 250, y: 180, opacity: 0, rotation: 10 }, { x: 0, y: 0, opacity: 1, rotation: 0, duration: 1.5, ease: "power4.out", scrollTrigger: triggerSettings });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="how-it-works" id="how-it-works" ref={sectionRef}>
            <div className="container">
                <div className="how-it-works__head">
                    <span className="how-it-works__badge">The Roadmap</span>
                    <h2 className="how-it-works__title">Simplicity<br />that scales.</h2>
                </div>

                <div className="how-it-works__hub-container">
                    <div className="how-it-works__cross">
                        <div className="how-it-works__cross-line" />
                        <div className="how-it-works__cross-line how-it-works__cross-line--alt" />
                    </div>

                    <div className="how-it-works__core">
                        <img 
                            src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop" 
                            alt="Marketplace Core" 
                            className="how-it-works__core-img"
                        />
                    </div>

                    {steps.map((step, i) => (
                        <div key={i} className={`step-card-node step-card-node--${step.pos}`}>
                            <div className={`step-card-node__ill-box step-card-node__ill-box--${step.pos}`}>
                                <img src={step.image} alt={step.title} className="step-card-node__image" />
                            </div>
                            <div className="step-card-node__text">
                                <h3 className="step-card-node__title">{step.title}</h3>
                                <p className="step-card-node__desc" dangerouslySetInnerHTML={{ __html: step.desc }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;