import React, { useState } from 'react';
import { BrainCircuit, BedDouble, Bug, ChevronRight, Sparkles } from 'lucide-react';
import EdgeDrlDemo from './EdgeDrlDemo';
import SeeHostelsDemo from './SeeHostelsDemo';
import BugFixDemo from './BugFixDemo';

/**
 * Projects Component
 * 
 * LEARNING POINT: Reusing Components & Composition
 * - Here, we import our smaller simulator components (`EdgeDrlDemo`, `SeeHostelsDemo`, `BugFixDemo`) and compose them together.
 * - By breaking up our UI into modular components, we keep our code tidy, maintainable, and easier to digest.
 * - We use state (`activeProject`) to switch between projects and render the appropriate simulator.
 */
export default function Projects() {
  const [activeProject, setActiveProject] = useState('edge-drl');

  const projectList = [
    {
      id: 'edge-drl',
      title: 'Edge Computing DRL Sim',
      subtitle: 'Final Year Project Simulation Platform',
      icon: BrainCircuit,
      color: 'var(--color-primary)',
      tech: ['Laravel 13', 'FastAPI', 'Stable-Baselines3', 'Gymnasium', 'PyTorch'],
      desc: 'An asynchronous dual-engine simulation platform showcasing deep reinforcement learning (PPO & DQN) resource allocation strategies for edge computing environments. Runs local HTTP bridging loops to isolate neural workloads.'
    },
    {
      id: 'seehostels',
      title: 'SeeHostels SaaS Platform',
      subtitle: 'Hostel Management & Discovery SaaS',
      icon: BedDouble,
      color: 'var(--color-accent)',
      tech: ['PHP 8.4', 'Laravel 13', 'Alpine.js', 'TailwindCSS v4', 'MySQL'],
      desc: 'A robust hostel management and discovery portal built with role-based access control (8 distinct roles). Implements complex automated invoicing schedulers, ledger balance calculations, and Spatie systems.'
    },
    {
      id: 'bugfix',
      title: 'BugFixRecommender',
      subtitle: 'Automated Java Code Repair Retrieval Pipeline',
      icon: Bug,
      color: 'var(--color-secondary)',
      tech: ['Python 3.10', 'FastAPI', 'BM25 Retrieval', 'TypeScript', 'VS Code API'],
      desc: 'An end-to-end repository indexing pipeline that extracts diff patterns from GitHub and indexes buggy-to-fixed pairs. Features a VS Code extension interface WebView to serve local recommendations.'
    }
  ];

  return (
    <section 
      id="projects-section" 
      className="container animate-fade-in"
      style={{ padding: '4rem 0 6rem' }}
    >
      <h2 className="section-title">
        Featured <span className="gradient-text">Engineering Projects</span>
      </h2>

      {/* Grid listing projects */}
      <div className="grid-3" style={{ marginBottom: '3rem' }}>
        {projectList.map((project) => {
          const Icon = project.icon;
          const isSelected = activeProject === project.id;
          
          return (
            <div 
              key={project.id}
              id={`project-card-${project.id}`}
              className="glass-card"
              onClick={() => setActiveProject(project.id)}
              style={{
                padding: '1.75rem',
                cursor: 'pointer',
                border: isSelected ? `2px solid ${project.color}` : '1px solid var(--border-color)',
                boxShadow: isSelected ? `0 10px 30px rgba(0, 0, 0, 0.4), 0 0 15px ${project.color}30` : 'none',
                transform: isSelected ? 'translateY(-4px)' : 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div 
                  className="icon-wrapper"
                  style={{
                    width: '45px',
                    height: '45px',
                    borderRadius: '12px',
                    background: isSelected ? project.color : 'rgba(255, 255, 255, 0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem',
                    transition: 'var(--transition-smooth)'
                  }}
                >
                  <Icon size={22} style={{ color: isSelected ? '#fff' : project.color }} />
                </div>

                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                  {project.title}
                </h3>
                
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '1rem', fontWeight: 500 }}>
                  {project.subtitle}
                </span>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                  {project.desc}
                </p>
              </div>

              <div>
                {/* Tech badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                  {project.tech.map((t) => (
                    <span 
                      key={t}
                      style={{ 
                        fontSize: '0.7rem', 
                        padding: '0.2rem 0.5rem', 
                        background: 'rgba(255, 255, 255, 0.03)', 
                        border: '1px solid rgba(255,255,255,0.06)',
                        color: 'var(--text-secondary)',
                        borderRadius: '4px',
                        fontFamily: 'var(--font-mono)'
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.25rem', 
                    fontSize: '0.85rem', 
                    fontWeight: 600,
                    color: project.color,
                    transition: 'var(--transition-smooth)'
                  }}
                >
                  <span>Interactive Demo Workspace</span>
                  <ChevronRight size={14} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Simulator Workspace Screen */}
      <div 
        id="demo-workspace-board"
        className="glass-card"
        style={{
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
          borderRadius: '16px',
          overflow: 'hidden',
          animation: 'fadeIn 0.5s ease-out'
        }}
      >
        {/* Mock OS / Workspace Bar */}
        <div 
          className="workspace-header"
          style={{
            background: 'rgba(255,255,255,0.02)',
            padding: '0.75rem 1.25rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Sparkles size={16} style={{ color: 'var(--color-secondary)' }} />
            <span style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
              Interactive Console Room
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Target: </span>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-primary)', fontWeight: 600 }}>
              {activeProject === 'edge-drl' ? 'edge-drl-env' : activeProject === 'seehostels' ? 'seehostels-saas' : 'bugfix-bm25'}
            </span>
          </div>
        </div>

        {/* Demo Content */}
        <div style={{ background: '#090d1a', padding: '1.5rem' }}>
          {activeProject === 'edge-drl' && <EdgeDrlDemo />}
          {activeProject === 'seehostels' && <SeeHostelsDemo />}
          {activeProject === 'bugfix' && <BugFixDemo />}
        </div>
      </div>
    </section>
  );
}
