import React, { useState } from 'react';
import axios from 'axios';

const QRPage = () => {
    const [qrImage, setQRImage] = useState('');
    const [classId, setClassId] = useState('');

    const handleButtonClick = async (mealType) => {
        try {
            let id;
            if (mealType === 'breakfast') {
                id = '65d488472f35b5b5192e3519'; // ID for breakfast
            } else if (mealType === 'lunch') {
                id = '65d488f28ac01c02a4502159'; // ID for lunch
            } else if (mealType === 'dinner') {
                id = '65d4894866852d44f86a814c'; // ID for dinner
            }
            setClassId(id);

            const response = await axios.get(`https://digital-mess.vercel.app/api/qr/generate?classId=${id}`, {
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
            <button onClick={() => handleButtonClick('breakfast')}>Fetch QR Code for Breakfast</button>
            <button onClick={() => handleButtonClick('lunch')}>Fetch QR Code for Lunch</button>
            <button onClick={() => handleButtonClick('dinner')}>Fetch QR Code for Dinner</button>
            {qrImage && <img src={qrImage} alt="QR code" />}
        </div>
    );
}

export default QRPage;
