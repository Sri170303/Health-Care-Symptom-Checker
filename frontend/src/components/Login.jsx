import { useState } from 'react';

export default function Login({ onLogin }) {
  const [userId, setUserId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userId.trim()) {
      // Pass the standardized user ID back up to the main app
      onLogin(userId.trim().toLowerCase());
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', textAlign: 'center', fontFamily: 'system-ui, sans-serif', padding: '30px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
      <h2>Healthcare Symptom Checker</h2>
      <p style={{ color: '#555', marginBottom: '20px' }}>
        Please enter your User ID to access your personal history and continue your session.
      </p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="text" 
          value={userId} 
          onChange={(e) => setUserId(e.target.value)} 
          placeholder="Enter User ID (e.g., patient_123)"
          style={{ padding: '12px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px' }}
          required
        />
        <button 
          type="submit" 
          style={{ padding: '12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}
        >
          Access My Session
        </button>
      </form>
    </div>
  );
}