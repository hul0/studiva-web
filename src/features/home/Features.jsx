import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Layers, TrendingUp, BookOpen, CheckCircle2,
  GraduationCap, School, Microscope, Book, Scale, Briefcase, Award
} from 'lucide-react';
import './Features.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const features = [
  {
    id: 'upload',
    tag: 'Upload',
    title: 'Share your notes.\nEffortlessly.',
    desc: 'Drop handwritten scans, PDFs, or typed notes. Our engine auto-tags and categorises everything for instant discoverability.',
    bullets: ['PDF & handwritten scan support', 'Batch upload up to 100 pages', 'Auto-tagging for JEE, NEET & more', 'Secure cloud storage included'],
    video: '/videos/Video_Ready_After_Agreement.webm',
    icon: Layers,
    flip: false,
    stat: { label: 'Auto-tagged', value: 'Physics · Wave Optics' },
    stat2: { label: 'Status', value: 'Optimised ✓' },
  },
  {
    id: 'earn',
    tag: 'Revenue',
    title: 'Turn effort\ninto income.',
    desc: 'Set your own price or use rewarded ads. Every unlock earns you real money, deposited instantly to UPI.',
    bullets: ['70% creator revenue share', 'Rewarded ads payouts', 'Instant UPI withdrawals', 'Earnings analytics dashboard'],
    video: '/videos/Video_Generation_Request_Fulfilled.webm',
    icon: TrendingUp,
    flip: true,
    stat: { label: 'This month', value: '₹24,500' },
    stat2: { label: 'Unlocks', value: '1,240' },
  },
  {
    id: 'learn',
    tag: 'Knowledge',
    title: 'Study smarter\nwith toppers.',
    desc: "Access verified notes from rank-holders. Filter by exam, study offline, and track what you've covered.",
    bullets: ['Topper-verified notes only', 'Filter by exam & subject', 'Offline reading mode', 'Study progress tracking'],
    video: '/videos/Flat_Illustration_Animation_Enhancement_Request.webm',
    icon: BookOpen,
    flip: false,
    stat: { label: 'Verified by', value: 'IIT Delhi, AIR 7' },
    stat2: { label: 'Rating', value: '4.8 / 5.0' },
  },
];

const catRow1 = [
  { name: 'JEE Mains', count: '12K+ notes', icon: School },
  { name: 'NEET UG', count: '15K+ notes', icon: Microscope },
  { name: 'CBSE Class 12', count: '20K+ notes', icon: Book },
  { name: 'Engineering', count: '11K+ notes', icon: GraduationCap },
  { name: 'UPSC / IAS', count: '9K+ notes', icon: Scale },
  { name: 'IBDP / IGCSE', count: '5K+ notes', icon: Award },
];

const catRow2 = [
  { name: 'JEE Advanced', count: '8K+ notes', icon: Award },
  { name: 'CA Foundation', count: '6K+ notes', icon: Briefcase },
  { name: 'Law / CLAT', count: '4K+ notes', icon: Scale },
  { name: 'SSC CGL', count: '10K+ notes', icon: Award },
  { name: 'Medical PG', count: '7K+ notes', icon: Microscope },
  { name: 'MBA Entrance', count: '12K+ notes', icon: GraduationCap },
  { name: 'GATE / PSU', count: '9K+ notes', icon: Award },
  { name: 'Class 10', count: '18K+ notes', icon: Book },
];

