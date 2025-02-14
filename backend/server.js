const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/User');
const connectDB = require('./config/db'); // Importez la fonction connectDB

dotenv.config();

// Connexion à MongoDB
connectDB();

const app = express();

app.use(express.json());

// Routes
app.use('/api/users', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});