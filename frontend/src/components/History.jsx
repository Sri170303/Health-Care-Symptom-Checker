import { useState, useEffect } from 'react';

export default function History({ sessionId }) {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!sessionId) return; 

      setIsLoading(true);
      try {
        // Fetch data specifically for the logged-in user
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
  }, [sessionId]); // Re-run the fetch if the user ID changes

  if (isLoading) return <div>Loading history...</div>;
  if (error) return <div style={{ color: '#ff5252' }}>Error: {error}</div>;
  if (history.length === 0) return <div>No history found for user <strong>{sessionId}</strong>. Try checking some symptoms first!</div>;

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Recent Queries</h2>
      {history.map((record) => (
        <div key={record.id} style={{ 
          border: '1px solid #ccc', 
          borderRadius: '8px', 
          padding: '15px', 
          marginBottom: '15px',
          backgroundColor: '#fff',
          textAlign: 'left'
        }}>
          <p style={{ fontSize: '0.9em', color: '#666', margin: '0 0 10px 0' }}>
            {new Date(record.timestamp).toLocaleString()}
          </p>
          <p><strong>Symptoms:</strong> {record.symptoms}</p>
          
          <div style={{ marginTop: '10px', padding: '15px', backgroundColor: '#f0f7ff', borderRadius: '4px' }}>
            <strong style={{ color: '#1976d2' }}>Probable Conditions:</strong>
            <ul style={{ margin: '5px 0 0 0', paddingLeft: '25px' }}>
              {record.response?.probable_conditions?.map((cond, i) => (
                <li key={i} style={{ marginBottom: '5px' }}>{cond}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}