const mongoose = require("mongoose");

const hotelSchema = mongoose.Schema({
    nom: String,
    email: String,
    adresse: String,
    telephone: String,
    prix_par_nuit: Number,
    devise: {
        type: String,
        enum: ["FCFA", "EUR", "USD"],
        required: true
    },
    image: String
}, {
    timestamps: true
});

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;