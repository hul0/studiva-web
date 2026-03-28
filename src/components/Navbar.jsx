import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { Menu, X, ArrowRight, BookOpen, UserCircle, Layout, LayoutDashboard } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const [activeSection, setActiveSection] = useState('');
    const navRef = useRef(null);
    const indicatorRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };

        // Active Section Observer
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };

        const observerCallback = (entries) => {
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

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, []);

    // Update Indicator Position
    useEffect(() => {
        const activeLink = document.querySelector(`.nav__link--active`);
        if (activeLink && indicatorRef.current) {
            const { offsetLeft, offsetWidth } = activeLink;
            indicatorRef.current.style.width = `${offsetWidth}px`;
            indicatorRef.current.style.transform = `translateX(${offsetLeft - 4}px)`;
            indicatorRef.current.style.opacity = '1';
        } else if (indicatorRef.current) {
            indicatorRef.current.style.opacity = '0';
        }
    }, [activeSection]);

    const scrollToSection = (e, id) => {
        e.preventDefault();
        const el = document.getElementById(id.replace('#', ''));
        if (el) {
            const offset = 80; // Adjust for navbar height
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = el.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
        setIsOpen(false);
    };

    useEffect(() => {
        if (!navRef.current) return;

        if (scrolled) {
            // Sequence: Shrink Width first, then Top/Height
            gsap.timeline({ overwrite: 'auto' })
                .to(navRef.current, { 
                    maxWidth: '1100px', 
                    duration: 0.35, 
                    ease: 'power3.out' 
                })
                .to(navRef.current, { 
                    top: '12px', 
                    height: '60px', 
                    background: 'rgba(10, 10, 10, 0.85)',
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                    duration: 0.35, 
                    ease: 'power3.out' 
                }, '-=0.1'); // slight overlap
        } else {
            // Reverse: Move Down first, then Expand Width
            gsap.timeline({ overwrite: 'auto' })
                .to(navRef.current, { 
                    top: '24px', 
                    height: '64px',
                    background: 'rgba(15, 15, 15, 0.5)',
                    borderColor: 'rgba(255, 255, 255, 0.08)',
                    duration: 0.35, 
                    ease: 'power3.out' 
                })
                .to(navRef.current, { 
                    maxWidth: '1200px', 
                    duration: 0.35, 
                    ease: 'power3.out' 
                }, '-=0.1');
        }
    }, [scrolled]);

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
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2v20M2 12h20" className="opacity-40" />
                            <path d="M7 7l10 10M17 7L7 17" />
                        </svg>
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
