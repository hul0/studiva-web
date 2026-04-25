import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Layers, TrendingUp, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import './Features.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Features = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Entrance animation for grid items
    const items = el.querySelectorAll('.bento-item');
    gsap.fromTo(items, 
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
          once: true,
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section id="features" className="features-bento" ref={sectionRef}>
      <div className="container" style={{ height: '100%' }}>
        <div className="bento-grid">
          
          {/* ── Left Column ── */}
          <div className="bento-left-col">
            <div className="bento-circle-wrapper bento-item">
              <svg className="bento-circle-svg" viewBox="0 0 200 200">
                <path id="circlePath" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" fill="none" />
                <text className="bento-circle-text">
                  <textPath href="#circlePath" startOffset="0%">
                    STUDIVA MARKETPLACE · INNOVATIVE ALTERNATIVE · STUDIVA MARKETPLACE · INNOVATIVE ALTERNATIVE · 
                  </textPath>
                </text>
              </svg>
              <div className="bento-circle-center">
                <span>START<br />NOW</span>
                <div className="orbit orbit-1"></div>
                <div className="orbit orbit-2"></div>
              </div>
            </div>
            
            <div className="bento-left-actions bento-item">
              <div className="bento-icon-btn"><Search size={20} /></div>
              <div className="bento-icon-btn"><Layers size={20} /></div>
              <div className="bento-icon-btn"><TrendingUp size={20} /></div>
            </div>

            {/* Box 3: Virtual Training (Moved to Left Column) */}
            <div className="bento-item bento-card bento-card-outline virtual-training-card">
              <div className="bento-badge bento-badge-gray">VIRTUAL TRAINING</div>
              <p>Set a price or use rewarded ads. You keep 60% of every sale from learners globally.</p>
              <div className="bento-footer">
                <div className="bento-mentors">
                  <div className="bento-mentors-avatars">
                    <img src="https://ui-avatars.com/api/?name=A" alt="Avatar 1" />
                    <img src="https://ui-avatars.com/api/?name=B" alt="Avatar 2" />
                    <img src="https://ui-avatars.com/api/?name=C" alt="Avatar 3" />
                  </div>
                  <span className="bento-mentors-text">OUR<br/>MENTORS</span>
                </div>
                <button className="bento-btn">START NOW <ArrowRight size={16} /></button>
              </div>
            </div>
          </div>

          {/* ── Right Column ── */}
          <div className="bento-right-col">
            
            {/* Box 1: Discover */}
            <div className="bento-item bento-card bento-card-white train-card">
              <div className="bento-card-header">
                <div className="bento-badge">HOW IT WORKS</div>
                <div className="bento-stats">
                  <span className="pill">360°</span>
                  <div className="stat-text">
                    <strong>200 thousand +</strong>
                    <span>The world's largest notes library</span>
                  </div>
                </div>
              </div>
              <div className="bento-card-body train-body">
                <div className="train-text-col">
                  <h2>FIND WHAT YOU NEED INSTANTLY</h2>
                </div>
                <div className="train-avatar-col">
                   <img src="https://ui-avatars.com/api/?name=Student&background=B0E454&color=0D0D0D&rounded=true" alt="Man avatar placeholder" className="bento-avatar" />
                </div>
              </div>
            </div>

            {/* Box 2: Upload */}
            <div className="bento-item bento-card bento-card-lime">
              <div className="bento-card-header">
                <div className="bento-badge-outline"><CheckCircle2 size={14} /> PROVEN RESULTS</div>
                <Sparkles size={20} />
              </div>
              <div className="bento-card-body bento-split">
                <h2>SHARE NOTES<br />EFFORTLESSLY</h2>
                <div className="bento-avatar-large-wrapper">
                   {/* Lady avatar placeholder */}
                   <img src="https://ui-avatars.com/api/?name=Creator&background=ffffff&color=0D0D0D" alt="Lady avatar placeholder" className="bento-avatar-large" />
                   <div className="bento-check-badge"><CheckCircle2 size={16} color="var(--jet-black)" /></div>
                </div>
              </div>
            </div>

            {/* Box 4 Container */}
            <div className="bento-bottom-row">
              {/* Box 4: Seamless Learning (Generated) */}
              <div className="bento-item bento-card bento-card-black logotype-card">
                <div className="bento-logo-center">
                  <div className="logo-half-moon"></div>
                  <h2>STUDIVA™</h2>
                </div>
                <div className="bento-badge bento-badge-lime bento-abs-bl">●● LOGOTYPE</div>
              </div>

              {/* Small Customer Box */}
              <div className="bento-item bento-card bento-card-white customers-card">
                 <div className="bento-badge bento-badge-lime">14 k Customers</div>
              </div>
            </div>
            
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;
