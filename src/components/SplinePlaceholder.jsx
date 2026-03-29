
import { motion } from 'framer-motion';
import './SplinePlaceholder.css';

const SplinePlaceholder = () => {
  return (
    <div className="spline-placeholder">
      <motion.div 
        className="spline-placeholder__orb"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 1.5, 
          ease: "easeOut"
        }}
      />
      
      <motion.div 
        className="spline-placeholder__content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <div className="spline-placeholder__icon">
          <img 
            src="/images/studiva-quill-icon.svg" 
            alt="Studiva" 
            style={{ width: '32px', height: '32px', filter: 'invert(1)' }} 
          />
        </div>
        <div className="spline-placeholder__loading-text">
          Loading 3D Experience
        </div>
        
        {/* Subtle pulsing dots */}
        <div style={{ display: 'flex', gap: '4px' }}>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#1a1a1a' }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SplinePlaceholder;
