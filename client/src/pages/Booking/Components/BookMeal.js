import React, { useState, useEffect } from 'react';
import authUtils from '../../../utils/jwtRollNumber';
import './BookMeal.css';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [showRightBox, setShowRightBox] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedMeals, setSelectedMeals] = useState([]);
    const classIdsByMeal = {
        breakfast: '65d488472f35b5b5192e3519', // class ID for breakfast
        lunch: '65d488f28ac01c02a4502159', // class ID for lunch
        dinner: '65d4894866852d44f86a814c', // class ID for dinner
    };

    useEffect(() => {
        setCurrentDate(new Date());
    }, []);

    const handlePrevMonth = () => {
        setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
    };

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const today = new Date().getDate();

    const getMonthName = (monthIndex) => {
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return monthNames[monthIndex];
    };

    const renderCalendarDays = () => {
        const days = [];
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            const isFutureDate = i > today || currentDate.getMonth() > new Date().getMonth();
            const isToday = i === today && currentDate.getMonth() === new Date().getMonth();

            const handleClick = () => {
                if (isFutureDate) {
                    setShowRightBox(true);
                    setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), i)); // Set selected date
                }
            };
            days.push(
                <div
                    key={`day-${i}`}
                    className={`calendar-day${isToday ? ' today' : ''}${isFutureDate ? ' future' : ''}`}
                    onClick={handleClick}
                >
                    {i}
                </div>
            );
        }
        return days;
    };

    const handleCheckboxChange = (meal) => {
        if (selectedMeals.includes(meal)) {
            setSelectedMeals(selectedMeals.filter(item => item !== meal));
        } else {
            setSelectedMeals([...selectedMeals, meal]);
        }
    };

    const handleSubmit = async () => {
        try {
            const isAuthenticated = authUtils.checkAuthentication();

            let rollnumber = '';
            if (isAuthenticated) {
                rollnumber = await authUtils.fetchRollNumber();
            } else {
                authUtils.redirectToLogin();
                return;
            }

            const response = await fetch('http://localhost:3001/api/main/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ rollnumber, classIds: selectedMeals.map(meal => classIdsByMeal[meal]), bookingDate: selectedDate })

            });

            if (!response.ok) {
                throw new Error('Failed to book');
            }

            const data = await response.json();
            setShowRightBox(false);
            alert(data.message);
        } catch (error) {
            console.error('Error in booking:', error.message);
        }
    };

    return (
        <div className="calendar-container">
            <div className="calendar">
                <div className="calendar-header">
                    <button onClick={handlePrevMonth}>&lt;</button>
                    <h1>{getMonthName(currentDate.getMonth())} {currentDate.getFullYear()}</h1>
                    <button onClick={handleNextMonth}>&gt;</button>
                </div>
                <div className="calendar-grid">
                    <div className="calendar-day">Sun</div>
                    <div className="calendar-day">Mon</div>
                    <div className="calendar-day">Tue</div>
                    <div className="calendar-day">Wed</div>
                    <div className="calendar-day">Thu</div>
                    <div className="calendar-day">Fri</div>
                    <div className="calendar-day">Sat</div>
                    {renderCalendarDays()}
                </div>
            </div>
            {showRightBox && (
                <div className="right-box" style={{marginTop:15}}>
                    <div className="right-box-header">
                        <h5>{selectedDate ? selectedDate.toDateString() : ''}<button classNmae="ms-4" onClick={() => setShowRightBox(false)} style={{padding:1, borderRadius:10, marginLeft:50}}>  &#10004;</button></h5>
                        
                    </div>
                    <div className="right-box-content">
                        <label className='flex-space'>
                            <input
                                type="checkbox"
                                name="breakfast"
                                checked={selectedMeals.includes('breakfast')}
                                onChange={() => handleCheckboxChange('breakfast')}
                            />
                            Breakfast
                        </label>
                        <label className='flex-space'>
                            <input
                                type="checkbox"
                                name="lunch"
                                checked={selectedMeals.includes('lunch')}
                                onChange={() => handleCheckboxChange('lunch')}
                            />
                            Lunch
                        </label>
                        <label className='flex-space'>
                            <input
                                type="checkbox"
                                name="dinner"
                                checked={selectedMeals.includes('dinner')}
                                onChange={() => handleCheckboxChange('dinner')}
                            />
                            Dinner
                        </label>
                        <button onClick={handleSubmit} className="btn3" style={{marginTop:10, padding:1, borderRadius:10, marginLeft:75}}>Submit</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendar;
