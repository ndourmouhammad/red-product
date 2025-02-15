const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const authRoutes = require('./routes/User');
const hotelRoutes = require('./routes/Hotel');
const connectDB = require('./config/db');


dotenv.config();

// Connexion à MongoDB
connectDB();

const app = express();

// Middleware pour parser JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Servir les fichiers statiques (pour les images uploadées)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/users', authRoutes);
app.use('/api/hotels', hotelRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});