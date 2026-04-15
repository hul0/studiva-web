import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Marquee.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const items = [
    'Upload notes instantly',
    'Earn from paid access',
    'Rewarded ads — not forced',
    'JEE · NEET · CBSE',
    'No subscription needed',
    'Withdraw via UPI',
    'Real student content',
    'Growing community',
    'Handwritten & PDF support',
    'Creator dashboard',
];

const Dot = () => <span className="marquee__dot" aria-hidden="true" />;

const Marquee = () => {
    const trackRef = useRef(null);
    const marqueeTween = useRef(null);

    useGSAP(() => {
        const track = trackRef.current;
        if (!track) return;

        // Animate continuously
        marqueeTween.current = gsap.to(track, {
            xPercent: -50, // scroll half way (since we duplicated items)
            repeat: -1,
            duration: 35,
            ease: "none",
        });

        // Add a ScrollTrigger to react dynamically to scroll
        ScrollTrigger.create({
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
                // If scrolling down, normal timeScale slightly amplified.
                // If scrolling up, reverse the timeScale.
                const velocity = self.getVelocity();
                let timeScaleCurve = self.direction === 1 ? 1 + velocity / 2000 : -1 + velocity / 2000;
                
                gsap.to(marqueeTween.current, { 
                    timeScale: timeScaleCurve, 
                    duration: 0.1, 
                    overwrite: true 
                });
                
                // Return to normal speed quickly after scrolling stops
                gsap.to(marqueeTween.current, { 
                    timeScale: 1, 
                    duration: 0.5, 
                    delay: 0.15, 
                    overwrite: "auto" 
                });
            }
        });
    }, { scope: trackRef });

    // Pause on hover
    const handleEnter = () => marqueeTween.current?.pause();
    const handleLeave = () => marqueeTween.current?.play();

    return (
        <div className="marquee-strip" aria-hidden="true" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
            <div className="marquee-track" ref={trackRef}>
                {[...items, ...items].map((item, i) => (
                    <span key={i} className="marquee__item">
                        {item}
                        <Dot />
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Marquee;
