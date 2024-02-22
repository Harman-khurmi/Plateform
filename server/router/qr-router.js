const express = require('express');
const router = express.Router();
const qrcontrollers = require('../controllers/qr-controller');

router.route('/generate').get(qrcontrollers.generate);

module.exports = router;
