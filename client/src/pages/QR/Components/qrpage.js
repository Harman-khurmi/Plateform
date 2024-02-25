import React, { useState } from 'react';
import axios from 'axios';

const QRPage = () => {
    const [qrImage, setQRImage] = useState('');

    // Function to handle button click and fetch QR code image from backend API
    const handleButtonClick = async () => {
        try {
            const response = await axios.get('https://digital-mess.vercel.app/api/qr/generate?classId=102117', {
                responseType: 'blob', // Specify response type as blob
                headers: {
                    'Content-Type': 'image/png'
                }
            });

            // Convert blob to base64 string
            const reader = new FileReader();
            reader.onload = () => {
                setQRImage(reader.result);
            };
            reader.readAsDataURL(response.data);
        } catch (error) {
            console.error('Error fetching QR code:', error);
        }
    };

    return (
        <div>
            <h1>QR Code</h1>
            <button onClick={handleButtonClick}>Fetch QR Code</button>
            {qrImage && <img src={qrImage} alt="QR code" />}
        </div>
    );
}

export default QRPage;
