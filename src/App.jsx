import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import LearningHub from './components/LearningHub';

/**
 * Main App Component
 * 
 * LEARNING POINT: State-Driven Rendering
 * - `App` is the root component of our layout.
 * - It maintains a single state variable, `activeTab`, to track which section is currently active.
 * - Based on this state, it conditionally displays the corresponding section.
 * - We pass `activeTab` and `setActiveTab` down to `Navbar` as props. When the user clicks a button in Navbar,
 *   it updates the state in App.jsx, which immediately re-renders the page to show the new section!
 */
export default function App() {
  const [activeTab, setActiveTab] = useState('hero');

  // Callback to transition from hero section to projects section
  const handleExploreProjects = () => {
    setActiveTab('projects');
  };

  return (
    <div 
      id="app-root-container"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingBottom: '2rem'
      }}
    >
      {/* Page Header Area */}
      <header id="main-header" style={{ width: '100%' }}>
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      </header>

      {/* Main Section Content Area */}
      <main id="main-content-area" style={{ flexGrow: 1 }}>
        {activeTab === 'hero' && <Hero onExploreProjects={handleExploreProjects} />}
        {activeTab === 'projects' && <Projects />}
        {activeTab === 'skills' && <Skills />}
        {activeTab === 'learning' && <LearningHub />}
      </main>

      {/* Footer Area */}
      <footer 
        id="main-footer"
        style={{
          borderTop: '1px solid var(--border-color)',
          marginTop: '4rem',
          paddingTop: '2rem',
          textAlign: 'center',
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-mono)'
        }}
      >
        <div className="container">
          <p>© {new Date().getFullYear()} Sarfaraz. Built with React & Vite. Running on local Linux WSL.</p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'rgba(255,255,255,0.2)' }}>
            Code variables: active_tab = '{activeTab}'
          </p>
        </div>
      </footer>
    </div>
  );
}
