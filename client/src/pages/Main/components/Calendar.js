// import React, { useState } from 'react';
// import './Calendar.css'; // You can create this CSS file for styling
// import bg from './bg1.jpg';
// import authUtils from '../../../utils/jwtRollNumber';


// const Calendar = () => {
//   const [selectedMeals, setSelectedMeals] = useState([]);
//   const classIdsByMeal = {
//     breakfast: '65d488472f35b5b5192e3519', // class ID for breakfast
//     lunch: '65d488f28ac01c02a4502159', // class ID for lunch
//     dinner: '65d4894866852d44f86a814c', // class ID for dinner
//   };
//   const currentDate = new Date();
//   const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
//   const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [optionsOpen, setOptionsOpen] = useState(false);
//   const [optionsOpen2, setOptionsOpen2] = useState(false);
//   const [optionsOpen3, setOptionsOpen3] = useState(false);
//   const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
//   const firstDay = new Date(currentYear, currentMonth, 1).getDay();

//   const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

//   const monthNames = [
//     'January', 'February', 'March', 'April',
//     'May', 'June', 'July', 'August',
//     'September', 'October', 'November', 'December'
//   ];

//   let days = [];

//   for (let i = 0; i < firstDay; i++) {
//     days.push(
//       <div key={`empty-${i}`} className="day empty">
//         {''}
//       </div>
//     );
//   }

//   for (let i = 1; i <= daysInMonth; i++) {
//     const isSelected = selectedDate === i;
//     const isCurrent = currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear() && i === currentDate.getDate();
//     const isFuture = (currentYear === currentDate.getFullYear() && currentMonth === currentDate.getMonth() && i > currentDate.getDate()) ||
//       (currentYear === currentDate.getFullYear() && currentMonth > currentDate.getMonth()) ||
//       (currentYear > currentDate.getFullYear());

//     days.push(
//       <div
//         key={`day-${i}`}
//         className={`day ${isSelected ? 'selected' : ''} ${isCurrent ? 'current' : ''}`}
//         onClick={() => handleDateClick(i)}
//       >
//         {i}
//         {isFuture && <div className="future-indicator"></div>} {/* Indicator for future date */}
//       </div>
//     );
//   }

//   const nextMonth = () => {
//     if (currentMonth === 11) {
//       setCurrentMonth(0);
//       setCurrentYear(currentYear + 1);
//     } else {
//       setCurrentMonth(currentMonth + 1);
//     }
//   };

//   const prevMonth = () => {
//     if (currentMonth === 0) {
//       setCurrentMonth(11);
//       setCurrentYear(currentYear - 1);
//     } else {
//       setCurrentMonth(currentMonth - 1);
//     }
//   };

//   const handleDateClick = (day) => {
//     const clickedDate = new Date(currentYear, currentMonth, day);

//     const isFuture = (currentYear === currentDate.getFullYear() && currentMonth === currentDate.getMonth() && day > currentDate.getDate()) ||
//       (currentYear === currentDate.getFullYear() && currentMonth > currentDate.getMonth()) ||
//       (currentYear > currentDate.getFullYear());
//     const isFuture2 = (currentYear === currentDate.getFullYear() && currentMonth === currentDate.getMonth() && day === currentDate.getDate() + 1);
//     const isCurrent = (currentYear === currentDate.getFullYear() && currentMonth === currentDate.getMonth() && day === currentDate.getDate());
//     if (isFuture2) {
//       setSelectedDate(clickedDate);
//       setOptionsOpen(true);
//       setOptionsOpen2(false);
//       setOptionsOpen3(false);
//     } else if (isCurrent) {
//       setSelectedDate(clickedDate);
//       setOptionsOpen(false);
//       setOptionsOpen2(false);
//       setOptionsOpen3(true);
//     } else if (isFuture) {
//       setSelectedDate(null);
//       setOptionsOpen(false);
//       setOptionsOpen2(false);
//       setOptionsOpen3(false);
//     } else {
//       setSelectedDate(clickedDate);
//       setOptionsOpen(false);
//       setOptionsOpen2(true);
//       setOptionsOpen3(false);
//     }
//   };

//   const closeOptions = () => {
//     setOptionsOpen(false);
//     setOptionsOpen2(false);
//     setOptionsOpen3(false);
//   };

