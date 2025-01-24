const { User } = require('../db'); // Importar el modelo User desde la base de datos

// Controlador para registrar usuarios
const registerUser = async (req, res) => {
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: 'El campo "nombre" es obligatorio.' });
  }

  try {
    // Verificar si el usuario ya existe
    let user = await User.findOne({ where: { nombre } });
    if (!user) {
      // Si no existe, crear un nuevo usuario
      user = await User.create({ nombre });
    }

    // Enviar el userId al frontend para que se almacene en el localStorage
    res.status(201).json({ userId: user.id, nombre: user.nombre }); 
  } catch (error) {
    console.error('Error registrando usuario:', error);
    res.status(500).json({ error: 'Error al registrar el usuario.' });
  }
};

module.exports = { registerUser };
