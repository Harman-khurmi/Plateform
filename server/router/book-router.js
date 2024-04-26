const express = require('express');
const router = express.Router();
const bookcontrollers = require('../controllers/book-controller');

router.route('/book').post(bookcontrollers.booking);
router.route('/book/get-bookings/:rollnumber').get(bookcontrollers.getBooking)

module.exports = router;
