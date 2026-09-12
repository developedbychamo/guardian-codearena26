import { useState, useEffect } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function UserApp() {
  const [currentCase, setCurrentCase] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(fetchLatestCase, 2000);
    return () => clearInterval(interval);
  }, []);

  const fetchLatestCase = async () => {
    try {
      const res = await axios.get(`${API}/api/transaction/cases`);
      if (res.data.length > 0) {
        setCurrentCase(res.data[res.data.length - 1]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const triggerAttack = async () => {
    setLoading(true);
    try {
      await axios.post(`${API}/api/transaction`, {
        user_id: 'U001',
        amount: 85000,
        recipient: 'R999',
        timestamp: '2026-09-11T09:26:00',
        device_id: 'D999',
      });
      setTimeout(fetchLatestCase, 2500);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Guardian Wallet</h2>
        <p className="text-gray-500">Your personal fraud bodyguard</p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 text-center">
        <p className="text-sm text-gray-400 mb-4">
          Demo Controls — inject the scam sequence
        </p>
        <button
          onClick={triggerAttack}
          disabled={loading}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 rounded-lg font-semibold transition"
        >
          {loading ? '⏳ Processing attack...' : '🔥 Simulate Fraud Attack'}
        </button>
      </div>

      {currentCase && (
        <>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <p className="text-xs text-gray-500 uppercase mb-2">Transaction Detected</p>
            <div className="flex items-baseline justify-between">
              <div>
                <p className="text-3xl font-bold">Rs. {currentCase.amount?.toLocaleString()}</p>
                <p className="text-sm text-gray-400 mt-1">
                  To: {currentCase.recipient === 'R999' ? '⚠️ Unknown Recipient' : 'Known Contact'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">User</p>
                <p className="font-medium">{currentCase.user_id}</p>
              </div>
            </div>
          </div>

          <div
            className={`rounded-lg p-6 border-2 ${
              currentCase.status === 'HELD'
                ? 'bg-red-950 border-red-500'
                : 'bg-green-950 border-green-500'
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="text-4xl">
                {currentCase.status === 'HELD' ? '🔴' : '✅'}
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {currentCase.status === 'HELD' ? 'PAYMENT HELD' : 'Payment Processed'}
                </p>
                <p className="text-sm text-gray-400">
                  {currentCase.status === 'HELD'
                    ? 'Protected before money left the wallet.'
                    : 'Transaction completed.'}
                </p>
              </div>
            </div>

            <div className="bg-black rounded-lg p-4 mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Risk Score</span>
                <span className="text-3xl font-bold text-red-500">
                  {currentCase.risk?.score}%
                </span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-red-500 h-full transition-all duration-500"
                  style={{ width: `${currentCase.risk?.score}%` }}
                />
              </div>
              <p className="text-xs text-red-400 font-medium mt-2">
                {currentCase.risk?.level} RISK — {currentCase.risk?.action}
              </p>
            </div>
          </div>

          {currentCase.risk?.reasons && (
            <div className="bg-yellow-950 border border-yellow-700 rounded-lg p-6">
              <p className="font-semibold mb-3 text-yellow-200">Why was this flagged?</p>
              <ul className="space-y-2">
                {currentCase.risk.reasons.map((reason, i) => (
                  <li key={i} className="text-sm text-yellow-100 flex gap-2">
                    <span>•</span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

      {!currentCase && (
        <div className="text-center py-12 text-gray-500">
          <p>No active case. Click "Simulate Fraud Attack" to trigger the demo.</p>
        </div>
      )}
    </div>
  );
}

export default UserApp;
