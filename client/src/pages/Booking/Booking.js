import React from 'react';
import Nav from '../../components/Navbar';
import Book from './Components/BookMeal';
import ManageBookings from './Components/ManageBookings';
import BookingHistory from './Components/BookingHistory';

export default function Booking() {
  return (
    <>
      <Nav />;
      <Book />
      <ManageBookings />
      <BookingHistory />;
    </>
  );
}
