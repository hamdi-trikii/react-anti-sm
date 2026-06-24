import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const Scroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '800px', margin: '0 auto', padding: 'clamp(10px, 3vw, 20px)' }}>
      {!isOpen ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ textAlign: 'center', color: '#f3e5ab' }}
        >
          <h1 className="gold-text" style={{ fontSize: 'clamp(2rem, 8vw, 3rem)', marginBottom: '10px', lineHeight: '1.2' }}>The Prophecy of the Fortieth Year</h1>
          <p style={{ fontSize: 'clamp(1rem, 4vw, 1.2rem)', fontStyle: 'italic', opacity: 0.8, marginBottom: 'clamp(15px, 5vh, 40px)' }}>
            A Matter of Destiny, Timing, and Questionable Life Decisions
          </p>
          
          <div style={{ margin: 'clamp(15px, 5vh, 40px) 0' }}>
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 1, duration: 2 }}
              style={{ fontSize: '1.2rem', lineHeight: '1.6' }}
            >
              "In the year 2026, two individuals unknowingly became subjects of an ancient prophecy..."
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 2 }}
              style={{ fontSize: '1.5rem', margin: 'clamp(10px, 3vh, 20px) 0', fontFamily: 'var(--font-title)' }}
            >
              <span className="gold-text">Sir Hamdi Triki</span> & <span className="gold-text">Lady Yasmine Maazoun</span>
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 5, duration: 2 }}
              style={{ fontSize: '1.2rem', lineHeight: '1.6' }}
            >
              "Should they reach the age of forty while remaining gloriously unattached, fate shall activate Protocol 40."
            </motion.p>
          </div>

          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 7 }}
            onClick={() => setIsOpen(true)}
            className="btn-royal"
            style={{ marginTop: 'clamp(10px, 3vh, 20px)' }}
          >
            Reveal Protocol 40
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="parchment-bg"
          style={{ width: '100%', padding: 'clamp(20px, 5vw, 40px) clamp(15px, 5vw, 60px)', overflow: 'hidden' }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};
