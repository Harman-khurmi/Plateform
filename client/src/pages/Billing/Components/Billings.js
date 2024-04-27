import React, { useState, useEffect } from 'react';
import authUtils from '../../../utils/jwtRollNumber';
import './billings.css';
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

    var accbal=22000;
    var totalMeals=10;
    var breakfast=3;
    var lunch=4;
    var dinner=3;
    var total=25000;
    var day=new Date();
    return (
        <>
        <div className="container1 container shadow">
      
        <div className="vertical-box">
            <div className="box shadow">
            
                <div className="vertical-box">
                <div className="heading1">Today {day.toLocaleDateString()}</div>
                <div className="flex-container">
                    <div className='flex-item'>SNo.</div>
                        {/* <span className="space4"></span> */}
                    <div className='flex-item'>Date</div>
                        {/* <span className="space4"></span> */}
                    <div className='flex-item'>Meal Name</div>
                        {/* <span className="space4"></span> */}
                    <div className='flex-item'>Price per Meal</div>
                        {/* <span className="space4"></span> */}
                    <div className='flex-item'>Amount per Meal</div>
                </div>
                <div className="flex-container">
                    <div className='flex-item'>SNo.</div>
                        {/* <span className="space4"></span> */}
                    <div className='flex-item'>Date</div>
                        {/* <span className="space4"></span> */}
                    <div className='flex-item'>Meal Name</div>
                        {/* <span className="space4"></span> */}
                    <div className='flex-item'>Price per Meal</div>
                        {/* <span className="space4"></span> */}
                    <div className='flex-item'>Amount per Meal</div>
                </div>
               
                <div className="flex-container">
                    <div className='flex-item'>SNo.</div>
                        {/* <span className="space4"></span> */}
                    <div className='flex-item'>Date</div>
                        {/* <span className="space4"></span> */}
                    <div className='flex-item'>Meal Name</div>
                        {/* <span className="space4"></span> */}
                    <div className='flex-item'>Price per Meal</div>
                        {/* <span className="space4"></span> */}
                    <div className='flex-item'>Amount per Meal</div>
                </div>
                </div>
                   
                <div className="vertical-box">
                    {bookings.map((booking, index) => (
                        <div key={index} className='flex-container'>
                            <div className='flex-item'>{index + 1}</div>
                            <div className='flex-item'>{new Date(booking.bookingDate).toLocaleDateString('en-GB')}</div>
                            <div className='flex-item'>{booking.class.className}</div>
                            <div className='flex-item'>75</div>
                            <div className='flex-item'>{booking.status === 'present' ? `+75` : `+10 fine`}</div>
                        </div>
                    ))}
                </div>
           
            </div>
            
        </div>
        <div className="blue-box">
            <h2>Account Balance</h2>
            <p style={{fontSize:50}}>Rs {accbal}</p>
            <p style={{fontSize:20, marginTop:30}}>Total meals taken: <span className="space"> </span>{totalMeals}</p>
            <div className="line"></div>
            <p style={{fontSize:20, marginTop:30}}>Breakfast Count: <span className="space"> </span>{breakfast}</p>
            <p style={{fontSize:20}}>Lunch Count: <span className="space2"> </span>{lunch}</p>
            <p style={{fontSize:20}}>Dinner Count: <span className="space3"> </span>{dinner}</p>
            <div className="d-flex justify-content-center mt-5">
            <span className="total">Total Paid: Rs {total}</span>
            </div>
        </div>
        </div>
        {/* <div>
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
        </div> */}
        </>
    );
};

export default BillingPage;
