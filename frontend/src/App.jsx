import { useState } from 'react';
import Disclaimer from './components/Disclaimer';
import SymptomInput from './components/SymptomInput';
import ResultsDisplay from './components/ResultsDisplay';
import History from './components/History';
import Login from './components/Login';

function App() {
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('checker');
  
  // State to track the currently logged-in user
  const [currentUserId, setCurrentUserId] = useState(null);

  const handleCheckSymptoms = async (symptomsText) => {
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/check-symptoms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          session_id: currentUserId, // Use the actual User ID here!
          symptoms: symptomsText 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data from the server.');
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = () => {
    setCurrentUserId(null);
    setResults(null);
    setActiveTab('checker');
  };

  // If no user is logged in, show the Login screen
  if (!currentUserId) {
    return <Login onLogin={setCurrentUserId} />;
  }

  // Otherwise, show the main application
  return (
    <div style={{ maxWidth: '650px', margin: '40px auto', fontFamily: 'system-ui, sans-serif', padding: '20px' }}>
      
      {/* Header section with User ID and Sign Out */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '30px',
        paddingBottom: '15px',
        borderBottom: '2px solid #e2e8f0' // Adds a nice dividing line
      }}>
        <h1 style={{ 
          margin: 0, 
          fontSize: '1.8rem', 
          color: '#1e293b', // Darker slate color for the title
          whiteSpace: 'nowrap' // Prevents the title from wrapping
        }}>
          Symptom Checker
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ 
            backgroundColor: '#e2e8f0', // Light gray pill background for user
            padding: '5px 12px', 
            borderRadius: '20px',
            fontSize: '0.9rem',
            color: '#475569'
          }}>
            User: <strong style={{ color: '#0f172a' }}>{currentUserId}</strong>
          </div>
          <button 
            onClick={handleSignOut} 
            style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', transition: 'background-color 0.2s' }}
          >
            Sign Out
          </button>
        </div>
      </div>
      
      <Disclaimer />

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center' }}>
        <button 
          onClick={() => setActiveTab('checker')}
          style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: activeTab === 'checker' ? '#007bff' : '#e0e0e0', color: activeTab === 'checker' ? 'white' : 'black', border: 'none', borderRadius: '4px' }}
        >
          Check Symptoms
        </button>
        <button 
          onClick={() => setActiveTab('history')}
          style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: activeTab === 'history' ? '#007bff' : '#e0e0e0', color: activeTab === 'history' ? 'white' : 'black', border: 'none', borderRadius: '4px' }}
        >
          View History
        </button>
      </div>
      
      {activeTab === 'checker' ? (
        <>
          <SymptomInput onSubmit={handleCheckSymptoms} isLoading={isLoading} />
          {error && <div style={{ color: '#ff5252', marginTop: '15px', padding: '10px', backgroundColor: '#ffebee', borderRadius: '5px' }}>
            <strong>Error:</strong> {error}
          </div>}
          <ResultsDisplay data={results} />
        </>
      ) : (
        <History sessionId={currentUserId} />
      )}
    </div>
  );
}

export default App;