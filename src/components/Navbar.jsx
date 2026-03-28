import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X, ArrowRight, BookOpen, UserCircle, Layout, LayoutDashboard } from 'lucide-react';
import './Navbar.css';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const [activeSection, setActiveSection] = useState('');
    const navRef = useRef(null);
    const indicatorRef = useRef(null);
    const isNavClickScrolling = useRef(false);

    useEffect(() => {
        // Active Section Observer
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };

        const observerCallback = (entries) => {
            if (isNavClickScrolling.current) return;
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        const sections = ['features', 'how-it-works', 'creators', 'testimonials'];
        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        // High Performance Scroll Animation
        let scrollTrig;
        if (navRef.current) {
            const nav = navRef.current;
            scrollTrig = ScrollTrigger.create({
                start: 'top -40',
                onEnter: () => {
                    setScrolled(true);
                    gsap.timeline({ overwrite: 'auto' })
                        .to(nav, { maxWidth: '1100px', duration: 0.35, ease: 'power3.out' })
                        .to(nav, { top: '12px', height: '60px', background: 'rgba(10, 10, 10, 0.85)', borderColor: 'rgba(255, 255, 255, 0.15)', duration: 0.35, ease: 'power3.out' }, '-=0.15');
                },
                onLeaveBack: () => {
                    setScrolled(false);
                    gsap.timeline({ overwrite: 'auto' })
                        .to(nav, { top: '24px', height: '64px', background: 'rgba(15, 15, 15, 0.45)', borderColor: 'rgba(255, 255, 255, 0.08)', duration: 0.35, ease: 'power3.out' })
                        .to(nav, { maxWidth: '1200px', duration: 0.35, ease: 'power3.out' }, '-=0.15');
                }
            });
        }

        return () => {
            observer.disconnect();
            if (scrollTrig) scrollTrig.kill();
        };
    }, []);

    // Update Indicator Position
    useEffect(() => {
        const activeLink = document.querySelector(`.nav__link--active`);
        if (activeLink && indicatorRef.current) {
            const { offsetLeft, offsetWidth } = activeLink;
            gsap.to(indicatorRef.current, {
                width: offsetWidth,
                x: offsetLeft - 4,
                opacity: 1,
                duration: 0.4,
                ease: 'power3.out',
                overwrite: 'auto'
            });
        } else if (indicatorRef.current) {
            gsap.to(indicatorRef.current, { opacity: 0, duration: 0.3 });
        }
    }, [activeSection]);

    const scrollToSection = (e, id) => {
        e.preventDefault();
        const sectionId = id.replace('#', '');
        const el = document.getElementById(sectionId);
        
        if (el) {
            isNavClickScrolling.current = true;
            setActiveSection(sectionId);
            
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = el.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Re-enable observer after scroll finishes (longer timeout for smooth scroll)
            setTimeout(() => {
                isNavClickScrolling.current = false;
            }, 1800);
        }
        setIsOpen(false);
    };


    const links = [
        { label: 'Features', href: '#features', icon: <Layout size={14} /> },
        { label: 'How it works', href: '#how-it-works', icon: <LayoutDashboard size={14} /> },
        { label: 'Creators', href: '#creators', icon: <UserCircle size={14} /> },
        { label: 'Reviews', href: '#testimonials', icon: <BookOpen size={14} /> },
    ];

    return (
        <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`} ref={navRef}>
            <div className="container nav__inner">
                {/* Logo */}
                <a 
                    href="/" 
                    className="nav__logo" 
                    id="nav-logo"
                    onClick={(e) => {
                        e.preventDefault();
                        window.history.pushState({}, '', '/');
                        window.dispatchEvent(new Event('navigate'));
                    }}
                >
                    <div className="nav__logo-icon">
                        <img 
                            src="/images/studiva-app-logo-black-white.svg" 
                            alt="Studiva Logo" 
                            className="nav__logo-img" 
                        />
                    </div>
                    <span>Studiva</span>
                </a>

                {/* Desktop Links */}
                <div className="nav__links">
                    <div className="nav__indicator" ref={indicatorRef} />
                    {links.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={(e) => scrollToSection(e, link.href)}
                            className={`nav__link ${activeSection === link.href.slice(1) ? 'nav__link--active' : ''}`}
                            id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                            <span className="nav__link-icon">{link.icon}</span>
                            <span>{link.label}</span>
                        </a>
                    ))}
                </div>

                {/* Actions */}
                <div className="nav__actions">
                    <a href="#download" className="btn-primary" id="nav-cta-download">
                        Get App
                        <ArrowRight size={14} />
                    </a>
                    <button
                        className="nav__mobile-toggle"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Backdrop */}
            {isOpen && (
                <div 
                    className="nav__mobile-backdrop" 
                    onClick={() => setIsOpen(false)}
                    aria-hidden="true" 
                />
            )}

            {/* Mobile Menu */}
            <div className={`nav__mobile-menu ${isOpen ? 'is-open' : ''}`}>
                <div className="nav__mobile-inner">
                    {links.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={(e) => scrollToSection(e, link.href)}
                            className="nav__mobile-link"
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                {link.icon}
                                {link.label}
                            </div>
                            <ArrowRight size={14} style={{ opacity: 0.3 }} />
                        </a>
                    ))}
                    <div style={{ padding: '8px 4px 0' }}>
                        <a href="#download" className="btn-primary" style={{ display: 'flex', width: '100%', justifyContent: 'center', height: '48px', alignItems: 'center' }}>
                            Join 200,000+ Learners
                        </a>
                    </div>
                </div>
            </div>

        </nav>
    );
};

export default Navbar;
