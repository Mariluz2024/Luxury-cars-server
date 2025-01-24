const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mluzco29:sHuGzApRDDPAPmKI@cluster0.gwnxg.mongodb.net/luxury_cars?retryWrites=true&w=majority&appName=Cluster0",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Base de datos conectada");
  } catch (error) {
    console.error("Error al conectar la base de datos", error);
    process.exit(1);
  }
};

module.exports = connectDB;
