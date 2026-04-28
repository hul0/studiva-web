import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { api } from '../services/api';
import './CampusRepresentative.css';

/* ─── Benefit card data ───────────────────────────── */
const BENEFITS = [
  {
    title: 'Complimentary Premium Access',
    desc: 'Experience the full power of Studiva, unlocked exclusively for you.',
    icon: 'star',
    layout: 'tall'
  },
  {
    title: 'Signature Campus Representative Badge',
    desc: 'A customized identity icon that sets you apart and represents your college.',
    icon: 'badge',
    layout: 'wide'
  },
  {
    title: 'Personalized Banner Feature',
    desc: 'Your identity, your presence — showcased with style.',
    icon: 'banner',
    layout: 'standard'
  },
  {
    title: 'Community Leadership Access',
    desc: 'Take charge as the admin of your college’s community section and lead engagement on campus.',
    icon: 'users',
    layout: 'standard'
  },
  {
    title: 'Elite WhatsApp Circle',
    desc: 'Not just a group, but a network:',
    points: [
      'Connect with fellow campus representatives across colleges',
      'Direct access to the core team of Studiva'
    ],
    icon: 'message',
    layout: 'wide'
  }
];

// Icon mapping helper
const BenefitIcon = ({ type }) => {
  switch (type) {
    case 'star':
      return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>;
    case 'badge':
      return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
    case 'banner':
      return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>;
    case 'users':
      return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
    case 'message':
      return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>;
    default:
      return null;
  }
};

