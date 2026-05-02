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
    title: 'Earn up to ₹1000 every month',
    desc: 'Refer users and earn up to 2x per user',
    icon: 'money',
    layout: 'wide'
  },
  {
    title: 'Complimentary Premium Access',
    desc: 'Experience the full power of Studiva, unlocked exclusively for you.',
    icon: 'star',
    layout: 'tall'
  },
  {
    title: 'Exclusive Badges',
    desc: 'A customized identity icon that sets you apart and represents your college.',
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
    title: 'Elite Circle',
    desc: 'Get into the biggest study network:',
    points: [
      'Connect with fellow campus representatives across 30+ colleges',
      'Direct access to the core team of Studiva'
    ],
    icon: 'message',
    layout: 'wide'
  }
];

// Icon mapping helper
const BenefitIcon = ({ type }) => {
  switch (type) {
    case 'money':
      return <svg fill="#FFFFFF" height="400px" width="400px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 488.4 488.4" >
        <g>
          <path d="M201,406.3L201,406.3L201,406.3c0,4.1-0.1,9.2-0.8,14.3l-2.7,48.9c0,3.6-2.9,6.5-6.5,6.5l-76.6-0.4c-3.6,0-6.5-2.9-6.5-6.5
		l-1.4-40.4l-72.7-87.6c-10.7-11.4-18-24.2-20.3-39.6l-0.7-4.5L0.1,174.1c-0.6-6.1,1.5-12.3,6.2-16.1c5.7-4.6,14.7-6.3,21.4,1.3
		c4.7,5.4,7,22.2,7.8,26.7c2.7,16.1,5.4,39.1,5.8,55.3c0,1.1,0.1,2.6,0.2,3.7c0.4,7.1,2.1,13.7,5.1,20.2
		c16.4,35.6,49.3,80.6,49.3,80.6l1.8,2.7c1.4,2,4.1,2.7,6.3,1.5c2.4-1.3,3.2-4.4,1.8-6.7l-43.6-71.1c-4.7-7.9-2-19.1,6.5-24.3
		c8.5-5.2,19.7-2.6,24.4,5.3l45.3,58.2c3,3.8,8.5,9.3,12.4,12.1c40.7,29.3,46.2,59.1,49.8,74.3C200.6,398,200.9,401.4,201,406.3z
		 M46,167.9c1.3,4.3,2.2,8.7,2.9,12.9c2.3,13.9,5.8,39,6,52.3c0,1.4,0.1,2.7,0.1,4.1c1.5-1.3,3.1-2.6,4.9-3.7
		c2.2-1.4,4.5-2.4,6.9-3.2c0.1-0.2,0.2-0.3,0.3-0.4c-1.7-12.7-6.2-36.7-9.5-49.1C55.9,174.5,52.3,169.9,46,167.9z M70.4,185.5
		c2,9.2,7.2,26.1,8.4,35.1l0.8,6.1c0.1,0.6,0.1,1.2,0.1,1.8c3.7,0.1,7.4,0.9,10.9,2.2c-1.2-8.2-6.7-24.6-8.7-32.3
		C80.1,192.1,76.5,187.6,70.4,185.5z M460.7,159.3c-4.7,5.4-7,22.2-7.8,26.7c-2.7,16.1-5.4,39.1-5.8,55.3c0,1.1-0.1,2.6-0.2,3.7
		c-0.4,7.1-2.1,13.7-5.1,20.2c-16.4,35.6-49.3,80.6-49.3,80.6l-1.8,2.7c-1.4,2-4.1,2.7-6.3,1.5c-2.4-1.3-3.2-4.4-1.8-6.7l43.6-71.1
		c4.7-7.9,2-19.1-6.5-24.3c-8.5-5.2-19.7-2.6-24.4,5.3L350,311.4c-3,3.8-8.5,9.3-12.4,12.1c-40.7,29.3-46.2,59.1-49.8,74.3
		c0,0-0.3,3.4-0.4,8.3l0,0c0,4.1,0.1,9.2,0.8,14.3l2.7,48.9c0,3.6,2.9,6.5,6.5,6.5l76.6-0.4c3.6,0,6.5-2.9,6.5-6.5l1.4-40.4
		l72.7-87.6c10.7-11.4,18-24.2,20.3-39.6l0.7-4.5l12.7-122.9c0.6-6.1-1.5-12.3-6.2-16.1C476.4,153.4,467.4,151.7,460.7,159.3z
		 M433.5,237.1c0-1.4,0.1-2.7,0.1-4.1c0.3-13.3,3.7-38.4,6-52.3c0.7-4.2,1.5-8.5,2.9-12.9c-6.3,2.1-10,6.6-11.6,12.8
		c-3.3,12.4-7.8,36.4-9.5,49.1c0.1,0.2,0.2,0.3,0.3,0.4c2.4,0.8,4.7,1.9,6.9,3.2C430.3,234.6,431.9,235.8,433.5,237.1z M409.6,220.5
		c1.2-8.9,6.3-25.8,8.4-35.1c-6.2,2.1-9.8,6.6-11.4,12.8c-2,7.7-7.5,24.1-8.7,32.3c3.5-1.3,7.2-2,10.9-2.2c0-0.6,0-1.2,0.1-1.8
		L409.6,220.5z M386.5,221c0-6-4.8-10.8-10.8-10.8H116.2c-6,0-10.8,4.8-10.8,10.8s4.8,10.8,10.8,10.8h259.5
		C381.7,231.8,386.5,227,386.5,221z M347.8,260.1c0-6-4.8-10.8-10.8-10.8H135.4c-6,0-10.8,4.8-10.8,10.8s4.8,10.8,10.8,10.8H337
		C343,270.9,347.8,266.1,347.8,260.1z M171.5,288.5c-6,0-10.8,4.8-10.8,10.8s4.8,10.8,10.8,10.8h129.3c6,0,10.8-4.8,10.8-10.8
		s-4.8-10.8-10.8-10.8H171.5z M324.8,87.4c-8.5,0-15.3,6.9-15.3,15.3c0,8.5,6.9,15.3,15.3,15.3c8.5,0,15.3-6.9,15.3-15.3
		C340.1,94.2,333.2,87.4,324.8,87.4z M163.6,87.4c-8.5,0-15.3,6.9-15.3,15.3c0,8.5,6.9,15.3,15.3,15.3c8.5,0,15.3-6.9,15.3-15.3
		C179,94.2,172.1,87.4,163.6,87.4z M390.1,167.8c0,13.9-11.3,25.3-25.3,25.3H123.6c-13.9,0-25.3-11.3-25.3-25.3V37.7
		c0-13.9,11.3-25.3,25.3-25.3h241.2c13.9,0,25.3,11.3,25.3,25.3L390.1,167.8L390.1,167.8z M368.5,65c-2,0.5-4.1,0.8-6.3,0.8
		c-14.1,0-25.6-11.5-25.6-25.6c0-2.2,0.3-4.2,0.8-6.2H149.5c0.3,1.5,0.4,3.1,0.4,4.7c0,14.1-11.5,25.6-25.6,25.6
		c-1.5,0-3-0.1-4.5-0.4v77.7c1.5-0.3,3-0.4,4.5-0.4c14.1,0,25.6,11.5,25.6,25.6c0,1.6-0.2,3.2-0.4,4.7h187.2c-0.1-1-0.2-2.1-0.2-3.2
		c0-14.1,11.5-25.6,25.6-25.6c2.2,0,4.3,0.3,6.3,0.8V65H368.5z M299.6,102.7c0,30.5-24.8,55.4-55.4,55.4
		c-30.5,0-55.4-24.8-55.4-55.4c0-30.5,24.8-55.4,55.4-55.4C274.7,47.3,299.6,72.2,299.6,102.7z M272.5,90.4l-10.7-10.8L237,104.2
		l-10.4-10.4l-10.8,10.7l10.4,10.4l10.7,10.8l10.8-10.7L272.5,90.4z"/>
        </g>
      </svg>
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
