import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QRPage = () => {
    const [qrImage, setQRImage] = useState('');

    const handleButtonClick = async () => {
        try {
            const response = await axios.get('https://digital-mess.vercel.app/api/qr/generate?classId=102117', {
                responseType: 'blob',
                headers: {
                    'Content-Type': 'image/png'
                }
            });
            const reader = new FileReader();
            reader.onload = () => {
                setQRImage(reader.result);
            };
            reader.readAsDataURL(response.data);
        } catch (error) {
            console.error('Error fetching QR code:', error);
        }
    };

    useEffect(() => {
        // Extract class ID and student ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const classId = urlParams.get('classId');
        const studentId = urlParams.get('studentId');

        // Send class ID and student ID to backend
        if (classId && studentId) {
            axios.get(`http://localhost:3001/api/attendance?classId=${classId}&studentId=${studentId}`)
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error('Error marking attendance:', error);
                });
        }
    }, []); // Run only once on component mount

    return (
        <div>
            <h1>QR Code</h1>
            <button onClick={handleButtonClick}>Fetch QR Code</button>
            {qrImage && <img src={qrImage} alt="QR code" />}
        </div>
    );
}

export default QRPage;
