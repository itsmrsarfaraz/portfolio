import { useState, useEffect } from 'react';
import { Terminal, ArrowRight } from 'lucide-react';

/**
 * Hero Component
 * 
 * LEARNING POINT: State & Effects (useState, useEffect)
 * - `useState` declares state variables (e.g., `text` and `isDeleting`). React tracks these and triggers a re-render when changed.
 * - `useEffect` runs side-effects (like APIs, intervals, or DOM updates). 
 * - Here, we use `useEffect` with a timer to simulate a typing effect. The dependency array `[text, isDeleting]` tells React to rerun the effect whenever those variables change, resetting the timer.
 */
export default function Hero({ onExploreProjects }) {
  const words = ["Full-Stack Developer", "Deep Reinforcement Learning Specialist", "Laravel & FastAPI Architect"];
  const [wordIdx, setWordIdx] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const activeWord = words[wordIdx];
    
    const handleTyping = () => {
      if (!isDeleting) {
        // Typing: Add one character
        setText(activeWord.substring(0, text.length + 1));
        setTypingSpeed(100); // normal typing speed

        // Word completed: Pause, then delete
        if (text === activeWord) {
          setTypingSpeed(2000); // 2-second pause at the end
          setIsDeleting(true);
        }
      } else {
        // Deleting: Remove one character
        setText(activeWord.substring(0, text.length - 1));
        setTypingSpeed(50); // fast deleting speed

        // Deleted all: Swap to next word
        if (text === '') {
          setIsDeleting(false);
          setWordIdx((prevIdx) => (prevIdx + 1) % words.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    
    // Clean up function: clears the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIdx]);

  return (
    <section 
      id="hero-section" 
      className="animate-fade-in"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 1.5rem 6rem',
        textAlign: 'center',
        minHeight: '80vh',
      }}
    >
      <div 
        id="hero-badge"
        className="glass-card"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.4rem 1rem',
          fontSize: '0.85rem',
          color: 'var(--color-secondary)',
          borderRadius: '50px',
          marginBottom: '2rem',
          border: '1px solid rgba(6, 182, 212, 0.2)',
          fontFamily: 'var(--font-mono)',
        }}
      >
        <Terminal size={14} />
        <span>System ready: active_developer.sh</span>
      </div>

      <h1 
        id="hero-headline"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '3.5rem',
          fontWeight: 800,
          lineHeight: 1.2,
          maxWidth: '850px',
          marginBottom: '1.5rem',
        }}
      >
        Hi, I'm <span className="gradient-text">Sarfaraz</span>.
        <br /> I build <span style={{ borderRight: '2px solid var(--color-primary)', paddingRight: '4px' }}>{text}</span>
      </h1>

      <p 
        id="hero-subheading"
        style={{
          color: 'var(--text-secondary)',
          fontSize: '1.15rem',
          maxWidth: '600px',
          marginBottom: '3rem',
        }}
      >
        A full-stack software engineer specialized in bridging AI engines with responsive web SaaS applications, combining Laravel with Python and Gymnasium reinforcement learning ecosystems.
      </p>

      <div 
        id="hero-actions"
        style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <button 
          id="hero-btn-explore"
          className="btn btn-primary"
          onClick={onExploreProjects}
        >
          Explore Projects
          <ArrowRight size={18} />
        </button>
        <a 
          id="hero-btn-github"
          className="btn btn-secondary" 
          href="https://github.com/itsmrsarfaraz"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg 
            viewBox="0 0 24 24" 
            width="18" 
            height="18" 
            stroke="currentColor" 
            strokeWidth="2" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            style={{ marginRight: '2px' }}
          >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
          GitHub Profile
        </a>
      </div>

      {/* Terminal Mockup to look cool */}
      <div 
        id="hero-terminal-mockup"
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '650px',
          marginTop: '4rem',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        {/* Terminal Header */}
        <div 
          className="terminal-header"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            padding: '0.75rem 1rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56', display: 'inline-block' }}></span>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }}></span>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f', display: 'inline-block' }}></span>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>sarfaraz@wsl-ubuntu:~</span>
          <span style={{ width: '30px' }}></span>
        </div>
        
        {/* Terminal Content */}
        <div 
          className="terminal-content"
          style={{
            padding: '1.5rem',
            textAlign: 'left',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            color: 'rgb(243, 244, 246)',
            background: 'rgba(10, 15, 30, 0.95)',
          }}
        >
          <div><span style={{ color: 'var(--color-secondary)' }}>$</span> cat about_me.json</div>
          <div style={{ paddingLeft: '1rem', color: '#9ca3af', marginTop: '0.5rem' }}>
            {`{`}
            <br />
            &nbsp;&nbsp;<span style={{ color: '#c084fc' }}>"role"</span>: <span style={{ color: '#22d3ee' }}>"Full Stack & AI Engineer"</span>,
            <br />
            &nbsp;&nbsp;<span style={{ color: '#c084fc' }}>"interests"</span>: [<span style={{ color: '#22d3ee' }}>"Deep Reinforcement Learning"</span>, <span style={{ color: '#22d3ee' }}>"SaaS Orchestration"</span>],
            <br />
            &nbsp;&nbsp;<span style={{ color: '#c084fc' }}>"currentStack"</span>: [<span style={{ color: '#22d3ee' }}>"Laravel 13"</span>, <span style={{ color: '#22d3ee' }}>"Python 3.14"</span>, <span style={{ color: '#22d3ee' }}>"FastAPI"</span>, <span style={{ color: '#22d3ee' }}>"React"</span>],
            <br />
            &nbsp;&nbsp;<span style={{ color: '#c084fc' }}>"motto"</span>: <span style={{ color: '#22d3ee' }}>"Split heavy AI workloads with asynchronous dual-engine designs."</span>
            <br />
            {`}`}
          </div>
          <div style={{ marginTop: '1rem' }}><span style={{ color: 'var(--color-secondary)' }}>$</span> python3 --version</div>
          <div style={{ color: '#9ca3af' }}>Python 3.14.0b1 (default, AI Optimized)</div>
          <div style={{ marginTop: '0.5rem' }}><span style={{ color: 'var(--color-secondary)' }}>$</span> <span style={{ animation: 'blink 1s step-end infinite', borderRight: '2px solid white' }}></span></div>
        </div>
      </div>
    </section>
  );
}
