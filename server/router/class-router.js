const express = require('express');
const router = express.Router();
const classcontrollers = require('../controllers/class-controller');

router.route('/create').post(classcontrollers.create);
router.route('/').get(classcontrollers.getall);
router.route('/:id').get(classcontrollers.getbyid);
router.route('/:id').put(classcontrollers.updatebyid);
router.route('/:id').delete(classcontrollers.deletebyid);

module.exports = router;
