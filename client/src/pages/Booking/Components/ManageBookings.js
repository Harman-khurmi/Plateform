import React, { useState, useEffect } from 'react';
import authUtils from '../../../utils/jwtRollNumber';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBookings = async () => {
        try {
            const isAuthenticated = authUtils.checkAuthentication();
            let rollnumber = '';
            if (isAuthenticated) {
                rollnumber = await authUtils.fetchRollNumber();
            } else {
                authUtils.redirectToLogin();
                return;
            }

            const response = await fetch(`http://localhost:3001/api/main/book/get-bookings/${rollnumber}`);
            if (!response.ok) {
                throw new Error('Failed to fetch bookings');
            }

            const data = await response.json();
            setBookings(data.bookings);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching bookings:', error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleDeleteBooking = async (bookingId) => {
        try {
            const response = await fetch(`http://localhost:3001/api/main/book/delete-booking/${bookingId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete booking');
            }

            // Refetch bookings after deletion
            fetchBookings();
        } catch (error) {
            console.error('Error deleting booking:', error.message);
        }
    };

    return (
        <div className="bookings-container">
            <h1>My Upcoming Bookings</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {bookings.map((booking, index) => (
                        <li key={index}>
                            <p>Date: {new Date(booking.bookingDate).toLocaleDateString('en-GB')}</p>
                            <p>Meal Name: {booking.class.className}</p>
                            <button onClick={() => handleDeleteBooking(booking._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Bookings;
