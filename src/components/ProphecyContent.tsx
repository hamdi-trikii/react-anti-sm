import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PIGEON_QUOTES = [
  "Coo. (Just accept it.)",
  "Coo. (Destiny is non-refundable.)",
  "Coo? (Are you really still reading this?)",
  "Coo! (The grandmothers are watching.)",
  "Coo... (I drop wisdom, and occasionally other things.)"
];

export const ProphecyContent: React.FC<{ onAccept: () => void }> = ({ onAccept }) => {
  const [noCount, setNoCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pigeonQuote, setPigeonQuote] = useState("");
  const [showPigeon, setShowPigeon] = useState(false);
  const [dodgePosition, setDodgePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // The Suspiciously Wise Pigeon appears randomly
    const pigeonInterval = setInterval(() => {
      if (Math.random() > 0.5 && !showPigeon) {
        setPigeonQuote(PIGEON_QUOTES[Math.floor(Math.random() * PIGEON_QUOTES.length)]);
        setShowPigeon(true);
        setTimeout(() => setShowPigeon(false), 4000);
      }
    }, 8000);
    return () => clearInterval(pigeonInterval);
  }, [showPigeon]);

  useEffect(() => {
    if (noCount === 5 && loading) {
      let p = 0;
      const interval = setInterval(() => {
        p += 5;
        setProgress(p);
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [noCount, loading]);

  const handleNoHover = () => {
    if (noCount >= 2 && noCount <= 3) {
      // Button starts dodging the mouse
      // Keep bounds tighter so it doesn't escape the scroll container's overflow:hidden
      const randomX = (Math.random() * 140) - 70;
      const randomY = (Math.random() * 100) - 50;
      setDodgePosition({ x: randomX, y: randomY });
    }
  };

  const handleNoClick = () => {
    if (noCount === 4) {
      setNoCount(5);
      setLoading(true);
      setProgress(0);
    } else if (noCount < 10) {
      setNoCount(c => c + 1);
      setDodgePosition({ x: 0, y: 0 }); // Reset position when eventually clicked
    }
  };

  const renderNoState = () => {
    switch (noCount) {
      case 1:
        return <p style={{ fontStyle: 'italic', fontSize: '1.2rem' }}>"Interesting observation."</p>;
      case 2:
        return <p style={{ fontStyle: 'italic', fontSize: '1.2rem' }}>"Destiny has taken note of your concerns. (Good luck catching the button now.)"</p>;
      case 3:
        return <div className="royal-stamp" style={{ margin: '20px 0' }}>Concern Acknowledged</div>;
      case 4:
        return (
          <div>
            <p style={{ fontSize: '1.2rem' }}>🧙‍♂️ The stars have reviewed your objection.</p>
            <p style={{ fontWeight: 'bold', marginTop: '10px' }}>Result: Objection rejected.</p>
          </div>
        );
      case 5:
        if (loading) {
          return (
            <div style={{ width: '80%', margin: '0 auto' }}>
              <p>Launching Alternative Evaluation Process...</p>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          );
        }
        return (
          <div>
            <p>Alternative evaluation complete.</p>
            <p style={{ fontWeight: 'bold' }}>Still yes.</p>
          </div>
        );
      case 6:
        return <p style={{ fontStyle: 'italic' }}>"Persistency noted. Try clicking one of these."</p>;
      case 7:
        return (
          <div>
            <div className="dragon-fly">🐉</div>
            <p style={{ fontStyle: 'italic', fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--color-dark-emerald)' }}>
              Dragon Opinion: Acceptable Match.
            </p>
          </div>
        );
      case 8:
        return (
          <div style={{ border: '2px solid red', background: '#ffeeee', color: 'red', padding: '15px', borderRadius: '4px', maxWidth: '300px', margin: '0 auto' }}>
            <h3 style={{ margin: 0, color: 'red', fontFamily: 'sans-serif' }}>ERROR 40</h3>
            <p style={{ fontFamily: 'sans-serif', margin: '10px 0' }}>Insufficient Reasons To Reject Prophecy</p>
            <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
              <button onClick={handleNoClick} style={{ cursor: 'pointer' }}>Retry</button>
              <button onClick={handleNoClick} style={{ cursor: 'pointer' }}>Ignore</button>
            </div>
          </div>
        );
      case 9:
        return (
          <div style={{ background: '#f9d71c', color: '#000', padding: '20px', borderRadius: '8px', border: '2px solid #8b6508', maxWidth: '400px', margin: '0 auto' }}>
            <h3 style={{ margin: 0 }}>🏆 Legendary Resistance</h3>
            <p>Only 0.01% of visitors have refused this many times.</p>
          </div>
        );
      case 10:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
            <p>"Very well."</p>
            <p>"It appears Lady Yasmine Maazoun is determined."</p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
              "Consulting higher authorities..."
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4 }} style={{ textAlign: 'left', display: 'inline-block', margin: '20px auto', fontSize: '1.1rem' }}>
              <p>Fate ✓</p>
              <p>Destiny ✓</p>
              <p>Grandmothers ✓</p>
              <p>Cats ✓</p>
              <p>Ancient Scroll ✓</p>
            </motion.div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 6 }} style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'var(--color-wax-red)' }}>
              Final Result: Decision remains unchanged.
            </motion.p>
          </motion.div>
        );
      default:
        return null;
    }
  };

  // The Yes button gets slightly bigger with every No click
  const yesButtonScale = 1 + (noCount * 0.05);

  return (
    <div style={{ textAlign: 'center', position: 'relative' }}>
      
      {/* Suspiciously Wise Pigeon */}
      <div className={`pigeon ${showPigeon ? 'peek' : ''}`}>
        🐦
        {showPigeon && (
          <div className="pigeon-speech">
            {pigeonQuote}
          </div>
        )}
      </div>

      <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', marginBottom: '20px' }}>By decree of Destiny,</h2>
      <p style={{ fontSize: 'clamp(1rem, 4vw, 1.2rem)' }}>and with the approval of:</p>
      <ul style={{ listStyle: 'none', padding: 0, fontStyle: 'italic', margin: '20px 0', fontSize: 'clamp(1rem, 4vw, 1.3rem)' }}>
        <li style={{ margin: '8px 0' }}>The Council of Grandmothers</li>
        <li style={{ margin: '8px 0' }}>The Department of Unexpected Outcomes</li>
        <li style={{ margin: '8px 0' }}>Three Cats 🐈🐈🐈</li>
        <li style={{ margin: '8px 0' }}>One Suspiciously Wise Pigeon 🐦</li>
      </ul>

      <p style={{ fontSize: 'clamp(1.1rem, 4vw, 1.4rem)', margin: '30px 0', borderTop: '1px solid rgba(0,0,0,0.1)', borderBottom: '1px solid rgba(0,0,0,0.1)', padding: '20px 0', lineHeight: '1.6' }}>
        "If both parties remain single at forty years of age, they shall be required to attend one (1) ceremonial coffee meeting to discuss whether destiny was onto something."
      </p>

      <div style={{ minHeight: '200px', marginBottom: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={noCount + (loading ? 'loading' : 'done')}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{ width: '100%' }}
          >
            {renderNoState()}
          </motion.div>
        </AnimatePresence>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap', alignItems: 'center', minHeight: '100px' }}>
        <motion.button 
          className="btn-royal" 
          onClick={onAccept}
          animate={{ scale: yesButtonScale }}
          whileHover={{ scale: yesButtonScale * 1.1 }}
          style={{ zIndex: 10 }}
        >
          {noCount >= 8 ? "FINE, I ACCEPT!" : "I Accept"}
        </motion.button>
        
        {noCount === 6 ? (
          <>
            {[1,2,3,4,5].map(i => (
               <button key={i} className="btn-outline" onClick={handleNoClick} style={{ fontSize: '0.9rem', padding: '8px 16px', margin: '5px' }}>No</button>
            ))}
          </>
        ) : noCount === 8 ? null : (
          <motion.div 
            onMouseEnter={handleNoHover}
            onTouchStart={handleNoHover}
            animate={{ x: dodgePosition.x, y: dodgePosition.y }}
            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            style={{ 
              position: (noCount >= 2 && noCount <= 3) ? 'relative' : 'static',
              zIndex: 5,
              padding: (noCount >= 2 && noCount <= 3) ? '15px' : '0', // Reduced proximity wrapper so it's catchable
              margin: (noCount >= 2 && noCount <= 3) ? '-15px' : '0',
            }}
          >
            <button 
              className="btn-outline" 
              onClick={handleNoClick} 
              style={{ 
                opacity: (loading || noCount >= 10) ? 0.5 : 1, 
                pointerEvents: (loading || noCount >= 10) ? 'none' : 'auto',
              }}
            >
              {noCount >= 9 ? "Give Up" : "No"}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
