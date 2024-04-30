
import React, { useState, useEffect } from 'react'; 
import authUtils from '../../../utils/jwtRollNumber'; 
import './billings.css'; 
const BillingPage = () => { 
    const [bookings, setBookings] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [accbal, setAccbal] = useState(0); 
    const [totalMeals, setTotalMeals] = useState(0); 
    const [breakfastCount, setBreakfastCount] = useState(0); 
    const [lunchCount, setLunchCount] = useState(0); 
    const [dinnerCount, setDinnerCount] = useState(0); 
    const [totalPaid, setTotalPaid] = useState(0); 
 
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
            calculateBillingData(data.bookings); 
            setLoading(false); 
        } catch (error) { 
            console.error('Error fetching bookings:', error.message); 
        } 
    }; 
 
    const calculateBillingData = (bookingsData) => { 
        let totalAmount = 0; 
        let breakfast = 0; 
        let lunch = 0; 
        let dinner = 0; 
 
        bookingsData.forEach(booking => { 
            totalAmount += (booking.status === 'present' ? 75 : 10); 
            if (booking.class.className === 'breakfast') { 
                breakfast++; 
            } else if (booking.class.className === 'lunch') { 
                lunch++; 
            } else if (booking.class.className === 'dinner') { 
                dinner++; 
            } 
        }); 
 
        setAccbal(totalAmount); 
        setTotalMeals(bookingsData.length); 
        setBreakfastCount(breakfast); 
        setLunchCount(lunch); 
        setDinnerCount(dinner); 
        setTotalPaid(totalAmount); 
    }; 
 
    useEffect(() => { 
        fetchBookings(); 
    }, []); 
 
    const renderBillingData = () => { 
        let currentDate = null; 
        return bookings.map((booking, index) => { 
            const bookingDate = new Date(booking.bookingDate).toLocaleDateString('en-GB'); 
            if (bookingDate !== currentDate) { 
                currentDate = bookingDate; 
                return ( 
                    <>
                    <div key={index} className="">
                     <div className="vertical-box mt-5">
                        <div className="box shadow">
            
                        <div className="vertical-box">
                        <div className="heading1">Date: {currentDate}</div>
                        <div className="flex-container">
                            <div className="flex-item">Meal Name</div>
                            <div className="flex-item">Price per meal</div>
                            <div className="flex-item">Amount per meal</div>
                        </div>
                        
                        {bookings.map((b, i) => {
                                if (new Date(b.bookingDate).toLocaleDateString('en-GB') === currentDate){
                                    return(
                                        <div key={index} className='flex-container'>
                                        <div className='flex-item'>{b.class.className}</div>
                                        <div className='flex-item'>75</div>
                                        <div className='flex-item'>{b.status === 'present' ? +75 : `+10 fine`}</div>
                                       </div>
                                    )
                                }
                                return null;
                            })}
               
                        </div>
                   
                    </div>
            
                </div>
                </div>




                    {/* <div key={index} className="billing-day"> 
                        <div className="heading1">Date: {currentDate}</div> 
                        <table className="billing-table"> 
                            <thead> 
                                <tr> 
                                    <th>SNo.</th> 
                                    <th>Meal Name</th> 
                                    <th>Price per Meal</th> 
                                    <th>Amount per Meal</th> 
                                </tr> 
                            </thead> 
                            <tbody> 
                                {bookings.map((b, i) => { 
                                    if (new Date(b.bookingDate).toLocaleDateString('en-GB') === currentDate) { 
                                        return ( 
                                            <tr key={i}> 
                                                <td>{i + 1}</td> 
                                                <td>{b.class.className}</td> 
                                                <td>75</td> 
                                                <td>{b.status === 'present' ? +75 : `+10 fine`}</td> 
                                            </tr> 
                                        ); 
                                    } 
                                    return null;


})} 
                            </tbody> 
                        </table> 
                    </div>  */}
                    </>
                ); 
            } 
            return null; 
        }); 
    }; 
 
    return ( 
        <div className="container1 container shadow"> 
            <div className="left-pane"> 
                <div className="vertical-box"> 
                    {renderBillingData()} 
                    <p>Total Amount Till Date: {accbal} Rupees</p> 
                </div> 
            </div> 
            <div className="blue-box"> 
                <h2>Account Balance</h2> 
                <p style={{ fontSize: 50 }}>Rs {accbal}</p> 
                <p style={{ fontSize: 20, marginTop: 30 }}>Total meals taken: <span className="space"> </span>{totalMeals}</p> 
                <div className="line"></div> 
                <p style={{ fontSize: 20, marginTop: 30 }}>Breakfast Count: <span className="space"> </span>{breakfastCount}</p> 
                <p style={{ fontSize: 20 }}>Lunch Count: <span className="space2"> </span>{lunchCount}</p> 
                <p style={{ fontSize: 20 }}>Dinner Count: <span className="space3"> </span>{dinnerCount}</p> 
                {/* <div className="d-flex justify-content-center mt-5"> 
                    <span className="total">Total Paid: Rs {totalPaid}</span> 
                </div>  */}
            </div> 
        </div> 
    ); 
}; 
 
export default BillingPage;
