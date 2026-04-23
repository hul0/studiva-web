import { useState, useRef } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Footer = () => {
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (id) => {
        setOpenDropdown(openDropdown === id ? null : id);
    };

    const categories = [
        { id: 'product', title: 'PRODUCT', links: ['Features', 'How it works', 'Creator Tools', 'Pricing', 'Release Notes'] },
        { id: 'subjects', title: 'SUBJECTS', links: ['JEE Mains', 'NEET UG', 'CBSE Class 12', 'UPSC Prelims', 'Engineering'] },
        { id: 'company', title: 'COMPANY', links: ['About Studyvia', 'Development Team', 'Career', 'Newsroom', 'Contact Us'] },
        { id: 'legal', title: 'LEGAL', links: ['Privacy Policy', 'Terms of Service', 'Account Deletion'] },
    ];

    const socials = ['INSTAGRAM', 'FACEBOOK', 'TWITTER', 'LINKEDIN'];
    const massiveTextRef = useRef(null);
    const footerRef = useRef(null);

    useGSAP(() => {
        const mm = gsap.matchMedia();

        // Bouncing letter entrance animation (Desktop/Tablet only)
        mm.add("(min-width: 641px)", () => {
            const letters = massiveTextRef.current?.querySelectorAll('.footer-letter');
            if (!letters || letters.length === 0) return;

            // Letters start at y:120 scale:0.5 (set in CSS)
            // Animate each letter bouncing up into place — replays every time footer enters viewport
            gsap.to(letters, {
                y: 0,
                scale: 1,
                rotation: 0,
                duration: 1.4,
                stagger: {
                    each: 0.12,
                    from: "start"
                },
                ease: "bounce.out",
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 85%",
                    end: "top 20%",
                    toggleActions: "play reverse play reverse"
                }
            });
        });

        // Magnetic links for social buttons (scoped to footer)
        const socialBtns = footerRef.current?.querySelectorAll('.footer-b__social-btn');
        if (!socialBtns) return;

        socialBtns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' });
            });
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
            });
        });

    }, { scope: footerRef });

    const FooterText = "STUDIVA";

    return (
        <footer className="footer-brutalist" id="footer" ref={footerRef}>
            <div className="footer-b__top-area">
                <div className="container">
                    <div className="footer-b__grid">
                        {/* Column 1: Dropdowns */}
                        <div className="footer-b__col footer-b__dropdowns">
                            {categories.map(cat => (
                                <div key={cat.id} className="footer-b__dropdown">
                                    <button
                                        className="footer-b__dropdown-btn"
                                        onClick={() => toggleDropdown(cat.id)}
                                    >
                                        {cat.title}
                                        <span className={`footer-b__arrow ${openDropdown === cat.id ? 'open' : ''}`}>↘</span>
                                    </button>
                                    <div className={`footer-b__dropdown-content ${openDropdown === cat.id ? 'open' : ''}`}>
                                        {cat.links.map(link => (
                                            <a href={link === 'Development Team' ? '/team' : '#'} key={link} className="footer-b__link">{link}</a>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Column 2: Newsletter */}
                        <div className="footer-b__col footer-b__newsletter">
                            <p className="footer-b__text-block">
                                SIGN UP FOR THE LATEST RESOURCES,<br />
                                NOTES & INSIGHTS
                            </p>
                            <form className="footer-b__form">
                                <input type="email" placeholder="EMAIL ADDRESS" className="footer-b__input" />
                                <button type="button" className="footer-b__submit">
                                    <ArrowRight size={16} color="#171717" strokeWidth={2.5} />
                                </button>
                            </form>
                        </div>

                        {/* Column 3: Socials */}
                        <div className="footer-b__col footer-b__socials">
                            {socials.map(social => (
                                <a href="#" key={social} className="footer-b__social-btn">
                                    {social} <ArrowUpRight size={14} color="#171717" strokeWidth={2.5} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-b__bottom-area">
                <h1 className="footer-b__massive-text" ref={massiveTextRef}>
                    {FooterText.split('').map((char, index) => (
                        <span key={index} className="footer-letter">{char}</span>
                    ))}

                </h1>
            </div>
        </footer>
    );
};

export default Footer;
