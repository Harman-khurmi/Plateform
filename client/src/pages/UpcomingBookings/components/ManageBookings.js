import React, { useState, useEffect } from 'react';
import authUtils from '../../../utils/jwtRollNumber';
import './manageBookings.css'
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
   
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return (
        <>
        <div className="vertical-box mt-5">
            <div className="box shadow">
            
                <div className="vertical-box">
                <div className="heading1">Today {tomorrow.toLocaleDateString()}</div>
                
                {bookings.map((booking, index) => (
                        <div key={index} className='flex-container'>
                            <div className='flex-item'>{new Date(booking.bookingDate).toLocaleDateString('en-GB')}</div>
                            <div className='flex-item'>{booking.class.className}</div>
                            <div className='flex-item'><button className="btn3" onClick={() => handleDeleteBooking(booking._id)}>Delete</button></div>
                        </div>
                    ))}
               
                
                </div>
                   
                
           
            </div>
            
        </div>
        
        </>
    );
};

export default Bookings;
