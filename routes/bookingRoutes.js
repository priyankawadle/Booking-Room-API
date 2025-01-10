/**
 * routes/bookingRoutes.js
 *
 * Defines all routes related to hotel booking:
 * 1) Book a room
 * 2) View booking details
 * 3) View all guests
 * 4) Cancel room booking
 * 5) Modify booking
 */

const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// 1) Book a Room
router.post('/', bookingController.bookRoom);

// 2) View Booking Details
router.get('/details', bookingController.viewBookingDetails);

// 3) View All Guests in the Hotel
router.get('/guests', bookingController.viewAllGuests);

// 4) Cancel Room Booking
router.delete('/cancel', bookingController.cancelBooking);

// 5) Modify Booking
router.put('/modify', bookingController.modifyBooking);

module.exports = router;
