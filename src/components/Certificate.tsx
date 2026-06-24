import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';

export const Certificate: React.FC<{ targetDate: Date }> = ({ targetDate }) => {
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [showTimer, setShowTimer] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    
    const updateCountdown = () => {
      const now = new Date();
      const diffTime = Math.max(0, targetDate.getTime() - now.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysRemaining(diffDays);
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div style={{ textAlign: 'center' }}>
      <Confetti recycle={false} numberOfPieces={600} gravity={0.1} width={windowSize.width} height={windowSize.height} style={{ position: 'fixed', top: 0, left: 0 }} />
      
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} style={{ padding: '0 5px' }}>
        <div className="wax-seal" />
        <h2 style={{ fontSize: 'clamp(1.4rem, 5.5vw, 2.5rem)', margin: 'clamp(10px, 2.5vh, 20px) 0', fontFamily: 'var(--font-title)', color: 'var(--color-burgundy)', lineHeight: '1.2' }}>
          Conditional Marriage Pact of the Fortieth Year
        </h2>
        
        <p style={{ fontSize: 'clamp(0.95rem, 3.5vw, 1.2rem)', marginBottom: 'clamp(10px, 2vh, 20px)', fontStyle: 'italic' }}>This document certifies that:</p>
        <h3 className="gold-text" style={{ fontSize: 'clamp(1.6rem, 6.5vw, 2.5rem)', margin: 'clamp(5px, 1.5vh, 15px) 0' }}>Sir Hamdi Triki</h3>
        <p style={{ fontSize: 'clamp(0.95rem, 3.5vw, 1.2rem)' }}>and</p>
        <h3 className="gold-text" style={{ fontSize: 'clamp(1.6rem, 6.5vw, 2.5rem)', margin: 'clamp(5px, 1.5vh, 15px) 0' }}>Lady Yasmine Maazoun</h3>
        
        <p style={{ fontSize: 'clamp(1rem, 3.8vw, 1.3rem)', margin: 'clamp(15px, 3.5vh, 40px) 0', lineHeight: '1.6' }}>
          have officially agreed that if they both arrive at forty years of age while remaining single,
          they shall revisit this matter and negotiate terms involving coffee, cake, and mutual embarrassment.
        </p>

        <div style={{ margin: 'clamp(15px, 3.5vh, 40px) 0', padding: 'clamp(10px, 2.5vh, 20px)', borderTop: '2px dashed rgba(0,0,0,0.2)' }}>
          <p style={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-dark-emerald)', fontSize: 'clamp(1rem, 3.5vw, 1.2rem)' }}>
            Official Status: Destiny has been informed.
          </p>
        </div>

        {!showTimer ? (
          <button className="btn-royal" onClick={() => setShowTimer(true)} style={{ marginTop: 'clamp(10px, 2vh, 20px)' }}>
            Fine, We'll See What Happens.
          </button>
        ) : (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
            <p style={{ fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', fontStyle: 'italic', marginBottom: '8px' }}>"Excellent."</p>
            <p style={{ fontSize: 'clamp(1rem, 3.5vw, 1.2rem)' }}>"The prophecy shall remain dormant until further notice."</p>
            
            <div style={{ marginTop: 'clamp(15px, 3.5vh, 40px)', padding: 'clamp(15px, 3vh, 30px)', background: 'rgba(0,0,0,0.03)', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)' }}>
              <p style={{ fontSize: 'clamp(1rem, 3.5vw, 1.2rem)' }}>Estimated activation date: <strong style={{ color: 'var(--color-burgundy)' }}>Year 2043</strong></p>
              <p style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontFamily: 'var(--font-title)', margin: 'clamp(10px, 2vh, 20px) 0', color: 'var(--color-dark-emerald)', lineHeight: '1' }}>{daysRemaining}</p>
              <p style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: 'clamp(0.85rem, 3vw, 1rem)', fontWeight: 'bold' }}>Days Remaining Until Both Are 40</p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
