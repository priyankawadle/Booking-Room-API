/**
 * test/booking.test.js
 *
 * Simple Mocha + Chai + Chai-HTTP tests for our booking API.
 */

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const server = require('../server');

chai.use(chaiHttp);

describe('Booking APIs', () => {
  // We'll store data we need across tests (like email, roomNumber, etc.)
  let testBooking = {
    name: 'Test User',
    email: 'testuser@example.com',
    contact: '1234567890',
    checkIn: '2025-01-12',
    checkOut: '2025-01-15'
  };

  let assignedRoomNumber;

  // 1) Test Booking a Room
  it('should book a room successfully', (done) => {
    chai
      .request(server)
      .post('/api/bookings')
      .send(testBooking)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('message', 'Room booked successfully!');
        expect(res.body.bookingDetails).to.have.property('roomNumber');
        assignedRoomNumber = res.body.bookingDetails.roomNumber; // store assigned room
        done();
      });
  });

  // 2) Test Viewing Booking Details
  it('should retrieve booking details for the user', (done) => {
    chai
      .request(server)
      .get('/api/bookings/details')
      .query({ email: testBooking.email })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.bookingDetails).to.have.property('email', testBooking.email);
        done();
      });
  });

  // 3) Test Viewing All Guests
  it('should list all guests (bookings)', (done) => {
    chai
      .request(server)
      .get('/api/bookings/guests')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('guests').that.is.an('array');
        done();
      });
  });

  // 4) Test Modifying Booking
  it('should modify the booking check-out date', (done) => {
    const newCheckOutDate = '2025-01-20';
    chai
      .request(server)
      .put('/api/bookings/modify')
      .send({
        email: testBooking.email,
        roomNumber: assignedRoomNumber,
        checkOut: newCheckOutDate
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.updatedBooking).to.have.property('checkOut', newCheckOutDate);
        done();
      });
  });

  // 5) Test Canceling Booking
  it('should cancel the booking successfully', (done) => {
    chai
      .request(server)
      .delete('/api/bookings/cancel')
      .send({
        email: testBooking.email,
        roomNumber: assignedRoomNumber
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'Booking cancelled successfully.');
        done();
      });
  });
});
