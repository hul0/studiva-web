import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  TrendingUp, Zap, Shield, Clock, Search, Banknote,
  CheckCircle2, XCircle, Sparkles,
} from 'lucide-react';
import './Comparison.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const rows = [
  {
    icon: TrendingUp,
    feature: 'Creator Revenue Share',
    studiva: '70%',
    others: '30–50%',
  },
  {
    icon: Zap,
    feature: 'Rewarded Ad Support',
    studiva: true,
    others: false,
  },
  {
    icon: Banknote,
    feature: 'Withdrawal Threshold',
    studiva: '₹100',
    others: '₹1,000+',
  },
  {
    icon: Shield,
    feature: 'Content Security',
    studiva: 'Watermarked & DRM',
    others: 'Basic PDF',
  },
  {
    icon: Search,
    feature: 'Note Discoverability',
    studiva: 'AI-Powered SEO',
    others: 'Manual search',
  },
  {
    icon: Clock,
    feature: 'Withdrawal Speed',
    studiva: 'Instant / Same-day',
    others: '7–14 days',
  },
];

const Cell = ({ val }) => {
  if (val === true)
    return (
      <span className="cmp-bool cmp-bool--yes">
        <CheckCircle2 size={13} strokeWidth={2.5} />
      </span>
    );
  if (val === false)
    return (
      <span className="cmp-bool cmp-bool--no">
        <XCircle size={13} strokeWidth={2} />
      </span>
    );
  return <>{val}</>;
};

const Comparison = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    /* Head items */
    gsap.to('.compare__eyebrow, .compare__title, .compare__sub', {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.compare__head',
        start: 'top 82%',
        once: true,
      },
    });

    /* Table wrapper fades up */
    gsap.to('.compare__wrap', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.compare__wrap',
        start: 'top 82%',
        once: true,
      },
    });

    /* Rows slide in staggered */
    gsap.to('.compare__row', {
      opacity: 1,
      x: 0,
      duration: 0.5,
      stagger: 0.07,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.compare__wrap',
        start: 'top 80%',
        once: true,
      },
      delay: 0.2,
    });

    /* Footer */
    const footer = document.querySelector('.compare__foot');
    if (footer) {
      gsap.to(footer, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 94%',
          once: true,
        },
        delay: 0.1,
      });
    }

  }, { scope: sectionRef });

  return (
    <section className="compare" id="compare" ref={sectionRef}>
      <div className="container">

        {/* Head */}
        <div className="compare__head">
          <p className="compare__eyebrow">
            Comparison
          </p>
          <h2 className="compare__title">
            Why creators choose Studiva.
          </h2>
          <p className="compare__sub">
            More earnings, faster payouts, smarter reach — built for serious note-sellers.
          </p>
        </div>

        {/* Table */}
        <div className="compare__wrap">

          {/* Column headers */}
          <div className="compare__thead">
            <div className="compare__th">Feature</div>
            <div className="compare__th compare__th--studiva">
              Studiva
            </div>
            <div className="compare__th">Others</div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => {
            const Icon = row.icon;
            return (
              <div key={i} className="compare__row">
                <div className="compare__td compare__td--feature">
                  <Icon size={14} strokeWidth={2} />
                  {row.feature}
                </div>
                <div className="compare__td compare__td--studiva">
                  <Cell val={row.studiva} />
                </div>
                <div className="compare__td compare__td--others">
                  <Cell val={row.others} />
                </div>
              </div>
            );
          })}
          {/* Footer CTA */}
          <div className="compare__foot">
            <div className="compare__foot-td">
              <a href="#features" className="compare__cta">View detailed features</a>
            </div>
            <div className="compare__foot-td compare__foot-td--studiva">
              <a href="#download" className="compare__cta" style={{ color: 'var(--accent-light)' }}>Start earning today</a>
            </div>
            <div className="compare__foot-td"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;