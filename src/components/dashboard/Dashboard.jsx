export default function Dashboard({ onLogout }) {
  return (
    <div style={{ padding: '40px 24px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'var(--font-sans)' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--color-text-primary)' }}>Customer Dashboard</h1>
          <p style={{ color: 'var(--color-text-muted)', marginTop: '4px' }}>Welcome back, Admin!</p>
        </div>
        <button
          onClick={onLogout}
          type="button"
          style={{
            padding: '10px 18px',
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            fontWeight: '600',
            color: 'var(--color-text-secondary)',
            transition: 'var(--transition-fast)'
          }}
        >
          Sign out
        </button>
      </header>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        <div style={{ background: 'var(--color-surface)', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
          <h3 style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginBottom: '8px' }}>Total Customers</h3>
          <p style={{ fontSize: '32px', fontWeight: '800', color: 'var(--color-primary)' }}>1,248</p>
        </div>
        <div style={{ background: 'var(--color-surface)', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
          <h3 style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginBottom: '8px' }}>Active Accounts</h3>
          <p style={{ fontSize: '32px', fontWeight: '800', color: '#166534' }}>1,180</p>
        </div>
        <div style={{ background: 'var(--color-surface)', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
          <h3 style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginBottom: '8px' }}>Monthly Revenue</h3>
          <p style={{ fontSize: '32px', fontWeight: '800', color: 'var(--color-text-primary)' }}>$48,250</p>
        </div>
      </section>
    </div>
  );
}