//   const OptionsBox = () => {
//     if (!optionsOpen || !selectedDate) return null;

//     const formattedDate = `${selectedDate.getDate()}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`;

//     return (
//       <div className="options-box" style={{ backgroundColor: "#1D5D9D", color: "white" }}>
//         <div className="options-header">
//           <h3>{formattedDate}</h3>
//           <button className="close-btn ms-4" onClick={handleBooking}>
//             &#10004; {/* Checkmark character */}
//           </button>
//         </div>
//         <div className="options-list">
//           <label>
//             <input type="checkbox" checked={selectedMeals.includes('breakfast')} onChange={() => handleMealSelection('breakfast')} />
//             Breakfast
//           </label>
//           <label>
//             <input type="checkbox" checked={selectedMeals.includes('lunch')} onChange={() => handleMealSelection('lunch')} />
//             Lunch
//           </label>
//           <label>
//             <input type="checkbox" checked={selectedMeals.includes('dinner')} onChange={() => handleMealSelection('dinner')} />
//             Dinner
//           </label>
//         </div>
//       </div>
//     );
//   };
//   const OptionsBox2 = () => {
//     if (!optionsOpen2 || !selectedDate) return null;

//     const formattedDate = `${selectedDate.getDate()}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`;

//     return (
//       <div className="options-box" style={{ backgroundColor: "#1D5D9D", color: "white" }}>
//         <div className="options-header">
//           <h3>{formattedDate}</h3>
//           <button className="close-btn ms-4" onClick={closeOptions} >
//             &#10004; {/* Checkmark character */}
//           </button>
//         </div>
//         <div className="options-list">
//           <label>
//             Breakfast
//           </label>
//           <label>
//             Lunch
//           </label>
//           <label>
//             Dinner
//           </label>
//         </div>
//       </div>
//     );
//   };
//   const OptionsBox3 = () => {
//     if (!optionsOpen3 || !selectedDate) return null;

//     const formattedDate = `${selectedDate.getDate()}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`;

//     return (
//       <div className="options-box" style={{ backgroundColor: "#1D5D9D", color: "white" }}>
//         <div className="options-header">
//           <h3>{formattedDate}</h3>
//           <button className="close-btn ms-4" onClick={closeOptions}>
//             &#10004; {/* Checkmark character */}
//           </button>
//         </div>
//         qr
//       </div>
//     );
//   };


//   const handleMealSelection = (meal) => {
//     if (selectedMeals.includes(meal)) {
//       setSelectedMeals(selectedMeals.filter(item => item !== meal));
//     } else {
//       setSelectedMeals([...selectedMeals, meal]);
//     }
//   };

//   const handleBooking = async () => {
//     try {
//       const isAuthenticated = authUtils.checkAuthentication();

//       let rollnumber = '';
//       if (isAuthenticated) {
//         rollnumber = await authUtils.fetchRollNumber();
//       } else {
//         authUtils.redirectToLogin();
//         return;
//       }

//       const response = await fetch('https://digital-mess.vercel.app/api/main/book', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ rollnumber, classIds: selectedMeals.map(meal => classIdsByMeal[meal]) })

//       });
//       console.log(selectedMeals.map(meal => classIdsByMeal[meal]));
//       console.log(rollnumber);

//       if (!response.ok) {
//         throw new Error('Failed to book');
//       }

//       const data = await response.json();
//       console.log(data.message);
//     } catch (error) {
//       console.error('Error in booking:', error.message);
//     }
//   };
//   return (
//     <div className="calendar mt-5 shadow" style={{ backgroundColor: "white", paddingBottom: 20 }}>
//       <div className="header">
//         <button onClick={prevMonth}>{'<'}</button>
//         <h1>{`${monthNames[currentMonth]} ${currentYear}`}</h1>
//         <button onClick={nextMonth}>{'>'}</button>
//       </div>
//       <div className="weekdays">
//         {weekdays.map(day => (
//           <div key={day} className="weekday">
//             {day}
//           </div>
//         ))}
//       </div>
//       <div className="days">{days}</div>
//       <OptionsBox />
//       <OptionsBox2 />
//       <OptionsBox3 />

//       <div className="main">
//         <div class="circle" >
//           <img src={bg} />
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Calendar;
