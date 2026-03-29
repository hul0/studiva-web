import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Apple, Smartphone, TrendingUp, Users } from 'lucide-react';
const SplineScene = lazy(() => import('./SplineScene'));
import SplinePlaceholder from './SplinePlaceholder';
import './Hero.css';

const Hero = () => {
    const [isSplineLoaded, setIsSplineLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 1024);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <section className="hero">

            {/* Background Spline Animation - Only Render on Desktop for Performance */}
            {!isMobile && (
                <div className="hero__spline-wrapper">
                    <div className="hero__spline-container">
                        <AnimatePresence>
                            {!isSplineLoaded && (
                                <motion.div
                                    key="placeholder"
                                    initial={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.6 }}
                                    style={{ position: 'absolute', inset: 0, zIndex: 2 }}
                                >
                                    <SplinePlaceholder />
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <Suspense fallback={null}>
                            <SplineScene onLoad={() => setIsSplineLoaded(true)} />
                        </Suspense>
                    </div>
                </div>
            )}

            <div className="grid-bg" />

            {/* Main Content Container */}
            <div className="container hero__inner">
                {/* Text Content */}
                <div className="hero__content">
                    {/* <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        <span className="label">COMMUNITY-POWERED KNOWLEDGE</span>
                    </motion.div> */}

                    <h1 className="hero__title">
                        <motion.span
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                            style={{ display: 'inline-block' }}
                        >
                            Turn Your Notes
                        </motion.span>
                        <br />
                        <motion.span
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                            className="accent-text"
                            style={{ display: 'inline-block' }}
                        >
                            Int<span className="super-o">o</span>
                        </motion.span>
                        {' '}
                        <motion.span
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                            className="accent-text"
                            style={{ display: 'inline-block' }}
                        >
                            Inc<span className="super-o">o</span>me.
                        </motion.span>
                    </h1>

                    <motion.p
                        className="hero__sub section-sub"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
                    >
                        The world's first note marketplace that respects your time.
                        Earn through paid sales and rewarded ads — <strong>no forced ads, ever.</strong>
                    </motion.p>

                    <motion.div
                        className="hero__cta"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.7, ease: "easeOut" }}
                    >
                        <a href="https://youtu.be/Aq5WXmQQooo?si=qEvsWn-25Jdy6xje" className="brutalist-button">
                            <Apple className="brutalist-icon" size={24} fill="currentColor" />
                            <div className="button-text">
                                <span>Download for</span>
                                <span>IOS</span>
                            </div>
                        </a>
                        <a className="fancy" href="https://play.google.com/store/apps/details?id=com.studiva.app">
                            <span className="top-key"></span>
                            <Smartphone className="fancy-icon" size={20} />
                            <span className="text">Android app</span>
                            <span className="bottom-key-1"></span>
                            <span className="bottom-key-2"></span>
                        </a>
                    </motion.div>

                    <motion.div
                        className="hero__stats"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1, duration: 1 }}
                    >
                        <div className="hero__stat">
                            <Users size={18} />
                            <span><strong>200K+</strong> Learners</span>
                        </div>
                        <div className="hero__stat">
                            <TrendingUp size={18} />
                            <span><strong>₹2Cr+</strong> Paid</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;