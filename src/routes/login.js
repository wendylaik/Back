const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacher.controller')

//obtener profesor por password
router.post('/', teacherController.getTeacherbyPassword);

module.exports = router;
