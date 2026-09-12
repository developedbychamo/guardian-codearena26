function CampaignGraph() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold">Scam Campaign Detection</h2>
        <p className="text-gray-500">One message. Multiple victims. Blocked at scale.</p>
      </div>

      <div className="bg-red-950 border-2 border-red-600 rounded-lg p-6 mb-8 text-center">
        <div className="text-5xl mb-3">🚨</div>
        <h3 className="text-2xl font-bold text-red-400 mb-2">SCAM CAMPAIGN DETECTED</h3>
        <p className="text-red-200">
          The same scam signature has been identified across multiple users
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-center">
          <p className="text-3xl font-bold text-red-500">7</p>
          <p className="text-xs text-gray-500 mt-1">Users Targeted</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-center">
          <p className="text-3xl font-bold text-orange-500">3</p>
          <p className="text-xs text-gray-500 mt-1">Linked Accounts</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-center">
          <p className="text-3xl font-bold text-yellow-500">11</p>
          <p className="text-xs text-gray-500 mt-1">Suspicious Transactions</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-center">
          <p className="text-3xl font-bold text-green-500">0</p>
          <p className="text-xs text-gray-500 mt-1">Money Lost</p>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-lg p-8">
        <h3 className="font-semibold mb-6 text-center">Attack Flow</h3>

        <div className="flex flex-col items-center space-y-6">
          <div className="bg-red-900 border border-red-600 rounded-lg px-6 py-3 text-center">
            <p className="text-xs text-red-300 uppercase">Scam Message</p>
            <p className="font-mono text-sm mt-1">"Your Dialog wallet is suspended..."</p>
          </div>

          <div className="flex gap-24 text-red-500">
            <div className="text-2xl">↓</div>
            <div className="text-2xl">↓</div>
            <div className="text-2xl">↓</div>
          </div>

          <div className="flex gap-6">
            {['U001', 'U003', 'U004'].map((uid, i) => (
              <div
                key={uid}
                className="bg-yellow-950 border border-yellow-700 rounded-lg px-6 py-4 text-center w-40"
              >
                <p className="font-bold text-yellow-300">{uid}</p>
                <p className="text-xs text-yellow-500 mt-1">SIM swapped</p>
                <p className="text-xs text-yellow-500">New device login</p>
                <p className="text-sm font-mono mt-2 text-red-400">
                  Rs. {[85000, 42000, 31000][i].toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <div className="flex gap-24 text-red-500">
            <div className="text-2xl">↓</div>
            <div className="text-2xl">↓</div>
            <div className="text-2xl">↓</div>
          </div>

          <div className="bg-red-800 border-2 border-red-500 rounded-lg px-8 py-4 text-center">
            <p className="text-xs text-red-300 uppercase">Campaign Aggregator · AI</p>
            <p className="font-bold text-lg mt-1">Coordinated Attack Detected</p>
            <p className="text-sm text-red-200 mt-1">Confidence: 97%</p>
          </div>

          <div className="text-2xl text-red-500">↓</div>

          <div className="bg-green-900 border-2 border-green-500 rounded-lg px-8 py-4 text-center">
            <p className="text-xs text-green-300 uppercase">Action Taken</p>
            <p className="font-bold text-lg mt-1 text-green-300">
              ✅ All payments held · Campaign blocked
            </p>
            <p className="text-sm text-green-400 mt-1">
              7 users warned · Sender blocked · Signature added to global defence
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CampaignGraph;
