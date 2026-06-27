import React from 'react';
import { Cpu, Layout, Terminal, Code2, BookOpen } from 'lucide-react';

/**
 * Navbar Component
 * 
 * LEARNING POINT: Functional Components & Props
 * - In React, components are JavaScript functions that return JSX (JavaScript XML).
 * - This component accepts two "props" (properties): `activeTab` and `setActiveTab`.
 * - Props are how data is passed down from a parent component (App.jsx) to a child component (Navbar.jsx).
 * - React re-renders components whenever their props or internal state changes.
 */
export default function Navbar({ activeTab, setActiveTab }) {
  // Navigation links data
  const navItems = [
    { id: 'hero', label: 'Home', icon: Layout },
    { id: 'projects', label: 'Projects', icon: Cpu },
    { id: 'skills', label: 'Skills', icon: Terminal },
    { id: 'learning', label: 'React Learning Hub', icon: BookOpen },
  ];

  return (
    <nav 
      id="main-navbar" 
      className="glass-card" 
      style={{
        position: 'sticky',
        top: '1.5rem',
        zIndex: 100,
        margin: '1.5rem auto',
        maxWidth: '800px',
        padding: '0.75rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      }}
    >
      <div 
        id="navbar-logo"
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          fontWeight: 800,
          fontFamily: 'var(--font-display)',
          fontSize: '1.25rem'
        }}
      >
        <Code2 style={{ color: 'var(--color-primary)' }} size={24} />
        <span>SARFARAZ</span>
      </div>

      <ul 
        id="navbar-links-list"
        style={{ 
          display: 'flex', 
          listStyle: 'none', 
          gap: '1rem', 
          alignItems: 'center' 
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <li key={item.id} id={`nav-item-wrapper-${item.id}`}>
              <button
                id={`nav-btn-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  border: 'none',
                  borderRadius: '8px',
                  background: isActive ? 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)' : 'transparent',
                  color: isActive ? '#fff' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  transition: 'var(--transition-smooth)',
                  fontFamily: 'var(--font-display)',
                }}
              >
                <Icon size={16} />
                <span className="nav-label">{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
