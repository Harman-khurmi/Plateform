import React, { useState, useEffect } from 'react';
import authUtils from '../../../utils/jwtRollNumber';

const BookingHistory = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    const fetchBookings = async (status = 'All') => {
        try {
            const isAuthenticated = authUtils.checkAuthentication();
            let rollnumber = '';
            if (isAuthenticated) {
                rollnumber = await authUtils.fetchRollNumber();
            } else {
                authUtils.redirectToLogin();
                return;
            }

            const response = await fetch(`http://localhost:3001/api/main/book/history/${rollnumber}?status=${status}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch booking history');
            }

            const data = await response.json();
            setBookings(data.bookings);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching booking history:', error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings(filter);
    }, [filter]);

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    return (
        <div>
            <h1>Booking History</h1>
            <div>
                <label>Filter:</label>
                <select value={filter} onChange={handleFilterChange}>
                    <option value="All">All</option>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                </select>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {bookings.map((booking, index) => (
                        <li key={index}>
                            <p>Date: {new Date(booking.bookingDate).toLocaleDateString('en-GB')}</p>
                            <p>Meal: {booking.class.className}</p>
                            <p>Status: {booking.status}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BookingHistory;
