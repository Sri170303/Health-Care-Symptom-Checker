export default function ResultsDisplay({ data }) {
  if (!data) return null;

  return (
    <div style={{ 
      marginTop: '20px', 
      padding: '25px', 
      border: '1px solid #ddd', 
      borderRadius: '8px', 
      backgroundColor: '#f9f9f9',
      color: '#333',
      textAlign: 'left' // This fixes the centered text issue
    }}>
      <h3 style={{ color: '#d32f2f', marginTop: 0, marginBottom: '15px' }}>Probable Conditions</h3>
      <ul style={{ paddingLeft: '25px', marginBottom: '25px' }}>
        {data.probable_conditions.map((condition, index) => (
          <li key={index} style={{ marginBottom: '8px', lineHeight: '1.4' }}>
            <strong>{condition}</strong>
          </li>
        ))}
      </ul>

      <h3 style={{ color: '#1976d2', marginBottom: '15px' }}>Recommended Next Steps</h3>
      <ul style={{ paddingLeft: '25px', margin: 0 }}>
        {data.next_steps.map((step, index) => (
          <li key={index} style={{ marginBottom: '10px', lineHeight: '1.6' }}>
            {step}
          </li>
        ))}
      </ul>
    </div>
  );
}