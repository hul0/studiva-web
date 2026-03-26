import { useEffect, useState } from 'react';
import { Menu, X, ArrowRight, BookOpen, UserCircle, Layout, LayoutDashboard } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const links = [
        { label: 'Features', href: '#features', icon: <Layout size={14} /> },
        { label: 'How it works', href: '#how-it-works', icon: <LayoutDashboard size={14} /> },
        { label: 'Creators', href: '#creators', icon: <UserCircle size={14} /> },
        { label: 'Reviews', href: '#testimonials', icon: <BookOpen size={14} /> },
    ];

    return (
        <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
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
                    {links.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="nav__link"
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

            {/* Mobile Menu */}
            <div className={`nav__mobile-menu ${isOpen ? 'is-open' : ''}`}>
                <div className="nav__mobile-inner">
                    {links.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
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
