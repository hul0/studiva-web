import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import './Testimonials.css';

gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin, useGSAP);

const testimonialsData = [
  {
    id: 't1', name: 'Ravi K.', role: 'Engineering',
    num: '01',
    text: 'Finally a platform where I can share my handwritten notes and actually get discovered. The upload process is super smooth.',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face',
    color: '#dcfce7', pinColor: '#22c55e'
  },
  {
    id: 't2', name: 'Anjali M.', role: 'Medical',
    num: '02',
    text: 'No more scrolling through cluttered Telegram groups. Studiva lets me search and find exactly what I need for my exams.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
    color: '#fee2e2', pinColor: '#ef4444'
  },
  {
    id: 't3', name: 'Vikram S.', role: 'B.Tech IT',
    num: '03',
    text: 'I uploaded my 4 years of lab reports and assignment solutions. The tagging system makes everything instantly discoverable.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    color: '#e0f2fe', pinColor: '#3b82f6'
  }
];

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

const initialPositions = isMobile ? [
  { top: '5%', left: '5%', rotation: -4 },
  { top: '15%', left: '45%', rotation: 3 },
  { top: '35%', left: '10%', rotation: -6 },
  { top: '45%', left: '50%', rotation: 5 },
  { top: '65%', left: '5%', rotation: -3 },
  { top: '75%', left: '45%', rotation: 4 },
] : [
  { top: '10%', left: '5%', rotation: -4 },
  { top: '8%', left: '42%', rotation: 3 },
  { top: '12%', left: '75%', rotation: -6 },
  { top: '60%', left: '8%', rotation: 5 },
  { top: '65%', left: '45%', rotation: -3 },
  { top: '55%', left: '72%', rotation: 4 },
];

const Testimonials = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    // 1. REVIEWS word entrance
    const chars = el.querySelectorAll('.rev-char');
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: '+=2500',
        pin: true,
        scrub: 1,
      }
    });

    tl.fromTo(chars,
      { opacity: 0, scale: 4, rotation: () => gsap.utils.random(-60, 60) },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        stagger: 0.1,
      }
    );

    // 2. Initial entrance "hanging" swing for cards
    const cards = el.querySelectorAll('.tcard-physics');

    // Function to update the rope's bezier curve dynamically
    const updateRope = function (target, xPos, yPos) {
      const path = target.querySelector('.rope-path');
      if (!path) return;

      // Calculate the top anchor point to stay globally fixed
      const tx = 400 - xPos;
      const ty = -yPos;

      // Control points for a realistic elastic curve (lagging behind the drag)
      const cx1 = 400 - (xPos * 0.6);
      const cy1 = ty + 400;

      const cx2 = 400 - (xPos * 0.15);
      const cy2 = 800;

      path.setAttribute('d', `M${tx},${ty} C${cx1},${cy1} ${cx2},${cy2} 400,1200`);
    };

    tl.fromTo(cards,
      { opacity: 0, y: -600, rotation: (i) => initialPositions[i].rotation + 30 },
      {
        opacity: 1,
        y: 0,
        rotation: (i) => initialPositions[i].rotation,
        stagger: 0.1,
        ease: "back.out(1.2)",
        onUpdate: function () {
          // Update ropes during entrance animation
          cards.forEach(card => {
            const yPos = gsap.getProperty(card, "y");
            const xPos = gsap.getProperty(card, "x");
            updateRope(card, xPos, yPos);
          });
        }
      },
      "-=0.2" // slight overlap
    );

    // 3. Make them draggable with Inertia (bouncing)
    Draggable.create(cards, {
      type: "x,y",
      bounds: ".testimonials-board",
      inertia: true,
      edgeResistance: 0.6, /* higher elasticity */
      bounce: 0.8,
      onPress: function () {
        gsap.to(this.target, { scale: 1.05, boxShadow: "0 25px 50px rgba(0,0,0,0.15)", duration: 0.2 });
        this.target.style.zIndex = 100;
      },
      onDrag: function () {
        updateRope(this.target, this.x, this.y);
      },
      onThrowUpdate: function () {
        updateRope(this.target, this.x, this.y);
      },
      onRelease: function () {
        gsap.to(this.target, { scale: 1, boxShadow: "0 10px 30px rgba(0,0,0,0.08)", duration: 0.4, ease: "elastic.out(1, 0.4)" });
        this.target.style.zIndex = 10;
      }
    });

  }, { scope: sectionRef });

  return (
    <section className="testimonials-section" id="testimonials" ref={sectionRef}>

      <div className="testimonials-bg-text">
        {"REVIEWS".split('').map((char, i) => (
          <span key={i} className="rev-char">{char}</span>
        ))}
      </div>

      <div className="testimonials-board">
        {testimonialsData.map((t, idx) => {
          const pos = initialPositions[idx];
          return (
            <div
              key={t.id}
              className="tcard-physics"
              style={{
                top: pos.top,
                left: pos.left,
                transform: `rotate(${pos.rotation}deg)`
              }}
            >
              {/* Curvy Elastic Rope SVG (Counter-rotated to hang straight down) */}
              <svg
                className="tcard-rope-svg"
                viewBox="0 0 800 1200"
                preserveAspectRatio="xMidYMax slice"
                style={{ transform: `translateX(-50%) rotate(${-pos.rotation}deg)` }}
              >
                <path
                  className="rope-path"
                  d="M400,0 C400,400 400,800 400,1200"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
              </svg>

              {/* Pushpin */}
              <div className="tcard-pin" style={{ backgroundColor: t.pinColor }}></div>

              <div className="tcard-top">
                <div className="tcard-num-box" style={{ color: t.pinColor }}>{t.num}</div>
                <div className="tcard-avatar-box">
                  <img src={t.avatar} alt={t.name} className="tcard-avatar" />
                </div>
              </div>
              <h3 className="tcard-name" style={{ color: t.pinColor }}>{t.name}</h3>
              <p className="tcard-text">{t.text}</p>
            </div>
          );
        })}
      </div>

    </section>
  );
};

export default Testimonials;
