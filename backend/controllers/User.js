require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const User = require('../models/User');
const Userverification = require('../models/UserVerification');

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Ready for messages");
        console.log(success);
    }
});

const signup = async (req, res) => {
    let { name, email, password } = req.body;

    name = name?.trim();
    email = email?.trim();
    password = password?.trim();


    switch (true) {
        case !name || !email || !password:
            return res.status(400).json({ success: false, message: 'Veuillez remplir tous les champs' });

        case !/^[a-zA-Z ]+$/.test(name):
            return res.status(400).json({ success: false, message: 'Veuillez entrer un nom valide' });

        case !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email):
            return res.status(400).json({ success: false, message: 'Veuillez entrer un email valide' });

        case password.length < 6:
            return res.status(400).json({ success: false, message: 'Le mot de passe doit contenir au moins 6 caractères' });



        default:
            break;
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Cet email est déjà utilisé' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            verified: false,
        });

        await newUser.save();
        return sendVerificationEmail(newUser, res);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Erreur serveur' });
    }
};

const sendVerificationEmail = ({ _id, email }, res) => {
    const currentUrl = "http://localhost:5000/api/users/";
    const uniqueString = uuidv4() + _id;

    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Verification de mail",
        html: `<p>Vérifiez votre adresse e-mail pour compléter inscription et vous connecter à votre compte.</p>
        <p>Ce lien <b>expire dans 6 heures</b>.</p>
        <p>Cliquez <a href="${currentUrl + "verify/" + _id + "/" + uniqueString}">ici</a> pour continuer</p>`

    };

    const saltRounds = 10;
    bcrypt
        .hash(uniqueString, saltRounds)
        .then((hashedUniqueString) => {
            const newVerification = new Userverification({
                userId: _id,
                uniqueString: hashedUniqueString,
                createdAt: Date.now(),
                expiredAt: Date.now() + 21600000
            });

            newVerification
                .save()
                .then(() => {
                    transporter
                        .sendMail(mailOptions)
                        .then(() => {
                            return res.json({
                                status: "EN ATTENTE",
                                message: "L'adresse e-mail de vérification a été envoyée",
                            });
                        })
                        .catch((error) => {
                            console.log(error);
                            return res.json({
                                status: false,
                                message: "Email de vérification non envoyé",
                            });
                        });
                })
                .catch((error) => {
                    console.log(error);
                    return res.json({
                        status: false,
                        message: "Ne peut pas sauvegarder le lien de vérification",
                    });
                });
        })
        .catch(() => {
            return res.json({
                status: false,
                message: "Une erreur a survenu lors du hachage de la chaîne unique",
            });
        });
};

const verifyUser = (req, res) => {
    const { userId, uniqueString } = req.params;

    Userverification
        .find({ userId })
        .then((result) => {
            if (result.length > 0) {
                const { expiresAt } = result[0];
                const hashedUniqueString = result[0].uniqueString;

                if (expiresAt < Date.now()) {
                    Userverification
                        .deleteOne({ userId })
                        .then(() => {
                            User
                                .deleteOne({ _id: userId })
                                .then(() => {
                                    let message = "Lien de vérification expiré";
                                    return res.redirect('/user/verified/error=true&message=' + message);
                                })
                                .catch(error => {
                                    let message = "Échec de la suppression de l'utilisateur avec une chaîne unique expirée.";
                                    return res.redirect('/user/verified/error=true&message=' + message);
                                });
                        })
                        .catch((error) => {
                            let message = "Une erreur s'est produite lors de la suppression de l'enregistrement de vérification utilisateur expiré.";
                            return res.redirect('/user/verified/error=true&message=' + message);
                        });
                } else {
                    bcrypt
                        .compare(uniqueString, hashedUniqueString)
                        .then(result => {
                            if (result) {
                                User
                                    .updateOne({ _id: userId }, { verified: true })
                                    .then(() => {
                                        Userverification
                                            .deleteOne({ userId })
                                            .then(() => {
                                                return res.sendFile(path.join(__dirname, "../views/verified.html"));
                                            })
                                            .catch(error => {
                                                let message = "Une erreur s'est produite lors de la finalisation de la vérification réussie.";
                                                return res.redirect('/user/verified/error=true&message=' + message);
                                            });
                                    })
                                    .catch(error => {
                                        let message = "Une erreur s'est produite lors de la mise à jour de l'enregistrement utilisateur pour indiquer la vérification.";
                                        return res.redirect('/user/verified/error=true&message=' + message);
                                    });
                            } else {
                                let message = "Détails de vérification invalides fournis. Vérifiez votre boîte de réception.";
                                return res.redirect('/user/verified/error=true&message=' + message);
                            }
                        })
                        .catch(error => {
                            let message = "Une erreur s'est produite lors de la comparaison des chaînes uniques.";
                            return res.redirect('/user/verified/error=true&message=' + message);
                        });
                }
            } else {
                let message = "L'enregistrement du compte n'existe pas ou a déjà été vérifié.";
                return res.redirect('/user/verified/error=true&message=' + message);
            }
        })
        .catch((error) => {
            let message = "Quelque chose s'est mal passé.";
            return res.redirect('/user/verified/error=true&message=' + message);
        });
};

const verifiedPage = (req, res) => {
    return res.sendFile(path.join(__dirname, "../views/verified.html"));
};

