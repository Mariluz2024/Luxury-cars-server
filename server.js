const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const connectDB = require('./config/db');

const carRoutes = require('./routes/cars.routes');
const authRoutes = require('./routes/auth.routes');
const favoriteRoutes = require('./routes/favorites.routes');
const comparisonRoutes = require('./routes/comparison.routes');
// const ratingRoutes = require('./routes/rating.routes');
// const salesRoutes = require('./routes/sales.routes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

connectDB();

app.use('/api/cars', carRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/comparisons', comparisonRoutes);
// app.use('/api/ratings', ratingRoutes);
// app.use('/api/sales', salesRoutes);

app.get("/", (req, res) => {
  res.status(201).json({ message: "Bienvenido a la API de Luxury Cars" });
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
