// server.js

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { SerialPort } = require('serialport');
const WebSocket = require('ws');

const app = express();

// Environment variables
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;
const ARDUINO_PORT = process.env.ARDUINO_PORT;

// Security: Limit repeated requests to public APIs
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60, // limit each IP to 60 requests per windowMs
  message: 'Too many requests, please try again later.'
});

app.use(cors());
app.use('/api/', apiLimiter);
app.use(express.static('../frontend'));

// Initialize serial communication with Arduino
const arduino = new SerialPort({
  path: ARDUINO_PORT,
  baudRate: 9600
});

arduino.on('open', () => {
  console.log(`✅ Connected to Arduino on ${ARDUINO_PORT}`);
});

arduino.on('error', (err) => {
  console.error('❌ Arduino connection error:', err.message);
});

// Create HTTP server
const server = app.listen(PORT, () => {
  console.log(`🌐 Server is running at http://localhost:${PORT}`);
});

// Initialize WebSocket server
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws, req) => {
  const ip = req.socket.remoteAddress;
  console.log(`🔌 New WebSocket connection from ${ip}`);

  ws.on('close', () => {
    console.log(`🔌 WebSocket disconnected: ${ip}`);
  });
});

// Broadcast relay status to all connected clients
function broadcastRelayStatus(relayId, state) {
  const message = JSON.stringify({
    type: 'relay',
    id: relayId,
    state: state
  });

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// API route to control relays
app.get('/api/relay/:relayId/:action', (req, res) => {
  const { relayId, action } = req.params;
  const { apiKey } = req.query;

  if (apiKey !== API_KEY) {
    console.warn(`⚠️ Unauthorized access attempt from ${req.ip}`);
    return res.status(401).send('Unauthorized');
  }

  if (!['on', 'off'].includes(action)) {
    return res.status(400).send('Invalid action');
  }

  const command = `R${relayId}_${action.toUpperCase()}\n`;

  arduino.write(command, (err) => {
    if (err) {
      console.error('❌ Failed to send command to Arduino:', err.message);
      return res.status(500).send('Failed to communicate with Arduino');
    }

    console.log(`📌 Command executed: ${command.trim()}`);
    broadcastRelayStatus(relayId, action);
    res.send('OK');
  });
});
