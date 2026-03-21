import { Twitter, Instagram, Linkedin, Youtube, Zap } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    const cols = [
        { title: 'Product', links: ['Features', 'How it works', 'Creator Tools', 'Pricing', 'Release Notes'] },
        { title: 'Subjects', links: ['JEE Mains', 'NEET UG', 'CBSE Class 12', 'UPSC Prelims', 'Engineering'] },
        { title: 'Company', links: ['About Studyvia', 'Career', 'Newsroom', 'Contact Us'] },
        { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Cookie Settings'] },
    ];

    return (
        <footer className="footer" id="footer">
            <div className="container footer__inner">
                <div className="footer__brand">
                    <div className="footer__logo">
                        <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                            <rect width="28" height="28" rx="7" fill="var(--accent)" />
                            <path d="M7 9h14M7 14h9M7 19h12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
                        </svg>
                        <span>Studyvia</span>
                    </div>
                    <p className="footer__tagline">The world's premium note-sharing marketplace. Built for students, by students.</p>
                    <div className="footer__social">
                        {[Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => (
                            <a key={i} href="#" className="footer__social-link" aria-label="Social link">
                                <Icon size={16} />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="footer__nav">
                    {cols.map(col => (
                        <div key={col.title} className="footer__col">
                            <span className="footer__col-title">{col.title}</span>
                            <ul>
                                {col.links.map(l => (
                                    <li key={l}><a href="#" id={`footer-link-${l.toLowerCase().replace(/\s+/g, '-')}`}>{l}</a></li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <div className="footer__bottom">
                <div className="container footer__bottom-inner">
                    <span>© 2025 Studyvia Platform. All rights reserved.</span>
                    <span className="footer__location">
                        <Zap size={12} fill="var(--accent-light)" stroke="none" />
                        Made in India
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
