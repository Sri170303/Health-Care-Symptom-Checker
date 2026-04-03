export default function ResultsDisplay({ data }) {
  if (!data) return null;

  // Determine severity color
  const severityColor = 
    data.severity === 'Emergency' || data.severity === 'High' ? '#d32f2f' :
    data.severity === 'Medium' ? '#ed6c02' : '#2e7d32';

  return (
    <div style={{ 
      marginTop: '20px', 
      padding: '25px', 
      border: '1px solid #ddd', 
      borderRadius: '8px', 
      backgroundColor: '#ffffff',
      color: '#333',
      textAlign: 'left'
    }}>
      
      {/* New Severity Badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3 style={{ color: '#1e293b', margin: 0 }}>Probable Conditions</h3>
        <span style={{ backgroundColor: severityColor, color: 'white', padding: '4px 10px', borderRadius: '15px', fontSize: '0.85rem', fontWeight: 'bold' }}>
          Severity: {data.severity}
        </span>
      </div>

      <ul style={{ paddingLeft: '25px', marginBottom: '25px' }}>
        {data.probable_conditions.map((condition, index) => (
          <li key={index} style={{ marginBottom: '8px', lineHeight: '1.4' }}>
            <strong>{condition}</strong>
          </li>
        ))}
      </ul>

      <h3 style={{ color: '#1976d2', marginBottom: '15px' }}>Recommended Next Steps</h3>
      <ul style={{ paddingLeft: '25px', marginBottom: '25px' }}>
        {data.next_steps.map((step, index) => (
          <li key={index} style={{ marginBottom: '10px', lineHeight: '1.6' }}>
            {step}
          </li>
        ))}
      </ul>

      {/* New Questions for Doctor Section */}
      {data.questions_for_doctor && data.questions_for_doctor.length > 0 && (
        <>
          <h3 style={{ color: '#9c27b0', marginBottom: '15px' }}>Questions for your Doctor</h3>
          <ul style={{ paddingLeft: '25px', margin: 0 }}>
            {data.questions_for_doctor.map((question, index) => (
              <li key={index} style={{ marginBottom: '10px', lineHeight: '1.6', fontStyle: 'italic' }}>
                "{question}"
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}