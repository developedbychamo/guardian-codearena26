import { useState } from 'react';
import UserApp from './components/UserApp';
import AnalystDashboard from './components/AnalystDashboard';
import CampaignGraph from './components/CampaignGraph';

function App() {
  const [view, setView] = useState('user');

  return (
    <div className="min-h-screen">
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between bg-black">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-red-600 rounded-md flex items-center justify-center font-bold">
            G
          </div>
          <div>
            <h1 className="font-bold text-lg">Guardian</h1>
            <p className="text-xs text-gray-500">Fraud Defence System</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setView('user')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              view === 'user'
                ? 'bg-red-600 text-white'
                : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
            }`}
          >
            📱 User App
          </button>
          <button
            onClick={() => setView('analyst')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              view === 'analyst'
                ? 'bg-red-600 text-white'
                : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
            }`}
          >
            🛡️ Analyst Dashboard
          </button>
          <button
            onClick={() => setView('campaign')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              view === 'campaign'
                ? 'bg-red-600 text-white'
                : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
            }`}
          >
            🌐 Campaign View
          </button>
        </div>
      </nav>

      <main className="p-6">
        {view === 'user' && <UserApp />}
        {view === 'analyst' && <AnalystDashboard />}
        {view === 'campaign' && <CampaignGraph />}
      </main>
    </div>
  );
}

export default App;
