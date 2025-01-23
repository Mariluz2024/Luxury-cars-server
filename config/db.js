const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://admin:D0k3r2k47@localhost:27017/luxury_cars?authSource=admin', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Base de datos conectada');
    } catch (error) {
        console.error('Error al conectar la base de datos', error);
        process.exit(1);
    }
};

module.exports = connectDB;