const signin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Veuillez fournir un email et un mot de passe'
        });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Email ou mot de passe incorrect'
            });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({
                success: false,
                message: 'Email ou mot de passe incorrect'
            });
        }

        if (!user.verified) {
            return res.json({
                status: false,
                message: "Email has not been verified yet. Check your inbox."
            });
        } else {
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            return res.status(200).json({
                success: true,
                message: 'Connexion réussie',
                token
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Erreur serveur, veuillez réessayer plus tard'
        });
    }
};

const resetPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            success: false,
            message: 'Veuillez fournir un email'
        });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Email introuvable'
            });
        }

        if (!user.verified) {
            return res.status(400).json({
                success: false,
                message: "Votre compte n'est pas encore vérifié. Veuillez vérifier votre boîte e-mail."
            });
        }


        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );


        const hashedToken = await bcrypt.hash(token, 10);

        const newPasswordReset = new Userverification({
            userId: user._id,
            uniqueString: hashedToken,
            createdAt: Date.now(),
            expiredAt: Date.now() + 3600000
        });

        await newPasswordReset.save();


        const resetUrl = `http://localhost:5000/api/users/reset-password/${user._id}/${token}`;
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "Réinitialisation de votre mot de passe",
            html: `<p>Vous avez demandé la réinitialisation de votre mot de passe. Cliquez sur le lien ci-dessous pour procéder :</p>
                   <p><a href="${resetUrl}">Réinitialiser mon mot de passe</a></p>
                   <p>Ce lien expirera dans 1 heure.</p>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return res.status(500).json({
                    success: false,
                    message: "Erreur lors de l'envoi de l'e-mail de réinitialisation"
                });
            } else {
                console.log('E-mail de réinitialisation envoyé :', info.response);
                return res.status(200).json({
                    success: true,
                    message: 'Un e-mail de réinitialisation a été envoyé à votre adresse e-mail.'
                });
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Erreur serveur, veuillez réessayer plus tard'
        });
    }
};

const verifyResetPasswordLink = async (req, res) => {
    const { userId, uniqueString } = req.params;

    try {

        const resetRecord = await Userverification.findOne({ userId });

        if (!resetRecord) {
            return res.status(400).json({
                success: false,
                message: 'Lien de réinitialisation invalide ou expiré'
            });
        }


        if (resetRecord.expiredAt < Date.now()) {
            await Userverification.deleteOne({ userId });
            return res.status(400).json({
                success: false,
                message: 'Le lien de réinitialisation a expiré'
            });
        }


        const isValid = await bcrypt.compare(uniqueString, resetRecord.uniqueString);
        if (!isValid) {
            return res.status(400).json({
                success: false,
                message: 'Lien de réinitialisation invalide'
            });
        }


        return res.sendFile(path.join(__dirname, '../views/reset-password.html'));
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Erreur serveur, veuillez réessayer plus tard'
        });
    }
};

const updatePassword = async (req, res) => {
    console.log("Début de la fonction updatePassword");

    const { token, newPassword } = req.body;
    console.log("Données reçues :", { token, newPassword });

    if (!token || !newPassword) {
        console.log("Données manquantes : token ou newPassword absent");
        return res.status(400).json({
            success: false,
            message: 'Données manquantes'
        });
    }

    try {
        console.log("Tentative de décodage du token...");
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token décodé :", decoded);

        const { userId } = decoded;
        console.log("User ID extrait du token :", userId);

        console.log("Recherche de l'enregistrement de réinitialisation...");
        const resetRecord = await Userverification.findOne({ userId });
        console.log("Enregistrement de réinitialisation trouvé :", resetRecord);

        if (!resetRecord) {
            console.log("Aucun enregistrement de réinitialisation trouvé pour cet utilisateur");
            return res.status(400).json({
                success: false,
                message: 'Lien de réinitialisation invalide ou expiré'
            });
        }

        console.log("Vérification de l'expiration du lien...");
        if (resetRecord.expiredAt < Date.now()) {
            console.log("Le lien de réinitialisation a expiré");
            await Userverification.deleteOne({ userId });
            return res.status(400).json({
                success: false,
                message: 'Le lien de réinitialisation a expiré'
            });
        }

        console.log("Comparaison du token...");
        const isValid = await bcrypt.compare(token, resetRecord.uniqueString);
        console.log("Résultat de la comparaison :", isValid);

        if (!isValid) {
            console.log("Le token ne correspond pas");
            return res.status(400).json({
                success: false,
                message: 'Lien de réinitialisation invalide'
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.updateOne({ _id: userId }, { password: hashedPassword });
        await Userverification.deleteOne({ userId });


        return res.status(200).json({
            success: true,
            message: 'Mot de passe mis à jour avec succès'
        });
    } catch (error) {
        console.error("Erreur dans updatePassword :", error);
        return res.status(500).json({
            success: false,
            message: 'Erreur serveur, veuillez réessayer plus tard'
        });
    }
};

// LOGOUT
const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        return res.status(200).json({
            success: true,
            message: 'Deconnexion avec succes'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Erreur serveur, veuillez réessayer plus tard'
        });
    }
};

module.exports = {
    signup,
    verifyUser,
    verifiedPage,
    signin,
    resetPassword,
    updatePassword,
    verifyResetPasswordLink,
    logout
};