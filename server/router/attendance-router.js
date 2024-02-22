const express = require('express');
const router = express.Router();
const attendancecontrollers = require('../controllers/attendance-controller');


router.route('/mark-attendance').post(attendancecontrollers.markAttendance);
router.route('/').get(attendancecontrollers.getall);
router.route('/class/:classId').get(attendancecontrollers.getbyclassid);
router.route('/:id').put(attendancecontrollers.updatebyid);
router.route('/:id').delete(attendancecontrollers.deletebyid);

module.exports = router;