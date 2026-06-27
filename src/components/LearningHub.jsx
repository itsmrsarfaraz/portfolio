import React, { useState } from 'react';
import { BookOpen, Code2, Layers, ShieldAlert, Sparkles, Terminal } from 'lucide-react';

/**
 * LearningHub Component
 * 
 * LEARNING POINT: State-driven navigation tabs
 * - We track `activeTopic` in state to decide which guide article to display.
 * - We show code examples next to conceptual explanations to make learning intuitive.
 */
export default function LearningHub() {
  const [activeTopic, setActiveTopic] = useState('intro');

  const topics = [
    { id: 'intro', label: '1. What is React?', icon: BookOpen },
    { id: 'jsx-props', label: '2. JSX & Props', icon: Layers },
    { id: 'state-hooks', label: '3. State (useState)', icon: Terminal },
    { id: 'effects', label: '4. Effects (useEffect)', icon: Sparkles },
    { id: 'portfolio-code', label: '5. Portfolio Codebase', icon: Code2 },
  ];

  return (
    <section 
      id="learning-hub-container" 
      className="container animate-fade-in"
      style={{ padding: '4rem 0 6rem' }}
    >
      <h2 className="section-title">
        React <span className="gradient-text">Learning Hub</span>
      </h2>

      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto 3rem', fontSize: '1.05rem' }}>
        Learn React while exploring this very portfolio! Below is an interactive guide explaining the core building blocks used to construct this website.
      </p>

      <div className="grid-2" style={{ gridTemplateColumns: '1fr 3fr', gap: '2rem', alignItems: 'flex-start' }}>
        {/* Left Side: Topic Selection Bar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {topics.map((t) => {
            const Icon = t.icon;
            const isSelected = activeTopic === t.id;
            
            return (
              <button
                key={t.id}
                id={`learning-tab-${t.id}`}
                onClick={() => setActiveTopic(t.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.85rem 1.25rem',
                  border: isSelected ? '1px solid var(--color-primary)' : '1px solid var(--border-color)',
                  borderRadius: '10px',
                  background: isSelected ? 'rgba(139, 92, 246, 0.1)' : 'rgba(255,255,255,0.02)',
                  color: isSelected ? 'var(--color-primary)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  transition: 'var(--transition-smooth)',
                  fontFamily: 'var(--font-display)'
                }}
              >
                <Icon size={16} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Side: Topic Content Screen */}
        <div 
          className="glass-card" 
          id="learning-content-card"
          style={{ 
            padding: '2rem', 
            background: 'rgba(9, 13, 26, 0.6)', 
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.06)'
          }}
        >
          {activeTopic === 'intro' && (
            <div id="learning-intro-panel">
              <h3 style={{ fontSize: '1.6rem', fontWeight: 700, fontFamily: 'var(--font-display)', marginBottom: '1rem', color: 'var(--color-primary)' }}>
                Welcome to React!
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                React is an open-source JavaScript library built by Meta for creating interactive user interfaces (UIs). Instead of manipulating the web page directly using slow DOM API calls (like `document.getElementById`), React introduces a **Virtual DOM**.
              </p>
              
              <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#fff' }}>Key Pillars:</h4>
              <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <li><strong>Component-Based:</strong> You write small, isolated building blocks (like Navbars, Cards, and Modals) and assemble them to create large applications.</li>
                <li><strong>Declarative:</strong> You design simple views for each state in your application, and React efficiently updates and renders just the right components when your data changes.</li>
                <li><strong>Single-Way Data Flow:</strong> Data travels down the component tree from parent to child through read-only attributes called <em>Props</em>.</li>
              </ul>

              <div style={{ background: 'rgba(6, 182, 212, 0.05)', border: '1px solid rgba(6, 182, 212, 0.2)', padding: '1rem', borderRadius: '8px', display: 'flex', gap: '0.75rem' }}>
                <ShieldAlert size={20} style={{ color: 'var(--color-secondary)', flexShrink: 0, marginTop: '0.2rem' }} />
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <strong>How to learn:</strong> Click through the topics in this hub to understand JSX, Props, State, and Effects. We'll show you exactly how those ideas power this portfolio's source code!
                </p>
              </div>
            </div>
          )}

          {activeTopic === 'jsx-props' && (
            <div id="learning-jsx-props-panel">
              <h3 style={{ fontSize: '1.6rem', fontWeight: 700, fontFamily: 'var(--font-display)', marginBottom: '1rem', color: 'var(--color-secondary)' }}>
                JSX & Props: Writing UI Elements
              </h3>
              
              <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#fff' }}>1. What is JSX?</h4>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                JSX stands for <strong>JavaScript XML</strong>. It allows you to write HTML-like tag structures directly inside your JavaScript files. A compiler (like Vite's bundler) automatically translates JSX tags into pure JavaScript operations:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                <div style={{ background: '#05070f', padding: '0.75rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <span style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>// You write this JSX:</span>
                  <span style={{ color: '#c084fc' }}>&lt;h1</span> <span style={{ color: '#22d3ee' }}>className=</span>"title"<span style={{ color: '#c084fc' }}>&gt;</span>Hello<span style={{ color: '#c084fc' }}>&lt;/h1&gt;</span>
                </div>
                <div style={{ background: '#05070f', padding: '0.75rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <span style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>// Compiled JavaScript:</span>
                  React.createElement('h1', {'{'} className: 'title' {'}'}, 'Hello')
                </div>
              </div>

              <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#fff' }}>2. What are Props?</h4>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                Props are read-only properties passed down from a parent component to a child component. For example, in our portfolio, [App.jsx](https://github.com/itsmrsarfaraz/portfolio/blob/main/src/App.jsx) holds the state of the active page tab, and passes it to [Navbar.jsx](https://github.com/itsmrsarfaraz/portfolio/blob/main/src/components/Navbar.jsx) so it can highlight the correct link:
              </p>

              <div style={{ background: '#05070f', padding: '1rem', borderRadius: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', border: '1px solid rgba(255,255,255,0.04)', color: '#9ca3af' }}>
                <span style={{ color: 'var(--text-muted)' }}>// Parent component rendering Navbar with custom props:</span>
                <br />
                <span style={{ color: '#f43f5e' }}>&lt;Navbar</span> activeTab={'{activeTab}'} setActiveTab={'{setActiveTab}'} <span style={{ color: '#f43f5e' }}>/&gt;</span>
              </div>
            </div>
          )}

          {activeTopic === 'state-hooks' && (
            <div id="learning-state-hooks-panel">
              <h3 style={{ fontSize: '1.6rem', fontWeight: 700, fontFamily: 'var(--font-display)', marginBottom: '1rem', color: 'var(--color-primary)' }}>
                State & Hooks: Making Pages Alive
              </h3>
              
              <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#fff' }}>What is State?</h4>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                State represents the local data that a component tracks. Unlike regular local variables, when a state variable changes, <strong>React automatically re-renders the component</strong> to draw the updated values onto the screen.
              </p>

              <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#fff' }}>The `useState` Hook:</h4>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                Hooks are special functions that let you hook into React features. We use `useState` to declare a state variable:
              </p>

              <div style={{ background: '#05070f', padding: '1rem', borderRadius: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', border: '1px solid rgba(255,255,255,0.04)', marginBottom: '1.5rem', color: '#e2e8f0' }}>
                <span style={{ color: 'var(--color-primary)' }}>import</span> {'{ useState }'} <span style={{ color: 'var(--color-primary)' }}>from</span> <span style={{ color: 'var(--color-secondary)' }}>'react'</span>;
                <br /><br />
                <span style={{ color: 'var(--text-muted)' }}>// Declare state variable "count" initialized to 0, and a modifier "setCount"</span>
                <br />
                <span style={{ color: 'var(--color-primary)' }}>const</span> [count, setCount] = useState(<span style={{ color: 'var(--color-secondary)' }}>0</span>);
                <br /><br />
                <span style={{ color: 'var(--text-muted)' }}>// Calling setCount(10) updates "count" and triggers UI refresh!</span>
              </div>

              <div style={{ background: 'rgba(139, 92, 246, 0.05)', border: '1px solid rgba(139, 92, 246, 0.2)', padding: '1rem', borderRadius: '8px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem', color: 'var(--color-primary)' }}>Live Demo Connection:</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  In our [EdgeDrlDemo.jsx](https://github.com/itsmrsarfaraz/portfolio/blob/main/src/components/EdgeDrlDemo.jsx), we track metrics like `reward` and `latency` using `useState`. Clicking <strong>Run Simulation</strong> changes those states periodically, dynamically updating progress bars and labels!
                </span>
              </div>
            </div>
          )}

          {activeTopic === 'effects' && (
            <div id="learning-effects-panel">
              <h3 style={{ fontSize: '1.6rem', fontWeight: 700, fontFamily: 'var(--font-display)', marginBottom: '1rem', color: 'var(--color-secondary)' }}>
                Effects & Lifecycles: Running Async Code
              </h3>
              
              <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#fff' }}>What is `useEffect`?</h4>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                The `useEffect` hook lets you synchronize a component with an external system. Common use cases include calling database APIs, setting up clock intervals, and subscribing to events.
              </p>

              <div style={{ background: '#05070f', padding: '1rem', borderRadius: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', border: '1px solid rgba(255,255,255,0.04)', marginBottom: '1.5rem', color: '#e2e8f0' }}>
                useEffect(() =&gt; {'{'}
                <br />
                &nbsp;&nbsp;<span style={{ color: 'var(--text-muted)' }}>// Code here runs AFTER the component finishes rendering onto the screen</span>
                <br />
                &nbsp;&nbsp;console.log(<span style={{ color: 'var(--color-secondary)' }}>"Component mounted!"</span>);
                <br /><br />
                &nbsp;&nbsp;<span style={{ color: 'var(--text-muted)' }}>// Return cleanup function to clear resources (intervals, listeners)</span>
                <br />
                &nbsp;&nbsp;<span style={{ color: 'var(--color-primary)' }}>return</span> () =&gt; console.log(<span style={{ color: 'var(--color-secondary)' }}>"Component unmounted!"</span>);
                <br />
                {'}'}, [dependencies]); <span style={{ color: 'var(--text-muted)' }}>// Re-run effect ONLY when items in this array change</span>
              </div>

              <div style={{ background: 'rgba(6, 182, 212, 0.05)', border: '1px solid rgba(6, 182, 212, 0.2)', padding: '1rem', borderRadius: '8px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem', color: 'var(--color-secondary)' }}>Live Demo Connection:</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  In our [Hero.jsx](https://github.com/itsmrsarfaraz/portfolio/blob/main/src/components/Hero.jsx), we run a typing text timer loop. We use `useEffect` to trigger a `setTimeout` callback. The effect cleans up after itself via `clearTimeout(timer)` to prevent memory leaks during page navigation.
                </span>
              </div>
            </div>
          )}

          {activeTopic === 'portfolio-code' && (
            <div id="learning-portfolio-code-panel">
              <h3 style={{ fontSize: '1.6rem', fontWeight: 700, fontFamily: 'var(--font-display)', marginBottom: '1rem', color: 'var(--color-primary)' }}>
                Real Code walkthrough: Typing Effect
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                Take a look at the exact code block that powers the typing simulator in the header of this portfolio ([Hero.jsx](https://github.com/itsmrsarfaraz/portfolio/blob/main/src/components/Hero.jsx)):
              </p>

              <div style={{ background: '#05070f', padding: '1rem', borderRadius: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', border: '1px solid rgba(255,255,255,0.04)', overflowX: 'auto', color: '#9ca3af', lineHeight: '1.4' }}>
                <span style={{ color: 'var(--text-muted)' }}>// Inside Hero.jsx:</span>
                <br />
                <span style={{ color: '#f43f5e' }}>useEffect</span>(() =&gt; {'{'}
                <br />
                &nbsp;&nbsp;<span style={{ color: 'var(--color-primary)' }}>const</span> activeWord = words[wordIdx];
                <br />
                &nbsp;&nbsp;<span style={{ color: 'var(--color-primary)' }}>const</span> handleTyping = () =&gt; {'{'}
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: 'var(--color-primary)' }}>if</span> (!isDeleting) {'{'}
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: 'var(--text-muted)' }}>// Add one letter to state</span>
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;setText(activeWord.substring(<span style={{ color: '#c084fc' }}>0</span>, text.length + <span style={{ color: '#c084fc' }}>1</span>));
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: 'var(--color-primary)' }}>if</span> (text === activeWord) setIsDeleting(<span style={{ color: '#22d3ee' }}>true</span>);
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;{'}'} <span style={{ color: 'var(--color-primary)' }}>else</span> {'{'}
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: 'var(--text-muted)' }}>// Delete one letter from state</span>
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;setText(activeWord.substring(<span style={{ color: '#c084fc' }}>0</span>, text.length - <span style={{ color: '#c084fc' }}>1</span>));
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: 'var(--color-primary)' }}>if</span> (text === <span style={{ color: '#22d3ee' }}>""</span>) {'{'}
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;setIsDeleting(<span style={{ color: '#22d3ee' }}>false</span>);
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;setWordIdx((prev) =&gt; (prev + <span style={{ color: '#c084fc' }}>1</span>) % words.length);
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'}'}
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;{'}'}
                <br />
                &nbsp;&nbsp;{'}'};
                <br />
                &nbsp;&nbsp;<span style={{ color: 'var(--color-primary)' }}>const</span> timer = setTimeout(handleTyping, speed);
                <br />
                &nbsp;&nbsp;<span style={{ color: 'var(--color-primary)' }}>return</span> () =&gt; clearTimeout(timer); <span style={{ color: 'var(--text-muted)' }}>// Clear timer on update</span>
                <br />
                {'}'}, [text, isDeleting, wordIdx]);
              </div>
              
              <p style={{ color: 'var(--text-secondary)', marginTop: '1.25rem', fontSize: '0.9rem' }}>
                Every time `text` changes, the timeout triggers another `handleTyping` cycle. When the word is fully typed, `isDeleting` flips to `true`, and it begins deleting. When fully deleted, the index increments to choose the next phrase!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
