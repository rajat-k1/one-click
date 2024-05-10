"use client"; // Ensure this is a Client Component if it uses client-specific features

export default function HomePage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>
        <h1>Welcome to OneClick</h1>
        <p>This is now your main dashboard page. Accessible to all visitors.</p>
      </div>
    </div>
  );
}