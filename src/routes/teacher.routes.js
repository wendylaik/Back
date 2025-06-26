const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacher.controller');

//obtener todos los profesores
router.get('/', teacherController.getAllTeachers);


//obtener un profesor
router.get('/:id', teacherController.getTeacherById);

//crear profesor
router.post('/', teacherController.createTeacher);

//actualizar profesor
router.put('/:id', teacherController.updateTeacher);

//eliminar profesor
router.delete('/:id', teacherController.deleteTeacher);


module.exports = router;
