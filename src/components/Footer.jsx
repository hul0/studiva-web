import { useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (id) => {
        setOpenDropdown(openDropdown === id ? null : id);
    };

    const categories = [
        { id: 'product', title: 'PRODUCT', links: ['Features', 'How it works', 'Creator Tools', 'Pricing', 'Release Notes'] },
        { id: 'subjects', title: 'SUBJECTS', links: ['JEE Mains', 'NEET UG', 'CBSE Class 12', 'UPSC Prelims', 'Engineering'] },
        { id: 'company', title: 'COMPANY', links: ['About Studyvia', 'Career', 'Newsroom', 'Contact Us'] },
        { id: 'legal', title: 'LEGAL', links: ['Privacy Policy', 'Terms of Service', 'Account Deletion'] },
    ];

    const socials = ['INSTAGRAM', 'FACEBOOK', 'TWITTER', 'LINKEDIN'];

    return (
        <footer className="footer-brutalist" id="footer">
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
                                            <a href="#" key={link} className="footer-b__link">{link}</a>
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
                <h1 className="footer-b__massive-text">STUDIVA</h1>
            </div>
        </footer>
    );
};

export default Footer;
