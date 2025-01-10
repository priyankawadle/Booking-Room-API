# Booking-Room-API

A simple **Node.js** and **Express** application for booking hotel rooms, viewing and modifying bookings, and canceling bookings. Data is stored **in-memory** for demonstration and testing purposes.

---

## Table of Contents

1. [Overview](#overview)  
2. [Project Structure](#project-structure)  
3. [Prerequisites](#prerequisites)  
4. [Installation](#installation)  
5. [Running the Server](#running-the-server)  
6. [API Endpoints](#api-endpoints)  
   - [1) Book a Room](#1-book-a-room)  
   - [2) View Booking Details](#2-view-booking-details)  
   - [3) View All Guests](#3-view-all-guests)  
   - [4) Cancel Room Booking](#4-cancel-room-booking)  
   - [5) Modify Booking](#5-modify-booking)  
7. [Running Tests](#running-tests) 

---

## Overview

This application demonstrates a basic room-booking functionality:

- **Book a room**: Automatically assigns an available room based on in-memory storage.  
- **View a booking**: Fetch booking details by the guest’s email address.  
- **View all guests**: See every guest that has booked a room (in-memory).  
- **Cancel a booking**: Free up the room by removing a booking from in-memory.  
- **Modify a booking**: Change the check-in or check-out date for a booking.  

> **Note**: Since data is stored in-memory, every time the server restarts, previously created bookings are lost.

---

## Project Structure

```
.
├── controllers
│   └── bookingController.js       # Business logic and in-memory data
├── routes
│   └── bookingRoutes.js           # Defines Express routes
├── test
│   └── booking.test.js            # Mocha + Chai test file
├── server.js                      # Entry point for the Express server
├── package.json                   # Dependencies and scripts
└── README.md                      # Project documentation (this file)
```

---

## Prerequisites

1. **Node.js** (v14+ recommended)  
2. **npm** (comes with Node.js)

---

## Installation

1. **Clone or Download** the repository.
   ```bash
   git clone https://github.com/priyankawadle/Booking-Room-API.git
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
   This will install **Express**, **Mocha**, **Chai**, **Chai-HTTP**, **Dotenv** and other required packages.

---

## Running the Server

1. **Start the Server**:
   ```bash
   npm run dev
   ```
   or
   ```bash
   node server.js
   ```
   
2. By default, the server runs on **port 3000**. You can access the endpoints at `http://localhost:3000/api/bookings`.

---

## API Endpoints

The base path for all routes is:  
```
http://localhost:3000/api/bookings
```

### 1) **Book a Room**  
- **Method**: `POST`  
- **Endpoint**: `/api/bookings`  
- **Request Body**:  
  ```json
  {
    "name": "string",
    "email": "string",
    "contact": "string",
    "checkIn": "YYYY-MM-DD",
    "checkOut": "YYYY-MM-DD"
  }
  ```
- **Response**:  
  ```json
  {
    "message": "Room booked successfully!",
    "bookingDetails": {
      "name": "string",
      "email": "string",
      "contact": "string",
      "checkIn": "YYYY-MM-DD",
      "checkOut": "YYYY-MM-DD",
      "roomNumber": 101
    }
  }
  ```
- **Description**:  
  Creates a new booking by assigning the first available room from an in-memory list.

---

### 2) **View Booking Details**  
- **Method**: `GET`  
- **Endpoint**: `/api/bookings/details?email=<email>`  
- **URL Example**: `/api/bookings/details?email=testuser@example.com`  
- **Response**:  
  ```json
  {
    "message": "Booking found.",
    "bookingDetails": {
      "name": "string",
      "email": "string",
      "contact": "string",
      "checkIn": "YYYY-MM-DD",
      "checkOut": "YYYY-MM-DD",
      "roomNumber": 101
    }
  }
  ```
- **Description**:  
  Retrieves booking information for a given email. Returns `404` if the booking is not found.

---

### 3) **View All Guests**  
- **Method**: `GET`  
- **Endpoint**: `/api/bookings/guests`  
- **Response**:  
  ```json
  {
    "message": "List of all guests (bookings).",
    "guests": [
      {
        "name": "string",
        "email": "string",
        "contact": "string",
        "checkIn": "YYYY-MM-DD",
        "checkOut": "YYYY-MM-DD",
        "roomNumber": 101
      }
      // ...more guests
    ]
  }
  ```
- **Description**:  
  Returns a list of all active (in-memory) bookings. In real scenarios, you might filter out guests who have already checked out.

---

### 4) **Cancel Room Booking**  
- **Method**: `DELETE`  
- **Endpoint**: `/api/bookings/cancel`  
- **Request Body**:  
  ```json
  {
    "email": "string",
    "roomNumber": 101
  }
  ```
- **Response**:  
  ```json
  {
    "message": "Booking cancelled successfully.",
    "cancelledBooking": {
      "name": "string",
      "email": "string",
      "contact": "string",
      "checkIn": "YYYY-MM-DD",
      "checkOut": "YYYY-MM-DD",
      "roomNumber": 101
    }
  }
  ```
- **Description**:  
  Cancels a booking and re-adds the room to the pool of available rooms.

---

### 5) **Modify Booking**  
- **Method**: `PUT`  
- **Endpoint**: `/api/bookings/modify`  
- **Request Body** (example):
  ```json
  {
    "email": "string",
    "roomNumber": 101,
    "checkIn": "YYYY-MM-DD",
    "checkOut": "YYYY-MM-DD"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Booking updated successfully.",
    "updatedBooking": {
      "name": "string",
      "email": "string",
      "contact": "string",
      "checkIn": "YYYY-MM-DD",
      "checkOut": "YYYY-MM-DD",
      "roomNumber": 101
    }
  }
  ```
- **Description**:  
  Updates the guest’s check-in or check-out date (or both). Returns `404` if the booking doesn’t exist.

---

## Running Tests

This project uses **Mocha**, **Chai**, and **Chai-HTTP** for testing. You’ll find the tests inside the `test/booking.test.js` file.

1. **Start the server** (in a separate terminal tab or window):
   ```bash
   npm start
   ```
   
2. **Run the Tests**:
   ```bash
   npm test
   ```
   The tests will:  
   - Book a room  
   - Retrieve booking details  
   - List all guests  
   - Modify a booking  
   - Cancel the booking  

---
