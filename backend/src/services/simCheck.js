const simChanges = require('../../../mock-data/sim_changes.json');

function checkSimSwap(userId) {
  const swaps = simChanges.filter(s => s.user_id === userId);
  const now = new Date('2026-09-11T09:26:00');
  const recent = swaps.filter(s => {
    const hoursSince = (now - new Date(s.timestamp)) / 3600000;
    return hoursSince < 48;
  });
  
  return {
    flagged: recent.length > 0,
    reason: recent.length > 0 ? "SIM replaced in last 48 hours" : null,
    confidence: 1.0,
    details: recent[0] || null
  };
}

module.exports = { checkSimSwap };
