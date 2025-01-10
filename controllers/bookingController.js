/**
 * controllers/bookingController.js
 *
 * In-memory store for rooms and bookings. Contains the business logic
 * for each of the booking endpoints.
 */

// In-memory data store
let availableRooms = [101, 102, 103, 104, 105]; // You can extend this list as needed
let bookings = [];

/**
 * 1) Book a Room
 * POST /api/bookings
 * Body: { name, email, contact, checkIn, checkOut }
 */
exports.bookRoom = (req, res) => {
  try {
    const { name, email, contact, checkIn, checkOut } = req.body;

    // Basic validation
    if (!name || !email || !contact || !checkIn || !checkOut) {
      return res.status(400).json({ message: 'Missing required booking details.' });
    }

    // Check room availability
    if (availableRooms.length === 0) {
      return res.status(400).json({ message: 'No rooms available at the moment.' });
    }

    // Assign first available room
    const assignedRoom = availableRooms.shift();

    // Create booking entry
    const newBooking = {
      name,
      email,
      contact,
      checkIn,
      checkOut,
      roomNumber: assignedRoom
    };

    bookings.push(newBooking);

    return res.status(201).json({
      message: 'Room booked successfully!',
      bookingDetails: newBooking
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

/**
 * 2) View Booking Details
 * GET /api/bookings/details?email=<email>
 */
exports.viewBookingDetails = (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: 'Email is required to fetch details.' });
    }

    // Find booking by email
    const userBooking = bookings.find((b) => b.email === email);

    if (!userBooking) {
      return res.status(404).json({ message: 'No booking found for this email.' });
    }

    return res.status(200).json({
      message: 'Booking found.',
      bookingDetails: userBooking
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

/**
 * 3) View All Guests in the Hotel
 * GET /api/bookings/guests
 *
 * For simplicity, returns all bookings in memory.
 * In real scenarios, you might filter out those whose check-out dates are in the past.
 */
exports.viewAllGuests = (req, res) => {
  try {
    // Return all current bookings
    // Optionally, filter by date to see if they're "currently staying"
    return res.status(200).json({
      message: 'List of all guests (bookings).',
      guests: bookings
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

/**
 * 4) Cancel Room Booking
 * DELETE /api/bookings/cancel
 * Body: { email, roomNumber }
 */
exports.cancelBooking = (req, res) => {
  try {
    const { email, roomNumber } = req.body;

    if (!email || !roomNumber) {
      return res.status(400).json({ message: 'Email and room number are required.' });
    }

    const bookingIndex = bookings.findIndex(
      (b) => b.email === email && b.roomNumber === Number(roomNumber)
    );

    if (bookingIndex === -1) {
      return res.status(404).json({ message: 'Booking not found.' });
    }

    // Remove the booking
    const cancelledBooking = bookings.splice(bookingIndex, 1)[0];

    // Mark the room as available again
    availableRooms.push(cancelledBooking.roomNumber);

    return res.status(200).json({
      message: 'Booking cancelled successfully.',
      cancelledBooking
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

/**
 * 5) Modify Booking
 * PUT /api/bookings/modify
 * Body: { email, roomNumber, checkIn, checkOut } (at least one of checkIn/checkOut must be provided)
 */
exports.modifyBooking = (req, res) => {
  try {
    const { email, roomNumber, checkIn, checkOut } = req.body;

    if (!email || !roomNumber) {
      return res.status(400).json({ message: 'Email and room number are required.' });
    }

    // Find the booking
    const booking = bookings.find(
      (b) => b.email === email && b.roomNumber === Number(roomNumber)
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found.' });
    }

    // Update fields
    if (checkIn) booking.checkIn = checkIn;
    if (checkOut) booking.checkOut = checkOut;

    return res.status(200).json({
      message: 'Booking updated successfully.',
      updatedBooking: booking
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};
