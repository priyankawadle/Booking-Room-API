/**
 * server.js
 *
 * Entry point for our Express application.
 */

const express = require('express');
require("dotenv").config();
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
app.use(express.json());

// Mount the booking routes at the `/api/bookings` path
app.use('/api/bookings', bookingRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Export for testing
module.exports = server;
