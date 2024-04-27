import React, { useState, useEffect } from 'react';
import authUtils from '../../../utils/jwtRollNumber';

const BillingPage = () => {
    const [bookings, setBookings] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

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

            const response = await fetch(`http://localhost:3001/api/main/book/history/${rollnumber}`);
            if (!response.ok) {
                throw new Error('Failed to fetch booking history');
            }

            const data = await response.json();
            setBookings(data.bookings);
            calculateTotalAmount(data.bookings);
        } catch (error) {
            console.error('Error fetching bookings:', error.message);
        }
    };

    const calculateTotalAmount = (bookings) => {
        let total = 0;
        bookings.forEach((booking) => {
            if (booking.status === 'present') {
                total += 75;
            } else if (booking.status === 'absent') {
                total += 10;
            }
        });
        setTotalAmount(total);
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    return (
        <div>
            <h1>Billing History</h1>
            <table>
                <thead>
                    <tr>
                        <th>SNo.</th>
                        <th>Date</th>
                        <th>Meal Name</th>
                        <th>Price per Meal</th>
                        <th>Amount per Meal</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{new Date(booking.bookingDate).toLocaleDateString('en-GB')}</td>
                            <td>{booking.class.className}</td>
                            <td>75</td>
                            <td>{booking.status === 'present' ? `+75` : `+10 fine`}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p>Total Amount Till Date: {totalAmount} Rupees</p>
        </div>
    );
};

export default BillingPage;
