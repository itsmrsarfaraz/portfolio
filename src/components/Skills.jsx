import React from 'react';
import { Server, Brain, Code2, Database } from 'lucide-react';

/**
 * Skills Component
 * 
 * LEARNING POINT: Modular UI Components
 * - This component serves as a visual grid displaying technical skills.
 * - It doesn't hold any state because its contents are static.
 * - In React, these are called "Presentational Components". Keeping static layout code in
 *   presentational components makes them fast, easy to test, and highly readable.
 */
export default function Skills() {
  const skillCategories = [
    {
      title: 'Backend Frameworks',
      icon: Server,
      color: 'var(--color-accent)',
      skills: ['Laravel 13 (Blade/Livewire)', 'PHP 8.4/8.5 & Composer', 'FastAPI Web Servers', 'REST API Architecture', 'Autoloader Queue Workers']
    },
    {
      title: 'AI & Reinforcement Learning',
      icon: Brain,
      color: 'var(--color-primary)',
      skills: ['Stable-Baselines3 (PPO & DQN)', 'Gymnasium Custom Env Wrapper', 'PyTorch Neural Networks', 'Deep Reinforcement Learning', 'Resource Allocation Simulation']
    },
    {
      title: 'Frontend & Scripting',
      icon: Code2,
      color: 'var(--color-secondary)',
      skills: ['React (Hooks, Context, State)', 'Alpine.js & Blade templates', 'TailwindCSS v4 styling', 'Chart.js & Data plots', 'TypeScript / Node.js']
    },
    {
      title: 'Databases & Environments',
      icon: Database,
      color: '#10b981',
      skills: ['MySQL 8 Schema Design', 'Query Optimization & Indices', 'WSL Ubuntu Development', 'Git / GitHub VCS', 'Bash / Scripting automation']
    }
  ];

  return (
    <section 
      id="skills-section" 
      className="container animate-fade-in"
      style={{ padding: '4rem 0 6rem' }}
    >
      <h2 className="section-title">
        Technical <span className="gradient-text">Competencies & Skills</span>
      </h2>

      <div className="grid-2" style={{ gap: '2rem' }}>
        {skillCategories.map((category) => {
          const Icon = category.icon;
          
          return (
            <div 
              key={category.title}
              id={`skills-card-${category.title.replace(/\s+/g, '-').toLowerCase()}`}
              className="glass-card"
              style={{
                padding: '2rem',
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'flex-start',
                flexWrap: 'wrap'
              }}
            >
              <div 
                className="icon-container"
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Icon size={24} style={{ color: category.color }} />
              </div>

              <div style={{ flex: '1 1 250px' }}>
                <h3 
                  style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontSize: '1.3rem', 
                    fontWeight: 700, 
                    marginBottom: '1rem',
                    color: 'var(--text-primary)'
                  }}
                >
                  {category.title}
                </h3>
                
                <ul 
                  style={{ 
                    listStyleType: 'none', 
                    padding: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.6rem'
                  }}
                >
                  {category.skills.map((skill, index) => (
                    <li 
                      key={index} 
                      style={{ 
                        fontSize: '0.9rem', 
                        color: 'var(--text-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <span 
                        style={{ 
                          width: '6px', 
                          height: '6px', 
                          borderRadius: '50%', 
                          background: category.color,
                          display: 'inline-block'
                        }}
                      ></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
