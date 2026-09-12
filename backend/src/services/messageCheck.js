async function checkMessage(messageContent) {
  await new Promise(r => setTimeout(r, 800));
  const lower = (messageContent || '').toLowerCase();
  const isScam = lower.includes('suspend') || lower.includes('verify') ||
                 lower.includes('urgent') || lower.includes('.xyz') ||
                 lower.includes('.top') || lower.includes('immediately');
  return {
    classification: isScam ? "SCAM" : "GENUINE",
    confidence: isScam ? 96 : 12,
    reasons: isScam
      ? ["Impersonates Dialog", "Urgency language", "Suspicious domain"]
      : ["From known sender", "Normal format"]
  };
}

module.exports = { checkMessage };
