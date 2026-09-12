const express = require('express');
const router = express.Router();
const { checkSimSwap } = require('../services/simCheck');
const { checkNewDevice } = require('../services/deviceCheck');
const { checkMessage } = require('../services/messageCheck');
const { checkBehaviour } = require('../services/behaviourCheck');
const { aggregateRisk } = require('../services/aggregator');
const messages = require('../../../mock-data/messages.json');

const cases = {};

router.post('/', async (req, res) => {
  const { user_id, amount, recipient, timestamp, device_id } = req.body;

  // System checks (sync)
  const simSwap = checkSimSwap(user_id);
  const newDevice = checkNewDevice(user_id, device_id || 'D999');

  // Find the scam message for this user
  const userMessage = messages.find(m => m.user_id === user_id);
  const messageContent = userMessage ? userMessage.content : '';

  // AI checks (async, run in parallel)
  const [message, behaviour] = await Promise.all([
    checkMessage(messageContent),
    checkBehaviour(user_id, { amount, recipient, timestamp })
  ]);

  // Aggregate
  const risk = aggregateRisk({ simSwap, newDevice, message, behaviour });

  // Build case
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
