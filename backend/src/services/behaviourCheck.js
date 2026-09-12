async function checkBehaviour(userId, transaction) {
  await new Promise(r => setTimeout(r, 800));
  const isAnomaly = transaction.amount > 10000 || transaction.recipient === 'R999';
  return {
    anomaly: isAnomaly,
    confidence: isAnomaly ? 94 : 8,
    reasons: isAnomaly
      ? ["Amount exceeds typical range", "Unknown recipient"]
      : ["Matches typical pattern"]
  };
}

module.exports = { checkBehaviour };
