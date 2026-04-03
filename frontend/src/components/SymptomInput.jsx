import { useState } from 'react';

export default function SymptomInput({ onSubmit, isLoading }) {
  const [symptoms, setSymptoms] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (symptoms.trim()) {
      onSubmit(symptoms);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <label htmlFor="symptoms"><strong>Describe your symptoms:</strong></label>
      <textarea
        id="symptoms"
        rows="4"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        placeholder="e.g., I have had a headache and mild fever since yesterday..."
        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' }}
        required
      />
      <button 
        type="submit" 
        disabled={isLoading}
        style={{ padding: '10px', backgroundColor: isLoading ? '#ccc' : '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: isLoading ? 'not-allowed' : 'pointer' }}
      >
        {isLoading ? 'Analyzing...' : 'Check Symptoms'}
      </button>
    </form>
  );
}