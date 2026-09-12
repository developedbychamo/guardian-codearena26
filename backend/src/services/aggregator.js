function aggregateRisk(checks) {
  let score = 0;
  let reasons = [];
  
  if (checks.simSwap && checks.simSwap.flagged) {
    score += 30;
    reasons.push("SIM swap detected in last 48 hours");
  }
  
  if (checks.newDevice && checks.newDevice.flagged) {
    score += 25;
    reasons.push("New device login detected");
  }
  
  if (checks.message && checks.message.classification === "SCAM") {
    score += 25;
    reasons.push(`Scam message detected (${checks.message.confidence}% confidence)`);
  }
  
  if (checks.behaviour && checks.behaviour.anomaly) {
    score += 20;
    reasons.push(`Behaviour anomaly (${checks.behaviour.confidence}% confidence)`);
  }
  
  const finalScore = Math.min(score, 100);
  
  return {
    score: finalScore,
    level: finalScore >= 90 ? "CRITICAL" : 
           finalScore >= 70 ? "HIGH" : 
           finalScore >= 40 ? "MEDIUM" : "LOW",
    reasons: reasons,
    action: finalScore >= 90 ? "HOLD" : 
            finalScore >= 70 ? "REVIEW" : "ALLOW"
  };
}

module.exports = { aggregateRisk };
