import { useState, useEffect } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function AnalystDashboard() {
  const [cases, setCases] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchCases();
    const interval = setInterval(fetchCases, 2000);
    return () => clearInterval(interval);
  }, []);

  const fetchCases = async () => {
    try {
      const res = await axios.get(`${API}/api/transaction/cases`);
      setCases(res.data);
      if (res.data.length > 0 && !selected) {
        setSelected(res.data[res.data.length - 1]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold">Fraud Analyst Dashboard</h2>
        <p className="text-gray-500">Live case monitoring and investigation</p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-4 bg-gray-900 border border-gray-800 rounded-lg p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Active Cases ({cases.length})
          </h3>

          {cases.length === 0 && (
            <p className="text-sm text-gray-500 py-4">No cases yet.</p>
          )}

          <div className="space-y-2">
            {cases.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelected(c)}
                className={`w-full text-left p-3 rounded-lg border transition ${
                  selected?.id === c.id
                    ? 'bg-red-950 border-red-700'
                    : 'bg-black border-gray-800 hover:border-gray-700'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-medium text-sm">{c.user_id}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded ${
                      c.risk?.level === 'CRITICAL'
                        ? 'bg-red-600 text-white'
                        : c.risk?.level === 'HIGH'
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    {c.risk?.score}%
                  </span>
                </div>
                <p className="text-xs text-gray-500">Rs. {c.amount?.toLocaleString()}</p>
                <p className="text-xs text-gray-600 mt-1 font-mono">{c.id}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="col-span-8 space-y-6">
          {selected ? (
            <>
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Case ID</p>
                    <p className="font-mono text-lg">{selected.id}</p>
                  </div>
                  <div
                    className={`px-4 py-2 rounded-lg ${
                      selected.status === 'HELD' ? 'bg-red-600' : 'bg-green-600'
                    }`}
                  >
                    <p className="text-sm font-bold">{selected.status}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div>
                    <p className="text-xs text-gray-500">User</p>
                    <p className="font-medium">{selected.user_id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Amount</p>
                    <p className="font-medium">Rs. {selected.amount?.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Risk Score</p>
                    <p className="font-bold text-red-500">{selected.risk?.score}%</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <h3 className="font-semibold mb-4">⏱️ Attack Timeline</h3>
                <div className="space-y-3">
                  {selected.timeline?.map((item, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="flex flex-col items-center pt-1">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            item.status === 'danger'
                              ? 'bg-red-500 ring-4 ring-red-900'
                              : item.status === 'flag'
                              ? 'bg-yellow-500'
                              : 'bg-green-500'
                          }`}
                        />
                        {i < selected.timeline.length - 1 && (
                          <div className="w-0.5 h-8 bg-gray-700 mt-1" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 font-mono">{item.time}</p>
                        <p
                          className={`font-medium ${
                            item.status === 'danger'
                              ? 'text-red-400'
                              : item.status === 'flag'
                              ? 'text-yellow-300'
                              : 'text-gray-300'
                          }`}
                        >
                          {item.event}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <h3 className="font-semibold mb-4">🔍 Risk Factors</h3>
                <ul className="space-y-2">
                  {selected.risk?.reasons?.map((reason, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-red-500 mt-1">●</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-12 text-center text-gray-500">
              <p>Select a case from the left to view details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnalystDashboard;
