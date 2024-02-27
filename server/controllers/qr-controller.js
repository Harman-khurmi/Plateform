const express = require('express');
const qr = require('qr-image');

const generate = async (req, res) => {
    try {
        const classId = req.query.classId;
        const redirectUrl = `https://digital-mess-client.vercel.app/main/scanQR/${classId}`;

        const qrCode = qr.image(redirectUrl, { type: 'png' });

        res.setHeader('Content-type', 'image/png');

        qrCode.pipe(res);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { generate };
