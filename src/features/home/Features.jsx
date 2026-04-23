import { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Search, Layers, TrendingUp, BookOpen, CheckCircle2,
  GraduationCap, School, Microscope, Book, Scale, Briefcase, Award
} from 'lucide-react';
import './Features.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const features = [
  {
    id: 'discover',
    tag: 'Discover',
    title: 'Find what you need-\nInstantly.',
    desc: 'Stop scrolling through cluttered Telegram groups and WhatsApp chats. Studiva organises study resources with tags so you can search and find exactly what you need.',
    bullets: ['Search by subject, topic & exam', 'Tagged & organised content', 'No buried messages or clutter', 'Notes, lab reports, assignments & more'],
    video: '/videos/Flat_Illustration_Animation_Enhancement_Request.webm',
    icon: Search,
    flip: false,
    stat: { label: 'Content', value: 'Organised & Tagged' },
    stat2: { label: 'Access', value: 'Search-based' },
  },
  {
    id: 'upload',
    tag: 'Upload',
    title: 'Share your notes-\nEffortlessly.',
    desc: 'Upload your handwritten scans, PDFs, or typed notes. Tag them with subject codes and topics so students can discover your content easily.',
    bullets: ['PDF & handwritten scan support', 'Tag by subject code & topic', 'Secure cloud storage included', 'Your content, your control'],
    video: '/videos/Video_Ready_After_Agreement.webm',
    icon: Layers,
    flip: true,
    stat: { label: 'Formats', value: 'PDF · Scans · Typed' },
    stat2: { label: 'Storage', value: 'Cloud-hosted' },
  },
  {
    id: 'earn',
    tag: 'Monetize',
    title: 'Your notes can-\nearn for you.',
    desc: 'Set a price for premium content or let students access it via rewarded ads. You keep 60% of every sale — no hidden fees.',
    bullets: ['60% creator revenue share', 'Paid access or rewarded ads', 'Withdraw earnings via UPI', 'Creator analytics dashboard'],
    video: '/videos/Video_Generation_Request_Fulfilled.webm',
    icon: TrendingUp,
    flip: false,
    stat: { label: 'Revenue share', value: '60%' },
    stat2: { label: 'Modes', value: 'Paid · Ads · Free' },
  },
];

const catRow1 = [
  { name: 'JEE Mains', count: 'New', icon: School },
  { name: 'NEET UG', count: 'New', icon: Microscope },
  { name: 'CBSE Class 12', count: 'New', icon: Book },
  { name: 'Engineering', count: 'New', icon: GraduationCap },
  { name: 'UPSC / IAS', count: 'New', icon: Scale },
  { name: 'IBDP / IGCSE', count: 'New', icon: Award },
];

const catRow2 = [
  { name: 'JEE Advanced', count: 'New', icon: Award },
  { name: 'CA Foundation', count: 'New', icon: Briefcase },
  { name: 'Law / CLAT', count: 'New', icon: Scale },
  { name: 'SSC CGL', count: 'New', icon: Award },
  { name: 'Medical PG', count: 'New', icon: Microscope },
  { name: 'MBA Entrance', count: 'New', icon: GraduationCap },
  { name: 'GATE / PSU', count: 'New', icon: Award },
  { name: 'Class 10', count: 'New', icon: Book },
];

const FeatureBlock = memo(({ feature }) => {
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
              autoPlay muted loop playsInline preload="none"
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
            <Icon size={32} strokeWidth={2.5} />
            <span className='iconText'>{feature.tag}</span>
          </div>

          <h2 className="feat-title" data-anim>
            {feature.title.split('\n').map((line, i) => (
              <span key={i}>{line}<br /></span>
            ))}
          </h2>

          {/* <p className="feat-desc" data-anim>{feature.desc}</p> */}

          <ul className="feat-bullets" data-anim>
            {feature.bullets.map((b, i) => (
              <li key={i} className="feat-bullet">
                <CheckCircle2 size={24} strokeWidth={2.5} />
                <span className='bulletText'>{b}</span>
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
});


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

    // Small scroll-triggered pop-up animation for belt chips
    gsap.set('.belt-chip', { opacity: 0, scale: 0.8, y: 10 });
    ScrollTrigger.batch('.belt-chip', {
      interval: 0.1, // time window to batch triggers
      batchMax: 3,   // max elements per batch
      onEnter: batch => gsap.to(batch, {
        opacity: 1,
        scale: 1,
        y: 0,
        stagger: 0.05,
        duration: 0.5,
        ease: 'back.out(1.5)',
        overwrite: true
      }),
      start: "top 90%",
      once: true
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