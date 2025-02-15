require('dotenv').config();
const Hotel = require('../models/Hotel');
const upload = require('../config/multer');

// Lister tous les hôtels
const getAllHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.json(hotels);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la recherche des hôtels' });
    }
};

// Ajouter un nouvel hôtel avec upload d'image
const addHotel = async (req, res) => {
    try {
        const { nom, email, adresse, telephone, prix_par_nuit, devise } = req.body;
        const image = req.file ? req.file.path : null;

        const newHotel = new Hotel({
            nom,
            email,
            adresse,
            telephone,
            prix_par_nuit,
            devise,
            image
        });

        await newHotel.save();
        res.status(201).json(newHotel);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'hôtel' });
    }
};

// Modifier un hôtel existant avec upload d'image
const updateHotel = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, email, adresse, telephone, prix_par_nuit, devise } = req.body;
        const image = req.file ? req.file.path : null;

        const updatedHotel = await Hotel.findByIdAndUpdate(
            id,
            { nom, email, adresse, telephone, prix_par_nuit, devise, image },
            { new: true }
        );

        res.status(200).json(updatedHotel);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'hôtel' });
    }
};

// Supprimer un hôtel existant
const deleteHotel = async (req, res) => {
    try {
        const { id } = req.params;
        await Hotel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Hôtel supprimé avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'hôtel' });
    }
};

module.exports = {
    getAllHotels,
    addHotel,
    updateHotel,
    deleteHotel
};