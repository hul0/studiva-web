import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X, ArrowRight, BookOpen, UserCircle, Layout, LayoutDashboard, Users } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';
import './Navbar.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const [activeSection, setActiveSection] = useState('');
    const navRef = useRef(null);
    const indicatorRef = useRef(null);
    const isNavClickScrolling = useRef(false);

    useGSAP(() => {

        // Magnetic Button Hover
        const btn = document.querySelector('#nav-cta-download');
        if (btn) {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' });
            });
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
            });
        }

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
                        .to(nav, { maxWidth: '1280px', duration: 0.35, ease: 'power3.out' })
                        .to(nav, { top: '12px', height: '60px', duration: 0.35, ease: 'power3.out' }, '-=0.15');
                },
                onLeaveBack: () => {
                    setScrolled(false);
                    gsap.timeline({ overwrite: 'auto' })
                        .to(nav, { top: '24px', height: '64px', duration: 0.35, ease: 'power3.out' })
                        .to(nav, { maxWidth: '1380px', duration: 0.35, ease: 'power3.out' }, '-=0.15');
                }
            });
        }

        return () => {
            observer.disconnect();
            if (scrollTrig) scrollTrig.kill();
        };
    }, { scope: navRef });

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

    // Handle hash scroll on mount or path change
    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const sectionId = hash.replace('#', '');
            // Delay to allow lazy-loaded components to render
            const timer = setTimeout(() => {
                const el = document.getElementById(sectionId);
                if (el) {
                    const offset = 80;
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = el.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    setActiveSection(sectionId);
                }
            }, 600);
            return () => clearTimeout(timer);
        }
    }, [window.location.pathname]);

    const scrollToSection = (e, id) => {
        e.preventDefault();

        // Handle full routes (non-hash)
        if (!id.startsWith('#')) {
            window.history.pushState({}, '', id);
            window.dispatchEvent(new Event('navigate'));
            setIsOpen(false);
            window.scrollTo(0, 0);
            return;
        }

        const sectionId = id.replace('#', '');
        const el = document.getElementById(sectionId);

        // If element exists on current page, scroll to it
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

            // Update URL hash without reload
            window.history.pushState({}, '', `/${id}`);

            setTimeout(() => {
                isNavClickScrolling.current = false;
            }, 1000);
        } else {
            // If element doesn't exist, we're likely on another page
            // Navigate to home with hash
            window.history.pushState({}, '', `/${id}`);
            window.dispatchEvent(new Event('navigate'));
        }
        setIsOpen(false);
    };


    const links = [
        { label: 'Features', href: '#features', icon: <Layout size={14} /> },
        { label: 'How it works', href: '#how-it-works', icon: <LayoutDashboard size={14} /> },
        { label: 'Creators', href: '#creators', icon: <UserCircle size={14} /> },
        { label: 'Reviews', href: '#testimonials', icon: <BookOpen size={14} /> },
        { label: 'Campus Rep', href: '/campus-representative', icon: <Users size={14} /> },
        { label: 'Team', href: '/team', icon: <Users size={14} /> },
    ];

    return (
        <>
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
                                src="/images/studiva-quill-icon.svg"
                                alt="Studiva Logo"
                                className="nav__logo-img"
                            />
                        </div>
                        <span>Studiva</span>
                    </a>

                    {/* Desktop Links */}
                    <div className="nav__links">
                        <div className="nav__indicator" ref={indicatorRef} />
                        {links.map((link) => {
                            const isActive = link.href.startsWith('#')
                                ? activeSection === link.href.slice(1)
                                : window.location.pathname === link.href;

                            return (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={(e) => scrollToSection(e, link.href)}
                                    className={`nav__link ${isActive ? 'nav__link--active' : ''}`}
                                    id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                                >
                                    <span className="nav__link-icon">{link.icon}</span>
                                    <span>{link.label}</span>
                                </a>
                            );
                        })}
                    </div>

                    {/* Actions */}
                    <div className="nav__actions">
                        <ThemeToggle />
                        {/* <a 
                        href="/dashboard" 
                        className="nav__link nav__link--dashboard"
                        onClick={(e) => {
                            e.preventDefault();
                            window.history.pushState({}, '', '/dashboard');
                            window.dispatchEvent(new Event('navigate'));
                        }}
                    >
                        Dashboard
                    </a> */}
                        <a
                            href="#download"
                            className="btn-primary"
                            id="nav-cta-download"
                            onClick={(e) => scrollToSection(e, '#download')}
                        >
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
            </nav>

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
        </>
    );
};

export default Navbar;
