import React, { useState } from 'react';
import { UserCheck, Shield, Calendar, Users, Home, BookOpen, AlertTriangle } from 'lucide-react';

/**
 * SeeHostelsDemo Component
 * 
 * LEARNING POINT: State & Conditional Rendering
 * - React uses standard JS expressions to decide what UI elements to render.
 * - Here, the `activeRole` state determines which dashboard metrics, logs, and controls are shown.
 * - This showcases how simple state management can drive a highly interactive user experience.
 */
export default function SeeHostelsDemo() {
  const [activeRole, setActiveRole] = useState('Super Admin');
  const [invoiceCronStatus, setInvoiceCronStatus] = useState('Idle');
  const [invoicesLogs, setInvoicesLogs] = useState([]);

  // Role permissions definitions
  const roles = [
    { 
      name: 'Super Admin', 
      desc: 'Full platform administration & configuration', 
      permissions: ['Manage system parameters', 'Approve billing subscriptions', 'View global audit logs', 'Overrule invoice generation'],
      stats: { primary: '14 Active Admins', secondary: '99.9% API Health', color: 'var(--color-accent)' }
    },
    { 
      name: 'Owner', 
      desc: 'Hostel Registration & Room Management', 
      permissions: ['Register new hostels', 'Configure rooms & bed rates', 'Assign wardens to hostels', 'View monthly billing analytics'],
      stats: { primary: '4 Registered Hostels', secondary: '82 Bed Allocations', color: 'var(--color-primary)' }
    },
    { 
      name: 'Seeker', 
      desc: 'Student / Professional Hostel Beds searcher', 
      permissions: ['Browse local registered hostels', 'Book available hostel beds', 'Pay monthly rent invoices', 'Raise support tickets'],
      stats: { primary: '1 Bed Booked (Active)', secondary: '0 Outstanding Invoices', color: 'var(--color-secondary)' }
    },
    { 
      name: 'Finance Manager', 
      desc: 'Ledger management, payouts and billing auditing', 
      permissions: ['Audit auto-generated rent invoices', 'Process owner payouts', 'Track delinquent payments', 'Generate annual reports'],
      stats: { primary: '$45,280 Audited Monthly', secondary: '12 Overdue Notices Sent', color: '#10b981' }
    }
  ];

  const currentRoleDetails = roles.find(r => r.name === activeRole) || roles[0];

  const triggerMockInvoiceGeneration = () => {
    setInvoiceCronStatus('Running');
    setInvoicesLogs([
      `[${new Date().toLocaleTimeString()}] Running cron task 'invoices:generate'...`,
      `[Laravel Queue] Dispatching RentInvoiceJob for 412 active bookings...`,
    ]);

    setTimeout(() => {
      setInvoicesLogs(prev => [
        ...prev,
        `[Laravel Queue] Processed 412 RentInvoiceJob instances successfully.`,
        `[MySQL] Inserted 412 entries into 'invoices' database table.`,
        `[Spatie MediaLibrary] Rendered PDF invoice templates and attached to records.`,
        `[SMTP] Queued invoice emails sent via dispatch handlers.`,
        `[SUCCESS] Command 'invoices:generate' completed successfully.`
      ]);
      setInvoiceCronStatus('Completed');
    }, 1500);
  };

  return (
    <div 
      id="seehostels-demo-container" 
      style={{ padding: '1rem', color: 'var(--text-primary)' }}
    >
      <div style={{ marginBottom: '1.5rem' }}>
        <h4 style={{ fontSize: '1.15rem', fontWeight: 700, fontFamily: 'var(--font-display)' }}>
          Laravel SaaS RBAC & Scheduling Dashboard
        </h4>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          Powered by Laravel 13, Spatie Permission, and MySQL
        </span>
      </div>

      {/* Role Picker List */}
      <div 
        id="rbac-role-selector"
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', 
          gap: '0.5rem', 
          marginBottom: '1.5rem' 
        }}
      >
        {roles.map((r) => (
          <button
            key={r.name}
            id={`role-btn-${r.name.replace(/\s+/g, '-').toLowerCase()}`}
            onClick={() => setActiveRole(r.name)}
            style={{
              padding: '0.6rem 0.8rem',
              border: activeRole === r.name ? '1px solid var(--color-primary)' : '1px solid var(--border-color)',
              borderRadius: '8px',
              cursor: 'pointer',
              background: activeRole === r.name ? 'rgba(139, 92, 246, 0.12)' : 'rgba(255,255,255,0.02)',
              color: activeRole === r.name ? 'var(--color-primary)' : 'var(--text-secondary)',
              fontWeight: 600,
              fontSize: '0.8rem',
              transition: 'var(--transition-smooth)',
            }}
          >
            {r.name}
          </button>
        ))}
      </div>

      {/* Role Details Panel */}
      <div className="grid-2" style={{ gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Left Card: Role Details */}
        <div 
          className="glass-card" 
          style={{ 
            padding: '1.25rem', 
            background: 'rgba(5, 8, 20, 0.5)', 
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.04)' 
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <Shield size={16} style={{ color: currentRoleDetails.stats.color }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              ROLE SUMMARY: {currentRoleDetails.name.toUpperCase()}
            </span>
          </div>

          <p style={{ fontSize: '0.9rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
            {currentRoleDetails.desc}
          </p>

          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
            Assigned Permissions (via Spatie):
          </span>
          <ul style={{ listStyleType: 'none', paddingLeft: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            {currentRoleDetails.permissions.map((perm, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                <span style={{ width: '4px', height: '4px', background: currentRoleDetails.stats.color, borderRadius: '50%' }}></span>
                {perm}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Card: Role Metrics Simulator */}
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
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <UserCheck size={16} style={{ color: 'var(--color-secondary)' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                DYNAMIC STATE SNAPSHOT
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Operational Metric</span>
                <p style={{ fontSize: '1.25rem', fontWeight: 700, color: currentRoleDetails.stats.color }}>
                  {currentRoleDetails.stats.primary}
                </p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>System Status</span>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {currentRoleDetails.stats.secondary}
                </p>
              </div>
            </div>
          </div>
          
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '0.5rem', marginTop: '1rem' }}>
            Active Session Guard: <span style={{ color: '#34d399', fontFamily: 'var(--font-mono)' }}>laravel_session_id</span>
          </div>
        </div>
      </div>

      {/* Invoice Generation Cron Control */}
      <div 
        className="glass-card" 
        style={{ 
          padding: '1.25rem', 
          background: 'rgba(10, 15, 30, 0.7)', 
          borderRadius: '12px', 
          border: '1px solid rgba(255,255,255,0.04)' 
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={16} style={{ color: 'var(--color-primary)' }} />
            <span style={{ fontSize: '0.8rem', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
              Cron: invoices:generate (Runs 1st of month at 00:00)
            </span>
          </div>
          <button
            id="cron-btn-trigger"
            className="btn btn-secondary"
            onClick={triggerMockInvoiceGeneration}
            disabled={invoiceCronStatus === 'Running'}
            style={{
              padding: '0.4rem 0.8rem',
              fontSize: '0.75rem',
              opacity: invoiceCronStatus === 'Running' ? 0.5 : 1,
              cursor: invoiceCronStatus === 'Running' ? 'not-allowed' : 'pointer'
            }}
          >
            {invoiceCronStatus === 'Running' ? 'Executing Cron...' : 'Trigger Invoice Batch'}
          </button>
        </div>

        {/* Invoicing Logs Terminal */}
        <div 
          id="cron-terminal"
          style={{
            background: 'rgba(0,0,0,0.6)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '6px',
            padding: '0.75rem',
            height: '90px',
            overflowY: 'auto',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: '#c084fc',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
            boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.8)'
          }}
        >
          {invoicesLogs.length > 0 ? (
            invoicesLogs.map((log, index) => (
              <div key={index}>{log}</div>
            ))
          ) : (
            <div style={{ color: 'var(--text-muted)' }}>Cron console idle. Click "Trigger Invoice Batch" to simulate monthly scheduler...</div>
          )}
        </div>
      </div>
    </div>
  );
}
