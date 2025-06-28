const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { generateToken } = require('../../auth'); 

exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await prisma.teacher.findMany();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve teachers' });
  }
};

exports.getTeacherById = async (req, res) => {
  try {
    const teachers = await prisma.teacher.findMany({
      where: { id: parseInt(req.params.id) }
    });
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve teachers' });
  }
};

exports.createTeacher = async (req, res) => {
  try {
    const newTeacher = await prisma.teacher.create({ data: req.body });
    res.json(newTeacher);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create teacher' });
  }
};

exports.updateTeacher = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const updatedTeacher = await prisma.teacher.update({
      where: { id },
      data: req.body
    });
    res.json(updatedTeacher);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update teacher' });
  }
};

exports.deleteTeacher = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.teacher.delete({ where: { id } });
    res.json({ message: 'Teacher deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete teacher' });
  }
};

exports.getTeacherbyPassword = async (req, res) => {
  try {
    const result = await prisma.teacher.findMany({
      where: {
        id: req.body.id,
        password: req.body.password,
      }
    });

    if (result.length === 0) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }
    const token = generateToken({ id: result[0].id });
    res.json({token});

    // Si después querés usar JWT, aquí iría la generación del token
   } catch (error) {
    console.error('Error en getTeacherbyPassword:', error);
    return res.status(500).json({ error: 'Error al consultar el profesor' });
  }
};

module.exports ={
  getTeacherById,
  getTeacherbyPassword,
  getAllTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher
}

