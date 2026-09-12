const users = require('../../../mock-data/users.json');

function checkNewDevice(userId, deviceId) {
  const user = users.find(u => u.id === userId);
  if (!user) return { flagged: false, reason: null, confidence: 0 };
  
  const knownDevices = user.devices.map(d => d.id);
  const isNew = !knownDevices.includes(deviceId);
  
  return {
    flagged: isNew,
    reason: isNew ? "New device login" : null,
    confidence: 1.0
  };
}

module.exports = { checkNewDevice };
