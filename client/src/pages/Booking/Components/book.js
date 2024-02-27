import React, { useState } from 'react';
import authUtils from '../../../utils/jwtRollNumber';

const BookingPage = () => {
    const [selectedMeals, setSelectedMeals] = useState([]);

    const classIdsByMeal = {
        breakfast: '65d488472f35b5b5192e3519', // class ID for breakfast
        lunch: '65d488f28ac01c02a4502159', // class ID for lunch
        dinner: '65d4894866852d44f86a814c', // class ID for dinner
    };

    const handleMealSelection = (meal) => {
        if (selectedMeals.includes(meal)) {
            setSelectedMeals(selectedMeals.filter(item => item !== meal));
        } else {
            setSelectedMeals([...selectedMeals, meal]);
        }
    };

    const handleBooking = async () => {
        try {
            const isAuthenticated = authUtils.checkAuthentication();

            let rollnumber = '';
            if (isAuthenticated) {
                rollnumber = await authUtils.fetchRollNumber();
            } else {
                authUtils.redirectToLogin();
                return;
            }

            const response = await fetch('https://digital-mess.vercel.app/api/main/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ rollnumber, classIds: selectedMeals.map(meal => classIdsByMeal[meal]) })

            });
            console.log(selectedMeals.map(meal => classIdsByMeal[meal]));
            console.log(rollnumber);

            if (!response.ok) {
                throw new Error('Failed to book');
            }

            const data = await response.json();
            console.log(data.message);
        } catch (error) {
            console.error('Error in booking:', error.message);
        }
    };

    return (
        <div>
            <div>
                <label>
                    <input type="checkbox" checked={selectedMeals.includes('breakfast')} onChange={() => handleMealSelection('breakfast')} />
                    Breakfast
                </label>
                <label>
                    <input type="checkbox" checked={selectedMeals.includes('lunch')} onChange={() => handleMealSelection('lunch')} />
                    Lunch
                </label>
                <label>
                    <input type="checkbox" checked={selectedMeals.includes('dinner')} onChange={() => handleMealSelection('dinner')} />
                    Dinner
                </label>
            </div>
            <button onClick={handleBooking}>Book</button>
        </div>
    );
};

export default BookingPage;
