import React, { useState, useEffect } from 'react';
import authUtils from '../../../utils/jwtRollNumber';
// import './Bookings.css';

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
            console.log(data.bookings)
        } catch (error) {
            console.error('Error fetching bookings:', error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    return (
        <div className="bookings-container">
            <h1>My Bookings</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {bookings
                        .sort((a, b) => {
                            // Convert date strings to Date objects for comparison
                            const dateA = new Date(a.date);
                            const dateB = new Date(b.date);
                            // Compare dates
                            if (dateA < dateB) return -1;
                            if (dateA > dateB) return 1;
                        })
                        .map((booking, index) => (
                            <li key={index}>
                                <p>Date: {new Date(booking.bookingDate).toLocaleDateString('en-GB')}</p>
                                <p>Meal Name: {booking.class.className}</p>
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
};

export default Bookings;
