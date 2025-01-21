const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const connectDB = require('./config/db');

const carRoutes = require('./routes/cars.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

connectDB();

app.use('/api/cars', carRoutes);
app.use('/api/auth', authRoutes);

app.get("/", (req, res) => {
  res.status(201).json({ message: "Bienvenido a la API de Luxury Cars" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