const FeatureBlock = ({ feature }) => {
  const blockRef = useRef(null);
  const lineRef = useRef(null);
  const mediaRef = useRef(null);

  useGSAP(() => {
    const el = blockRef.current;
    if (!el) return;

    const items = el.querySelectorAll('[data-anim]');

    gsap.set(items, { opacity: 0, y: 24 });
    if (lineRef.current) gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'left center' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 78%',
        toggleActions: 'play none none none',
        once: true,
      },
    });

    if (lineRef.current) {
      tl.to(lineRef.current, { scaleX: 1, duration: 0.6, ease: 'power3.inOut' });
    }

    tl.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.09,
      ease: 'power3.out',
    }, lineRef.current ? '-=0.3' : '0');

    // Tilt Effect
    const media = mediaRef.current;
    if (media) {
      const frame = media.querySelector('.feat-block__frame');
      if (frame) {
        media.addEventListener('mousemove', (e) => {
          const rect = media.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(frame, {
            rotationY: x * 0.04,
            rotationX: -y * 0.04,
            transformPerspective: 1000,
            duration: 0.5,
            ease: 'power2.out'
          });
        });

        media.addEventListener('mouseleave', () => {
          gsap.to(frame, { rotationY: 0, rotationX: 0, duration: 0.8, ease: 'elastic.out(1, 0.3)' });
        });
      }
    }

  }, { scope: blockRef });

  const Icon = feature.icon;

  return (
    <div
      ref={blockRef}
      className={`feat-block ${feature.flip ? 'feat-block--flip' : ''}`}
      id={`feature-${feature.id}`}
    >
      <div className="feat-block__rule" ref={lineRef} />

      <div className="container feat-block__inner">

        {/* ── Media side ── */}
        <div className="feat-block__media" data-anim ref={mediaRef}>
          <div className="feat-block__frame">
            <video
              src={feature.video}
              autoPlay muted loop playsInline
              className="feat-block__video"
            />
            <div className="feat-block__scrim" />

            {/* Stat pills */}
            <div className="feat-pill feat-pill--tl">
              <span className="feat-pill__label">{feature.stat.label}</span>
              <span className="feat-pill__val">{feature.stat.value}</span>
            </div>
            <div className="feat-pill feat-pill--br">
              <span className="feat-pill__label">{feature.stat2.label}</span>
              <span className="feat-pill__val">{feature.stat2.value}</span>
            </div>
          </div>
        </div>

        {/* ── Text side ── */}
        <div className="feat-block__text">
          <div className="feat-tag" data-anim>
            <Icon size={13} strokeWidth={2.5} />
            <span>{feature.tag}</span>
          </div>

          <h2 className="feat-title" data-anim>
            {feature.title.split('\n').map((line, i) => (
              <span key={i}>{line}<br /></span>
            ))}
          </h2>

          <p className="feat-desc" data-anim>{feature.desc}</p>

          <ul className="feat-bullets" data-anim>
            {feature.bullets.map((b, i) => (
              <li key={i} className="feat-bullet">
                <CheckCircle2 size={14} strokeWidth={2.5} />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <a href="#download" className="feat-cta" data-anim>
            Get started free →
          </a>
        </div>

      </div>
    </div>
  );
};


const Features = () => {
  const headRef = useRef(null);

  useGSAP(() => {
    const el = headRef.current;
    if (!el) return;
    const items = el.querySelectorAll('[data-anim]');
    gsap.set(items, { opacity: 0, y: 20 });
    gsap.to(items, {
      opacity: 1, 
      y: 0, 
      duration: 0.7, 
      stagger: 0.1, 
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 80%', once: true },
    });
  }, { scope: headRef });

  return (
    <section id="features" className="features">
      {features.map((f, i) => <FeatureBlock key={f.id} feature={f} index={i} />)}

      {/* ── Ecosystem belt ── */}
      <div className="feat-cats" ref={headRef}>
        <div className="container feat-cats__head">
          <p className="feat-cats__eyebrow" data-anim>Ecosystem</p>
          <h2 className="feat-cats__title" data-anim>Built for every aspirant.</h2>
          <p className="feat-cats__sub" data-anim>
            From Class 10 to postgraduate — a growing library across every major exam.
          </p>
        </div>

        <div className="feat-belt">
          <div className="feat-belt__track feat-belt__track--left">
            {[...catRow1, ...catRow1, ...catRow1].map((c, i) => {
              const Icon = c.icon;
              return (
                <div key={`c1-${i}`} className="belt-chip">
                  <Icon size={15} strokeWidth={2} className="belt-chip__icon" />
                  <span className="belt-chip__name">{c.name}</span>
                  <span className="belt-chip__count">{c.count}</span>
                </div>
              );
            })}
          </div>

          <div className="feat-belt__track feat-belt__track--right">
            {[...catRow2, ...catRow2, ...catRow2].map((c, i) => {
              const Icon = c.icon;
              return (
                <div key={`c2-${i}`} className="belt-chip">
                  <Icon size={15} strokeWidth={2} className="belt-chip__icon" />
                  <span className="belt-chip__name">{c.name}</span>
                  <span className="belt-chip__count">{c.count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;