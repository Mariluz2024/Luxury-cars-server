const jwt = require("jsonwebtoken");

const User = require("../models/user"); // Asegúrate de que la ruta sea correcta

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
  try {
    const { nombre, correo, password } = req.body;

    // Validar que todos los campos estén presentes
    if (!nombre || !correo || !password) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    // Verificar si el correo ya está registrado
    const existingUser = await User.findOne({ correo });
    if (existingUser) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    // Crear el nuevo usuario
    const newUser = new User({ nombre, correo, password });
    await newUser.save();

    res.status(201).json({
      message: "Usuario creado exitosamente",
      user: {
        id: newUser._id,
        nombre: newUser.nombre,
        correo: newUser.correo,
      },
    });
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

const SECRET_KEY = "mi_llave_secreta";

exports.loginUser = async (req, res) => {
  try {
    const { correo, password } = req.body;

    // Validar que todos los campos estén presentes
    if (!correo || !password) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    // Verificar si el usuario existe
    const user = await User.findOne({ correo });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Correo o contraseña incorrectos" });
    }

    // Verificar la contraseña
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Correo o contraseña incorrectos" });
    }

    // Generar un token JWT
    const token = jwt.sign(
      { id: user._id, correo: user.correo },
      SECRET_KEY,
      { expiresIn: "1d" } // El token expira en 1 día
    );

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      token,
      user: {
        id: user._id,
        nombre: user.nombre,
        correo: user.correo,
      },
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};
