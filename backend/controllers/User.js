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
        case !name || !email || !password :
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
        html: `<p>Verify your email address to complete the signup and login into your account.</p>
        <p>This link <b>expires in 6 hours</b>.</p>
        <p>Press <a href="${currentUrl + "verify/" + _id + "/" + uniqueString}">here</a> to proceed</p>`
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
                                status: "PENDING",
                                message: "Verification email sent",
                            });
                        })
                        .catch((error) => {
                            console.log(error);
                            return res.json({
                                status: false,
                                message: "Verification email failed",
                            });
                        });
                })
                .catch((error) => {
                    console.log(error);
                    return res.json({
                        status: false,
                        message: "Couldn't save verification email data"
                    });
                });
        })
        .catch(() => {
            return res.json({
                status: false,
                message: "An error occured while hashing email data",
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
                                    let message = "Link has expired. Please sign up again";
                                    return res.redirect('/user/verified/error=true&message=' + message);
                                })
                                .catch(error => {
                                    let message = "Clearing user with expired unique string failed";
                                    return res.redirect('/user/verified/error=true&message=' + message);
                                });
                        })
                        .catch((error) => {
                            let message = "An error occurred while clearing expired user verification record";
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
                                                let message = "An error occurred while finalizing successful verification";
                                                return res.redirect('/user/verified/error=true&message=' + message);
                                            });
                                    })
                                    .catch(error => {
                                        let message = "An error occurred while updating user record to show verified";
                                        return res.redirect('/user/verified/error=true&message=' + message);
                                    });
                            } else {
                                let message = "Invalid verification details passed. Check your inbox";
                                return res.redirect('/user/verified/error=true&message=' + message);
                            }
                        })
                        .catch(error => {
                            let message = "An error occurred while comparing unique strings.";
                            return res.redirect('/user/verified/error=true&message=' + message);
                        });
                }
            } else {
                let message = "Account record does not exist or has already been verified";
                return res.redirect('/user/verified/error=true&message=' + message);
            }
        })
        .catch((error) => {
            let message = "Something went wrong";
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

module.exports = {
    signup,
    verifyUser,
    verifiedPage,
    signin
};