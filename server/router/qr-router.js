const express = require('express');
const router = express.Router();
const qr = require('qr-image');

// Example route to generate QR code
router.get('/generate', (req, res) => {
    // Get class ID or any identifier from request parameters or query
    const classId = req.query.classId; // Assuming you pass the class ID as a query parameter

    // Generate QR code with the class ID embedded
    const qrCode = qr.image(classId, { type: 'png' });

    // Set response headers
    res.setHeader('Content-type', 'image/png');

    // Pipe QR code image to response
    qrCode.pipe(res);
});

module.exports = router;