const CampusRepresentative = () => {
  const pageRef = useRef(null);

  // Form state
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    college_name: '',
    year_of_study: '',
    why_join: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // GSAP entrance animations & context safety
  const { contextSafe } = useGSAP(() => {
    // Hero entrance
    const heroTl = gsap.timeline();
    heroTl.from('.cr-hero__badge', { y: 30, opacity: 0, duration: 0.8, ease: 'back.out(1.5)' })
      .from('.cr-hero__title', { y: 40, opacity: 0, duration: 0.9, ease: 'back.out(1.2)' }, '-=0.5')
      .from('.cr-hero__sub', { y: 30, opacity: 0, duration: 0.8, ease: 'back.out(1.2)' }, '-=0.6');

    // Benefits Scroll Entrance
    gsap.from('.cr-benefit', {
      scrollTrigger: {
        trigger: '.cr-benefits__grid',
        start: 'top 85%',
      },
      y: 50,
      opacity: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: 'back.out(1.2)',
    });

    // Form Scroll Entrance
    gsap.from('.cr-form-wrapper', {
      scrollTrigger: {
        trigger: '.cr-form-section',
        start: 'top 80%',
      },
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
    });
  }, { scope: pageRef });

  // GSAP Interactive Hover Handlers
  const handleBenefitMouseMove = contextSafe((e) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    gsap.to(target, {
      rotationX: rotateX,
      rotationY: rotateY,
      scale: 1.02,
      transformPerspective: 1000,
      duration: 0.4,
      ease: 'power2.out',
      overwrite: 'auto'
    });
    
    const icon = target.querySelector('.cr-benefit__icon');
    if (icon) {
      gsap.to(icon, {
        x: ((x - centerX) / centerX) * 8,
        y: ((y - centerY) / centerY) * 8,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }
  });

  const handleBenefitMouseLeave = contextSafe((e) => {
    const target = e.currentTarget;
    gsap.to(target, {
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      duration: 0.8,
      ease: 'elastic.out(1, 0.4)',
      overwrite: 'auto'
    });
    
    const icon = target.querySelector('.cr-benefit__icon');
    if (icon) {
      gsap.to(icon, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)', overwrite: 'auto' });
    }
  });

  const handleBtnMouseMove = contextSafe((e) => {
    if (submitting) return;
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = (e.clientX - rect.left) - rect.width / 2;
    const y = (e.clientY - rect.top) - rect.height / 2;
    
    gsap.to(target, {
      x: x * 0.2,
      y: y * 0.2,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  });

  const handleBtnMouseLeave = contextSafe((e) => {
    if (submitting) return;
    const target = e.currentTarget;
    gsap.to(target, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.4)',
      overwrite: 'auto'
    });
  });

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!form.full_name.trim() || !form.email.trim() || !form.phone.trim() || !form.college_name.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    setSubmitting(true);

    try {
      const { error: dbError } = await api.campusReps.create({
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        college_name: form.college_name,
        year_of_study: form.year_of_study,
        why_join: form.why_join
      });

      if (dbError) throw new Error(dbError);

      setSubmitted(true);
      console.log('Campus Representative Application Submitted:', form);
    } catch (err) {
      console.error('Submission error:', err);
      setError('Something went wrong. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  const navigateHome = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new Event('navigate'));
  };

  return (
    <div className="cr-page" ref={pageRef}>
      
      <Navbar />

      {/* ── Hero ──────────────────────────────────── */}
      <section className="cr-hero">
        <div className="cr-hero__grid" aria-hidden="true" />
        <div className="cr-hero__ambient" aria-hidden="true" />

        <div className="cr-hero__badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          Campus Representative Programme
        </div>

        <h1 className="cr-hero__title">
          Lead the <span className="accent-text">Campus Movement</span>
        </h1>

        <p className="cr-hero__sub">
          Bridge the gap between your campus and the future of education.
          As a Studiva Representative, you don't just represent a brand—you lead a legacy.
          <br />
          <span style={{ opacity: 0.9, fontWeight: 600, color: 'var(--accent-light)' }}>Be the voice. Be the leader. Be Studiva.</span>
        </p>
      </section>

      {/* ── Benefits Grid ─────────────────────────── */}
      <section className="cr-benefits">
        <div className="container">
          <h2 className="cr-section-title">Studiva Campus Representative Privileges</h2>
        </div>
        <div className="cr-benefits__grid">
          {BENEFITS.map((b, i) => (
            <div 
              className={`cr-benefit cr-benefit--${b.layout}`} 
              key={i}
              onMouseMove={handleBenefitMouseMove}
              onMouseLeave={handleBenefitMouseLeave}
            >
              <div className="cr-benefit__icon">
                <BenefitIcon type={b.icon} />
              </div>
              <div className="cr-benefit__title">{b.title}</div>
              <div className="cr-benefit__desc">
                {b.desc}
                {b.points && (
                  <ul className="cr-benefit__points">
                    {b.points.map((p, j) => (
                      <li key={j}>{p}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Application Form ──────────────────────── */}
      <section className="cr-form-section">
        <div className="cr-form-wrapper">
          {submitted ? (
            /* Success state */
            <div className="cr-success">
              <div className="cr-success__check">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3>The First Step is Taken.</h3>
              <p>
                Our team is reviewing your profile. If you're the leader we're looking for, we'll be in touch soon to start your journey.
              </p>
              <button className="cr-success__home-btn" onClick={navigateHome}>
                ← Back to Home
              </button>
            </div>
          ) : (
            /* Form */
            <>
              <div className="cr-form__header">
                <h2>Join the Visionaries</h2>
                <p>We're looking for the bold, the driven, and the leaders of tomorrow. Is that you?</p>
              </div>

              <form onSubmit={handleSubmit} autoComplete="off">
                {/* Full Name */}
                <div className="cr-field">
                  <label className="cr-field__label" htmlFor="cr-fullname">
                    Full Name
                  </label>
                  <input
                    id="cr-fullname"
                    className="cr-field__input"
                    type="text"
                    name="full_name"
                    placeholder="Rupam Ghosh"
                    value={form.full_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email */}
                <div className="cr-field">
                  <label className="cr-field__label" htmlFor="cr-email">
                    Email Address
                  </label>
                  <input
                    id="cr-email"
                    className="cr-field__input"
                    type="email"
                    name="email"
                    placeholder="rupamghosh2025.cybsec@nsec.ac.in"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* College */}
                <div className="cr-field">
                  <label className="cr-field__label" htmlFor="cr-college">
                    College / University Name
                  </label>
                  <input
                    id="cr-college"
                    className="cr-field__input"
                    type="text"
                    name="college_name"
                    placeholder="Netaji Subhash Engineering College"
                    value={form.college_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Year and Phone Row */}
                <div className="cr-field-row">
                  <div className="cr-field">
                    <label className="cr-field__label" htmlFor="cr-year">
                      Year of Study
                    </label>
                    <select
                      id="cr-year"
                      className="cr-field__select"
                      name="year_of_study"
                      value={form.year_of_study}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Year</option>
                      <option value="1st">1st Year</option>
                      <option value="2nd">2nd Year</option>
                      <option value="3rd">3rd Year</option>
                      <option value="4th">4th Year</option>
                      <option value="other">Other / Postgrad</option>
                    </select>
                  </div>
                  <div className="cr-field">
                    <label className="cr-field__label" htmlFor="cr-phone">
                      Phone Number
                    </label>
                    <input
                      id="cr-phone"
                      className="cr-field__input"
                      type="tel"
                      name="phone"
                      placeholder="+91..."
                      value={form.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Why join */}
                <div className="cr-field">
                  <label className="cr-field__label" htmlFor="cr-why">
                    Why do you want to join?
                  </label>
                  <textarea
                    id="cr-why"
                    className="cr-field__textarea"
                    name="why_join"
                    placeholder="Tell us a bit about your motivation..."
                    value={form.why_join}
                    onChange={handleChange}
                    rows={4}
                    required
                  />
                </div>

                {/* Error message */}
                {error && (
                  <div className="cr-form__message cr-form__message--error">
                    {error}
                  </div>
                )}

                {/* Submit */}
                <button
                  id="cr-submit-btn"
                  type="submit"
                  className="cr-form__submit"
                  disabled={submitting}
                  onMouseMove={handleBtnMouseMove}
                  onMouseLeave={handleBtnMouseLeave}
                >
                  {submitting ? (
                    <>
                      <span className="cr-spinner" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Apply Now
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CampusRepresentative;
