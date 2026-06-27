import React, { useState } from 'react';
import { Search, ChevronRight, CheckCircle, Code } from 'lucide-react';

/**
 * BugFixDemo Component
 * 
 * LEARNING POINT: Handling User Input & Lists
 * - React uses "controlled inputs" to capture text typed by users.
 * - This means we bind the `<textarea>` value to a state variable (`buggyCode`), and update it on every keystroke (`onChange`).
 * - We map over arrays to dynamically generate lists of elements, using a unique `key` prop for each item to help React's virtual DOM render efficiently.
 */
export default function BugFixDemo() {
  const [buggyCode, setBuggyCode] = useState('public void run() {\n  String s = null;\n  s.trim();\n}');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [queryTime, setQueryTime] = useState(0);

  // Preset examples for quick testing
  const presets = [
    {
      name: 'Null Pointer',
      code: 'public void run() {\n  String s = null;\n  s.trim();\n}',
      fixed: 'public void run() {\n  if (s != null) {\n    s.trim();\n  }\n}',
      commit: 'fix: null check before string operation',
      repo: 'apache/kafka',
      file: 'src/main/java/Runner.java',
      score: 42.31
    },
    {
      name: 'Resource Leak',
      code: 'public void read() throws IOException {\n  FileReader r = new FileReader("f.txt");\n  r.read();\n}',
      fixed: 'public void read() throws IOException {\n  try (FileReader r = new FileReader("f.txt")) {\n    r.read();\n  }\n}',
      commit: 'fix: close file reader using try-with-resources',
      repo: 'apache/flink',
      file: 'src/main/java/Reader.java',
      score: 38.54
    },
    {
      name: 'Index Boundary',
      code: 'public int get(int[] arr) {\n  return arr[arr.length];\n}',
      fixed: 'public int get(int[] arr) {\n  return arr[arr.length - 1];\n}',
      commit: 'fix: array index out of bounds checking',
      repo: 'google/guava',
      file: 'src/main/java/ArrayUtils.java',
      score: 35.12
    }
  ];

  const handleSelectPreset = (preset) => {
    setBuggyCode(preset.code);
    setResults([]);
  };

  const handleGetRecommendations = () => {
    setLoading(true);
    setResults([]);
    const startTime = performance.now();

    // Simulate BM25 index database lookup and network latency (FastAPI server)
    setTimeout(() => {
      // Find matches in presets or defaults
      const foundMatch = presets.find(
        (p) => p.code.replace(/\s+/g, '') === buggyCode.replace(/\s+/g, '')
      );

      const endTime = performance.now();
      setQueryTime(parseFloat((endTime - startTime + 50 + Math.random() * 20).toFixed(1)));
      setLoading(false);

      if (foundMatch) {
        setResults([
          {
            rank: 1,
            score: foundMatch.score,
            fixed_code: foundMatch.fixed,
            commit_message: foundMatch.commit,
            repo: foundMatch.repo,
            file_path: foundMatch.file
          },
          {
            rank: 2,
            score: foundMatch.score - 10.4,
            fixed_code: foundMatch.fixed.replace('run()', 'execute()'),
            commit_message: 'refactor: null safety checks on execution contexts',
            repo: 'apache/commons-lang',
            file_path: 'src/main/java/Executor.java'
          }
        ]);
      } else {
        // Generic fallback if user types custom code
        setResults([
          {
            rank: 1,
            score: 24.18,
            fixed_code: buggyCode + ' // Check for potential null or empty states!',
            commit_message: 'fix: generic defensive checks on incoming streams',
            repo: 'apache/spark',
            file_path: 'core/src/main/java/Utils.java'
          }
        ]);
      }
    }, 1000);
  };

  return (
    <div 
      id="bugfix-demo-container" 
      style={{ padding: '1rem', color: 'var(--text-primary)' }}
    >
      <div style={{ marginBottom: '1.25rem' }}>
        <h4 style={{ fontSize: '1.15rem', fontWeight: 700, fontFamily: 'var(--font-display)' }}>
          VS Code WebView Extension Simulator
        </h4>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          Powered by Python FastAPI, BM25 Index, and VS Code API
        </span>
      </div>

      {/* Preset Selector */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <span style={{ fontSize: '0.75rem', alignSelf: 'center', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>PRESETS:</span>
        {presets.map((p) => (
          <button
            key={p.name}
            id={`preset-btn-${p.name.replace(/\s+/g, '-').toLowerCase()}`}
            onClick={() => handleSelectPreset(p)}
            style={{
              padding: '0.25rem 0.6rem',
              borderRadius: '4px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              background: 'rgba(255,255,255,0.03)',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: '0.75rem',
              transition: 'var(--transition-smooth)'
            }}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="grid-2" style={{ gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Left Column: Buggy Code Editor Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="buggy-code-input" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            INPUT BUGGY JAVA CODE
          </label>
          <div style={{ position: 'relative', width: '100%', flexGrow: 1 }}>
            <textarea
              id="buggy-code-input"
              value={buggyCode}
              onChange={(e) => setBuggyCode(e.target.value)}
              style={{
                width: '100%',
                height: '140px',
                background: 'rgba(5, 8, 20, 0.9)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '0.75rem',
                color: '#e2e8f0',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                lineHeight: '1.4',
                resize: 'none',
                outline: 'none',
                boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)'
              }}
            />
          </div>
          <button
            id="bugfix-btn-recommend"
            className="btn btn-primary"
            onClick={handleGetRecommendations}
            disabled={loading}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.8rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%'
            }}
          >
            <Search size={14} />
            {loading ? 'Querying BM25 Index...' : 'Get Fix Recommendations'}
          </button>
        </div>

        {/* Right Column: WebView Results Panel */}
        <div 
          className="glass-card" 
          style={{ 
            padding: '1rem', 
            background: 'rgba(10, 15, 30, 0.8)', 
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.04)',
            height: '210px',
            overflowY: 'auto'
          }}
        >
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.75rem', fontFamily: 'var(--font-mono)' }}>
            SIDE PANEL RECOMMENDATIONS {results.length > 0 && `(${queryTime} ms)`}
          </span>

          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '120px', gap: '0.5rem' }}>
              <div className="spinner" style={{ width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.1)', borderTop: '2px solid var(--color-primary)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Searching 8555 pairs...</span>
            </div>
          ) : results.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {results.map((res) => (
                <div 
                  key={res.rank} 
                  id={`bugfix-recommendation-item-${res.rank}`}
                  style={{ 
                    border: '1px solid rgba(255,255,255,0.05)', 
                    background: 'rgba(255,255,255,0.02)', 
                    borderRadius: '6px', 
                    padding: '0.6rem' 
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem', fontSize: '0.75rem' }}>
                    <span style={{ fontWeight: 700, color: 'var(--color-secondary)' }}>Rank #{res.rank}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>Score: {res.score}</span>
                  </div>

                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', background: '#05070f', padding: '0.5rem', borderRadius: '4px', color: '#10b981', overflowX: 'auto', whiteSpace: 'pre', marginBottom: '0.4rem' }}>
                    {res.fixed_code}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><CheckCircle size={10} style={{ color: '#10b981' }} /> {res.commit_message}</span>
                    <span style={{ color: 'var(--text-muted)', paddingLeft: '0.6rem' }}>Repo: {res.repo} ({res.file_path})</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '120px', color: 'var(--text-muted)' }}>
              <Code size={24} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
              <span style={{ fontSize: '0.8rem' }}>Type buggy code or select a preset and click recommend.</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Dynamic inline spinning keyframe injected */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
