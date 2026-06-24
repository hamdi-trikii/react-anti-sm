import { useState } from 'react';
import { DustParticles } from './components/DustParticles';
import { Scroll } from './components/Scroll';
import { ProphecyContent } from './components/ProphecyContent';
import { Certificate } from './components/Certificate';

function App() {
  const [isAccepted, setIsAccepted] = useState(false);
  const targetDate = new Date('2043-06-22T00:00:00'); // Yasmine reaches 40

  return (
    <>
      <div className="ambient-light" />
      <DustParticles />
      
      <Scroll>
        {!isAccepted ? (
          <ProphecyContent onAccept={() => {
            setIsAccepted(true);
          }} />
        ) : (
          <Certificate targetDate={targetDate} />
        )}
      </Scroll>
    </>
  );
}

export default App;
