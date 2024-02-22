import React, { useState } from 'react';
import QrReader from 'react-qr-reader';

const QRScannerPage = () => {
    const [qrData, setQrData] = useState('');

    // Function to handle QR code scan
    const handleScan = data => {
        if (data) {
            try {
                const classId = extractClassIdFromQR(data);
                const studentId = getStudentIdFromAuthToken();
                markAttendance(classId, studentId);
            } catch (error) {
                console.error('Error processing QR code:', error.message);
            }
        }
    }

    // Function to handle QR scan error
    const handleError = error => {
        console.error('QR scan error:', error);
    }

    // Function to extract class ID from QR code data
    const extractClassIdFromQR = qrCodeData => {
        const parts = qrCodeData.split(':');
        if (parts.length === 2) {
            return parts[1].trim();
        } else {
            throw new Error('Invalid QR code data format');
        }
    }

    // Function to get student ID from authentication token
    const getStudentIdFromAuthToken = () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwt_decode(token);
                if (decodedToken && decodedToken.sub) {
                    return decodedToken.sub;
                } else {
                    throw new Error('Student ID not found in token');
                }
            } catch (error) {
                console.error('Error decoding token:', error);
                throw new Error('Error decoding token');
            }
        } else {
            throw new Error('Token not found');
        }
    }

    // Function to mark attendance
    const markAttendance = (classId, studentId) => {
        // Send request to backend API to mark attendance
        fetch('/api/attendance/mark-attendance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ classId, studentId })
        })
            .then(response => {
                if (response.ok) {
                    console.log('Attendance marked successfully');
                } else {
                    console.error('Failed to mark attendance');
                }
            })
            .catch(error => {
                console.error('Error marking attendance:', error);
            });
    }

    return (
        <div>
            <h1>QR Scanner</h1>
            <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%' }}
            />
            <p>{qrData}</p>
        </div>
    );
}

export default QRScannerPage;
