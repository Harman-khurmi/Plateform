import React, { useState } from 'react';
import './Calendar.css'; // You can create this CSS file for styling

const Calendar = () => {
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [optionsOpen, setOptionsOpen] = useState(false);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const monthNames = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  let days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(
      <div key={`empty-${i}`} className="day empty">
        {''}
      </div>
    );
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const isSelected = selectedDate === i;
    const isCurrent = currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear() && i === currentDate.getDate();
    const isFuture = (currentYear === currentDate.getFullYear() && currentMonth === currentDate.getMonth() && i > currentDate.getDate()) ||
                    (currentYear === currentDate.getFullYear() && currentMonth > currentDate.getMonth()) ||
                    (currentYear > currentDate.getFullYear());

    days.push(
      <div
        key={`day-${i}`}
        className={`day ${isSelected ? 'selected' : ''} ${isCurrent ? 'current' : ''}`}
        onClick={() => handleDateClick(i)}
      >
        {i}
        {isFuture && <div className="future-indicator"></div>} {/* Indicator for future date */}
      </div>
    );
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(currentYear, currentMonth, day);

    const isFuture = (currentYear === currentDate.getFullYear() && currentMonth === currentDate.getMonth() && day > currentDate.getDate()) ||
                    (currentYear === currentDate.getFullYear() && currentMonth > currentDate.getMonth()) ||
                    (currentYear > currentDate.getFullYear());

    if (isFuture) {
      setSelectedDate(clickedDate);
      setOptionsOpen(true);
    } else {
      setSelectedDate(null);
      setOptionsOpen(false);
    }
  };

  const closeOptions = () => {
    setOptionsOpen(false);
  };

  const OptionsBox = () => {
    if (!optionsOpen || !selectedDate) return null;

    const formattedDate = `${selectedDate.getDate()}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`;

    return (
      <div className="options-box">
        <div className="options-header">
          <h3>{formattedDate}</h3>
          <button className="close-btn ms-4" onClick={closeOptions}>
            &#10004; {/* Checkmark character */}
          </button>
        </div>
        <div className="options-list">
          <label>
            <input type="checkbox" /> Breakfast
          </label>
          <label>
            <input type="checkbox" /> Lunch
          </label>
          <label>
            <input type="checkbox" /> Dinner
          </label>
        </div>
      </div>
    );
  };

  return (
    <div className="calendar mt-5">
      <div className="header">
        <button onClick={prevMonth}>{'<'}</button>
        <h1>{`${monthNames[currentMonth]} ${currentYear}`}</h1>
        <button onClick={nextMonth}>{'>'}</button>
      </div>
      <div className="weekdays">
        {weekdays.map(day => (
          <div key={day} className="weekday">
            {day}
          </div>
        ))}
      </div>
      <div className="days">{days}</div>
      <OptionsBox />
    </div>
  );
};

export default Calendar;
