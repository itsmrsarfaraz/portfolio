import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Cpu, Zap, Activity } from 'lucide-react';

/**
 * EdgeDrlDemo Component
 * 
 * LEARNING POINT: Simulating Async Cycles with state
 * - This component simulates a real AI training run (gymnasium environment + PPO/DQN).
 * - React uses a simple `setInterval` inside a conditional loop to update state metrics (rewards, latency, utilization) over time.
 * - By updating state variables, React automatically re-draws the graphs and progress bars dynamically, demonstrating its reactive rendering capabilities.
 */
export default function EdgeDrlDemo() {
  const [algorithm, setAlgorithm] = useState('PPO');
  const [isSeeded, setIsSeeded] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [step, setStep] = useState(0);
  const [reward, setReward] = useState(-50.0);
  const [latency, setLatency] = useState(120); // ms
  const [utilization, setUtilization] = useState(15); // %
  const [logMessages, setLogMessages] = useState([]);

  // Mock list of nodes and tasks
  const nodes = [
    { id: 'node-1', name: 'Edge Node Alpha', cpu: '2.4 GHz', ram: '8GB', cap: '65%' },
    { id: 'node-2', name: 'Edge Node Beta', cpu: '3.0 GHz', ram: '16GB', cap: '80%' },
    { id: 'node-3', name: 'Edge Node Gamma', cpu: '1.8 GHz', ram: '4GB', cap: '45%' },
  ];

  // Side effect to handle active simulation timer
  useEffect(() => {
    let interval = null;
    if (isRunning && step < 100) {
      interval = setInterval(() => {
        setStep((prev) => {
          const nextStep = prev + 5;
          
          // Random walk for rewards and performance metrics, showing improvement
          setReward((r) => parseFloat((r + Math.random() * 8 + (algorithm === 'PPO' ? 1.5 : 0.8)).toFixed(2)));
          setLatency((l) => Math.max(25, Math.floor(l - Math.random() * 6 - 2)));
          setUtilization((u) => Math.min(95, Math.floor(u + Math.random() * 5 + 1)));

          // Output logs similar to SB3/Gymnasium outputs
          const epoch = Math.floor(nextStep / 10);
          if (nextStep % 10 === 0) {
            setLogMessages((logs) => [
              `[GymEnv] Epoch ${epoch}/10 | Step ${nextStep} | Mean Reward: ${(reward + 5).toFixed(1)} | FPS: 420`,
              ...logs
            ]);
          }

          if (nextStep >= 100) {
            setIsRunning(false);
            setLogMessages((logs) => [
              `[SUCCESS] Simulation Finished! Optimized Allocation Matrix Generated.`,
              `[FastAPI] Models saved under checkpoints/${algorithm.toLowerCase()}_edge_allocation.zip`,
              ...logs
            ]);
          }
          return nextStep;
        });
      }, 300);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, step, algorithm, reward]);

  const handleGenerateTasks = () => {
    setIsSeeded(true);
    setStep(0);
    setReward(-75.0);
    setLatency(145);
    setUtilization(10);
    setLogMessages([
      `[FastAPI] Seeded 250 weighted IoT Tasks with custom constraints.`,
      `[GymEnv] Initialized environment [EdgeComputingEnv-v0]`,
      `[PyTorch] Loaded SB3-${algorithm} actor-critic networks on CPU.`
    ]);
  };

  const handleRunSimulation = () => {
    if (!isSeeded) handleGenerateTasks();
    setIsRunning(true);
    setLogMessages((logs) => [`[FastAPI] Initiating training run using ${algorithm}...`, ...logs]);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsSeeded(false);
    setStep(0);
    setReward(-50.0);
    setLatency(120);
    setUtilization(15);
    setLogMessages([]);
  };

  return (
    <div 
      id="edge-drl-demo-container" 
      style={{ padding: '1rem', color: 'var(--text-primary)' }}
    >
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: '1rem' 
        }}
      >
        <div>
          <h4 style={{ fontSize: '1.15rem', fontWeight: 700, fontFamily: 'var(--font-display)' }}>
            Deep Reinforcement Learning Simulation
          </h4>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Orchestrated via Laravel 13 & FastAPI Core
          </span>
        </div>
        
        {/* Toggle Algorithm */}
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', padding: '0.25rem', borderRadius: '8px' }}>
          <button
            id="algo-toggle-ppo"
            onClick={() => !isRunning && setAlgorithm('PPO')}
            style={{
              padding: '0.35rem 0.75rem',
              border: 'none',
              borderRadius: '6px',
              cursor: isRunning ? 'not-allowed' : 'pointer',
              background: algorithm === 'PPO' ? 'var(--color-primary)' : 'transparent',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.8rem',
              transition: 'all 0.2s',
            }}
          >
            PPO (Policy)
          </button>
          <button
            id="algo-toggle-dqn"
            onClick={() => !isRunning && setAlgorithm('DQN')}
            style={{
              padding: '0.35rem 0.75rem',
              border: 'none',
              borderRadius: '6px',
              cursor: isRunning ? 'not-allowed' : 'pointer',
              background: algorithm === 'DQN' ? 'var(--color-primary)' : 'transparent',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.8rem',
              transition: 'all 0.2s',
            }}
          >
            DQN (Value)
          </button>
        </div>
      </div>

      {/* Simulator Interface */}
      <div className="grid-2" style={{ gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Left Column: Node Allocation Visualizer */}
        <div 
          className="glass-card" 
          style={{ 
            padding: '1.25rem', 
            background: 'rgba(5, 8, 20, 0.5)', 
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.04)' 
          }}
        >
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.75rem', fontFamily: 'var(--font-mono)' }}>
            PROVISIONED EDGE NODES
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {nodes.map((node, i) => {
              // Calculate dynamic resource spikes during simulation
              const calculatedUtil = isRunning 
                ? Math.min(98, Math.max(10, utilization + (i * 12) - (step % 20))) 
                : (isSeeded ? 30 + (i * 15) : 10);
              
              return (
                <div key={node.id} id={`drl-node-${node.id}`} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Cpu size={14} style={{ color: i === 0 ? 'var(--color-primary)' : 'var(--color-secondary)' }} />
                      <span style={{ fontWeight: 600 }}>{node.name}</span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      {calculatedUtil}% util
                    </span>
                  </div>
                  
                  {/* Progress bar */}
                  <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                    <div 
                      style={{ 
                        height: '100%', 
                        width: `${calculatedUtil}%`, 
                        background: calculatedUtil > 85 ? 'var(--color-accent)' : (calculatedUtil > 60 ? 'var(--color-primary)' : 'var(--color-secondary)'),
                        transition: 'width 0.3s ease-out' 
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Training Live Stats */}
        <div 
          className="glass-card" 
          style={{ 
            padding: '1.25rem', 
            background: 'rgba(5, 8, 20, 0.5)', 
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.04)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.75rem', fontFamily: 'var(--font-mono)' }}>
            AI TRAINING METRICS
          </span>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flexGrow: 1 }}>
            {/* Steps Progress */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.2rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Activity size={12} /> Steps Progress</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>{step}%</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${step}%`, background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))', transition: 'width 0.2s' }}></div>
              </div>
            </div>

            {/* Mean Reward */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Mean Episode Reward</span>
              <span style={{ fontSize: '1rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: reward > 0 ? '#10b981' : '#f43f5e' }}>
                {reward > 0 ? `+${reward}` : reward}
              </span>
            </div>

            {/* Average Latency */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Avg Task Latency</span>
              <span style={{ fontSize: '1rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: latency < 50 ? '#10b981' : '#f59e0b' }}>
                {latency} ms
              </span>
            </div>

            {/* System Throughput */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Network Throughput</span>
              <span style={{ fontSize: '1rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--color-secondary)' }}>
                {isSeeded ? (isRunning ? `${320 + step * 4} tasks/s` : 'Idle') : 'Not Seeded'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CLI logs / Output Box */}
      <div 
        id="drl-terminal"
        style={{
          background: 'rgba(0,0,0,0.6)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: '8px',
          padding: '0.75rem',
          height: '100px',
          overflowY: 'auto',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: '#34d399',
          display: 'flex',
          flexDirection: 'column-reverse',
          gap: '0.25rem',
          marginBottom: '1.5rem',
          boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.8)'
        }}
      >
        {logMessages.length > 0 ? (
          logMessages.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))
        ) : (
          <div style={{ color: 'var(--text-muted)' }}>Console idle. Click "Generate IoT Tasks" to initialize Gymnasium environment...</div>
        )}
      </div>

      {/* Interactive Controls */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button
          id="drl-btn-seed"
          className="btn btn-secondary"
          onClick={handleGenerateTasks}
          disabled={isRunning}
          style={{
            flex: '1 1 auto',
            fontSize: '0.85rem',
            padding: '0.5rem 1rem',
            opacity: isRunning ? 0.5 : 1,
            cursor: isRunning ? 'not-allowed' : 'pointer'
          }}
        >
          <Zap size={14} style={{ color: 'var(--color-secondary)' }} />
          Generate IoT Tasks
        </button>
        <button
          id="drl-btn-run"
          className="btn btn-primary"
          onClick={handleRunSimulation}
          disabled={isRunning || step >= 100}
          style={{
            flex: '2 1 auto',
            fontSize: '0.85rem',
            padding: '0.5rem 1rem',
            opacity: (isRunning || step >= 100) ? 0.5 : 1,
            cursor: (isRunning || step >= 100) ? 'not-allowed' : 'pointer'
          }}
        >
          <Play size={14} />
          {isRunning ? 'Optimizing Matrix...' : (step >= 100 ? 'Simulation Complete' : 'Run Simulation')}
        </button>
        {(isSeeded || step > 0) && (
          <button
            id="drl-btn-reset"
            className="btn btn-secondary"
            onClick={handleReset}
            style={{
              padding: '0.5rem 0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#ef4444',
            }}
            title="Reset Simulation"
          >
            <RotateCcw size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
