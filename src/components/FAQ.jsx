import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, MessageCircle, HelpCircle, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './FAQ.css';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: 'How do I start earning from my notes?',
    a: "It's simple: Upload your PDF or scan handwritten notes, set your price (Free, Paid, or Rewarded Ad), and publish. Once a student unlocks your note, the earnings are credited to your dashboard instantly.",
  },
  {
    q: 'Is there a limit on how many notes I can upload?',
    a: 'Not at all. You can upload an unlimited number of notes. In fact, creators with 50+ notes tend to earn 3x more due to higher visibility in search results.',
  },
  {
    q: 'What is the revenue share on Studiva?',
    a: 'We offer the most creator-friendly model in the market. You keep 70% of all sales. For rewarded ads, we split the ad revenue 50/50, ensuring students can access content for free while you still get paid.',
  },
  {
    q: 'How can I withdraw my earnings?',
    a: 'Withdrawals are processed via UPI or direct Bank Transfer. You can request a withdrawal anytime once you cross the ₹100 threshold, and funds usually hit your account within 24 hours.',
  },
  {
    q: 'Can I upload notes for any exam or subject?',
    a: 'Yes! While we are most popular for JEE, NEET, and CBSE, we support 50+ categories including UPSC, CA Foundation, CLAT, Engineering subjects, and more.',
  },
  {
    q: 'Is it safe to share my notes? What about piracy?',
    a: "We take piracy seriously. Notes on Studiva are served in a secure viewer that prevents direct downloading (unless you enable it). Each page is watermarked with the creator's username for added security.",
  },
];

const FAQItem = ({ faq, index }) => {
  const [isOpen, setIsOpen] = useState(index === 0);

  return (
    <div
      className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="faq-item__header">
        <h3 className="faq-item__q">{faq.q}</h3>
        <span className="faq-item__toggle">
          {isOpen ? <Minus size={14} strokeWidth={2.5} /> : <Plus size={14} strokeWidth={2.5} />}
        </span>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="faq-item__body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
          >
            <p className="faq-item__a">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* Head */
      const headItems = document.querySelectorAll('.faq__head [data-anim]');
      gsap.set(headItems, { opacity: 0, y: 20 });
      gsap.to(headItems, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.faq__head',
          start: 'top 82%',
          once: true,
        },
      });

      /* Grid items stagger */
      const items = document.querySelectorAll('.faq-item');
      gsap.set(items, { opacity: 0, y: 20 });
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.07,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.faq__grid',
          start: 'top 82%',
          once: true,
        },
        delay: 0.1,
      });

      /* Footer */
      const footer = document.querySelector('.faq__footer');
      gsap.set(footer, { opacity: 0, y: 12 });
      gsap.to(footer, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.faq__footer',
          start: 'top 94%',
          once: true,
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="faq" id="faq" ref={sectionRef}>
      <div className="container">

        {/* Head */}
        <div className="faq__head">
          <p className="faq__eyebrow" data-anim>
            Questions
          </p>
          <h2 className="faq__title" data-anim>
            Got questions?<br />We've got answers.
          </h2>
          <p className="faq__sub" data-anim>
            Everything you need to know about Studiva — monetisation, uploads, and security.
          </p>
        </div>

        {/* Grid */}
        <div className="faq__grid">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>

        {/* Footer */}
        <div className="faq__footer">
          <div className="faq__support">
            <MessageCircle size={16} strokeWidth={2} className="faq__support-icon" />
            <span>
              Still have questions?{' '}
              <a href="mailto:support@studiva.com">Chat with our support team</a>.
              We're here to help.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FAQ;