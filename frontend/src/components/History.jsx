import { useState, useEffect } from 'react';

export default function History({ sessionId }) {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // New state to track which history cards are expanded
  const [expandedItems, setExpandedItems] = useState({});

  useEffect(() => {
    const fetchHistory = async () => {
      if (!sessionId) return; 

      setIsLoading(true);
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/history/${sessionId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch history');
        }
        const data = await response.json();
        setHistory(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [sessionId]);

  // Toggle function to open/close specific records
  const toggleExpand = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id] // Flips true to false, or false to true
    }));
  };

  if (isLoading) return <div>Loading history...</div>;
  if (error) return <div style={{ color: '#ff5252' }}>Error: {error}</div>;
  if (history.length === 0) return <div>No history found for user <strong>{sessionId}</strong>. Try checking some symptoms first!</div>;

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Recent Queries</h2>
      {history.map((record) => {
        const severity = record.response?.severity;
        const severityColor = 
          severity === 'Emergency' || severity === 'High' ? '#d32f2f' :
          severity === 'Medium' ? '#ed6c02' : 
          severity === 'Low' ? '#2e7d32' : '#666';
          
        const isExpanded = expandedItems[record.id]; // Check if this specific card is open

        return (
          <div key={record.id} style={{ 
            border: '1px solid #ccc', 
            borderRadius: '8px', 
            padding: '15px', 
            marginBottom: '15px',
            backgroundColor: '#fff',
            textAlign: 'left',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}>
            
            {/* Header: Date & Severity */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <p style={{ fontSize: '0.9em', color: '#666', margin: 0 }}>
                {new Date(record.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
              </p>
              {severity && (
                <span style={{ backgroundColor: severityColor, color: 'white', padding: '4px 10px', borderRadius: '15px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                  {severity}
                </span>
              )}
            </div>
            
            {/* Always Visible: Symptoms & Conditions */}
            <p style={{ marginBottom: '15px' }}><strong>Symptoms:</strong> {record.symptoms}</p>
            
            <div style={{ padding: '10px 15px', backgroundColor: '#f8fafc', borderRadius: '4px', borderLeft: '4px solid #1976d2' }}>
              <strong style={{ color: '#1976d2' }}>Probable Conditions:</strong>
              <ul style={{ margin: '5px 0 0 0', paddingLeft: '25px' }}>
                {record.response?.probable_conditions?.map((cond, i) => (
                  <li key={i} style={{ marginBottom: '5px' }}>{cond}</li>
                ))}
              </ul>
            </div>

            {/* Expand/Collapse Button */}
            <button 
              onClick={() => toggleExpand(record.id)}
              style={{ 
                marginTop: '15px', 
                padding: '8px 12px', 
                backgroundColor: 'transparent', 
                color: '#007bff', 
                border: '1px solid #007bff', 
                borderRadius: '4px', 
                cursor: 'pointer',
                fontWeight: 'bold',
                width: '100%',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#f0f7ff'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              {isExpanded ? 'Hide Details ▲' : 'View Next Steps & Questions ▼'}
            </button>

            {/* Hidden Content: Only shows if 'isExpanded' is true */}
            {isExpanded && (
              <div style={{ marginTop: '15px', padding: '15px', backgroundColor: '#f0f7ff', borderRadius: '4px', animation: 'fadeIn 0.3s' }}>
                
                {record.response?.next_steps && (
                  <>
                    <strong style={{ color: '#d32f2f' }}>Recommended Next Steps:</strong>
                    <ul style={{ margin: '5px 0 15px 0', paddingLeft: '25px' }}>
                      {record.response.next_steps.map((step, i) => (
                        <li key={i} style={{ marginBottom: '5px' }}>{step}</li>
                      ))}
                    </ul>
                  </>
                )}

                {record.response?.questions_for_doctor && record.response.questions_for_doctor.length > 0 && (
                  <>
                    <strong style={{ color: '#9c27b0' }}>Questions for your Doctor:</strong>
                    <ul style={{ margin: '5px 0 0 0', paddingLeft: '25px' }}>
                      {record.response.questions_for_doctor.map((question, i) => (
                        <li key={i} style={{ marginBottom: '5px', fontStyle: 'italic' }}>"{question}"</li>
                      ))}
                    </ul>
                  </>
                )}
                
              </div>
            )}
            
          </div>
        );
      })}
    </div>
  );
}