import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import authUtils from '../../../utils/jwtRollNumber';

const AttendancePage = () => {
    const { classId } = useParams();

    const handleSend = async () => {
        try {
            const isAuthenticated = authUtils.checkAuthentication();

            let rollnumber = '';
            if (isAuthenticated) {
                rollnumber = await authUtils.fetchRollNumber();
                console.log(rollnumber);
                console.log(classId);
            } else {
                authUtils.redirectToLogin();
                return;
            }

            const response = await fetch('https://digital-mess.vercel.app/api/attendance/mark-attendance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ classId, rollnumber }),
            });

            if (!response.ok) {
                throw new Error('Failed to mark attendance');
            }

            const data = await response.json();
            console.log(data.message);
        } catch (error) {
            console.error('Error marking attendance:', error.message);
        }
    };

    return (
        <div>
            <h1>Attendance Mark Page</h1>
            <button onClick={handleSend}>Send</button>
        </div>
    );
};

export default AttendancePage;
