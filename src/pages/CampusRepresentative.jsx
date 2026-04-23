import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import './CampusRepresentative.css';

/* ─── Benefit card data ───────────────────────────── */
const BENEFITS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
    title: 'Premium Access',
    desc: 'Complimentary Premium Access — Experience the full power of Studiva, unlocked exclusively for you.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    title: 'Signature Badge',
    desc: 'Signature Campus Badge — A mark of prestige that sets you apart on campus.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
    title: 'Personalized Banner',
    desc: 'Personalized Banner Feature — Your identity, your presence — showcased with style.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
    title: 'Elite Circle',
    desc: 'Elite WhatsApp Circle — Connect with fellow representatives across colleges and get direct access to the Studiva core team.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
      </svg>
    ),
    title: 'Official Credential',
    desc: 'Receive an official Certificate of Excellence and a Letter of Recommendation to boost your career prospects.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.62 1.96V10a2 2 0 002 2h2v8a2 2 0 002 2h8a2 2 0 002-2v-8h2a2 2 0 002-2V5.42a2 2 0 00-1.62-1.96z" />
      </svg>
    ),
    title: 'Exclusive Merch',
    desc: 'Get your hands on limited-edition Studiva gear, from hoodies to stickers, to represent the brand in style.',
  },
];

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

  // GSAP entrance animations
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from('.cr-hero__badge', {
      y: 20, opacity: 0, duration: 0.6, ease: 'power2.out',
    })
    .from('.cr-hero__title', {
      y: 30, opacity: 0, duration: 0.7, ease: 'power2.out',
    }, '-=0.4')
    .from('.cr-hero__sub', {
      y: 20, opacity: 0, duration: 0.6, ease: 'power2.out',
    }, '-=0.4')
    .from('.cr-benefit', {
      y: 30, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out',
    }, '-=0.3')
    .from('.cr-form-wrapper', {
      y: 40, opacity: 0, duration: 0.7, ease: 'power2.out',
    }, '-=0.3');
  }, { scope: pageRef });

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
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setSubmitting(true);

    // Mock submission since "without backend"
    setTimeout(() => {
      setSubmitted(true);
      setSubmitting(false);
      console.log('Campus Representative Application (Mock):', form);
    }, 1500);
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
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          CAMPUS PROGRAM
        </div>

        <h1 className="cr-hero__title">
          Studiva <span className="accent-gradient">Campus Representative</span>
        </h1>

        <p className="cr-hero__sub">
          Step into the spotlight with Studiva — where representation meets recognition. Be seen. Be heard. Be Studiva.
        </p>
      </section>

      {/* ── Benefits Grid ─────────────────────────── */}
      <section className="cr-benefits">
        <div className="cr-benefits__grid">
          {BENEFITS.map((b, i) => (
            <div className="cr-benefit" key={i}>
              <div className="cr-benefit__icon">{b.icon}</div>
              <div className="cr-benefit__title">{b.title}</div>
              <div className="cr-benefit__desc">{b.desc}</div>
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
              <h3>Application Received!</h3>
              <p>
                Thanks for your interest in the Campus Representative program. We'll review your details and reach out soon!
              </p>
              <button className="cr-success__home-btn" onClick={navigateHome}>
                ← Back to Home
              </button>
            </div>
          ) : (
            /* Form */
            <>
              <div className="cr-form__header">
                <h2>Join the Program</h2>
                <p>Apply to become the voice of Studiva on your campus.</p>
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
                    placeholder="Jane Smith"
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
                    placeholder="jane@university.edu"
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
                    placeholder="University of Technology"
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
