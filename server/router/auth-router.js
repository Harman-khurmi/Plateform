const express = require('express');
const authcontrollers = require('../controllers/auth-controller');
// const validate = require('../middleware/auth-middleware');
// const signUpSchema = require('../validators/auth-validators');
// const loginSchema = require('../validators/auth-validators');
// const validateRegisterData = require('../middleware/auth-middle');
const router = express.Router();

router.route('/').get(authcontrollers.home);
router.route('/register').post(authcontrollers.register);
router.route('/login').post(authcontrollers.login);

module.exports = router;