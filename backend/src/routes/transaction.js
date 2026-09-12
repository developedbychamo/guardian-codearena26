const express = require('express');
const router = express.Router();
const { checkSimSwap } = require('../services/simCheck');
const { checkNewDevice } = require('../services/deviceCheck');
const { aggregateRisk } = require('../services/aggregator');

const cases = {};

router.post('/', async (req, res) => {
  const { user_id, amount, recipient, timestamp, device_id } = req.body;
  
  const simSwap = checkSimSwap(user_id);
  const newDevice = checkNewDevice(user_id, device_id || 'D999');
  
  const message = { classification: "SCAM", confidence: 96, reasons: ["Impersonation", "Urgency language"] };
  const behaviour = { anomaly: true, confidence: 94, reasons: ["Unusual amount", "Unknown recipient"] };
  
  const risk = aggregateRisk({ simSwap, newDevice, message, behaviour });
  
  const caseId = `CASE-${Date.now()}`;
  const caseData = {
    id: caseId,
    user_id,
    amount,
    recipient,
    timestamp,
    checks: { simSwap, newDevice, message, behaviour },
    risk,
    status: risk.action === 'HOLD' ? 'HELD' : 'COMPLETED',
    timeline: [
      { time: "09:12", event: "Scam message received", status: "flag" },
      { time: "09:18", event: "SIM swap detected", status: simSwap.flagged ? "flag" : "ok" },
      { time: "09:23", event: "New device login", status: newDevice.flagged ? "flag" : "ok" },
      { time: "09:26", event: "Transaction initiated", status: "flag" },
      { time: "09:26", event: risk.action === 'HOLD' ? "PAYMENT HELD" : "Payment processed", status: risk.action === 'HOLD' ? "danger" : "success" }
    ]
  };
  
  cases[caseId] = caseData;
  
  res.json(caseData);
});

router.get('/cases', (req, res) => {
  res.json(Object.values(cases));
});

module.exports = router;
