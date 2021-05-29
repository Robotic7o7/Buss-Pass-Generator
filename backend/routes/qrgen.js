var express = require("express");
var router = express.Router();
var nodemailer = require('nodemailer');
var QRCode = require('qrcode')

router.post('/send-email', async function (req, res) {

    let img = await QRCode.toDataURL('hello world');

    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            type: "OAuth2",
            user: process.env.GMAIL_USER,
            clientId: process.env.GMAIL_CLIENT_ID,
            clientSecret: process.env.GMAIL_CLIENT_SECRET,
            refreshToken: process.env.GMAIL_REFRESH_TOKEN,
            accessToken: process.env.GMAIL_ACCESS_TOKEN
        }
    });

    let mailOptions = {
        from: 'test', // sender address
        to: 'scientificrohan@gmail.com', // list of receivers
        subject: 'Test Email Node JS', // Subject line
        text: 'Halo ini dari node js', // plain text body
        html: 'Halo ini barcodenya </br> <img src="' + img + '">' // html body
    };

    transporter.sendMail(mailOptions, function (err, response) {
        if (err) {
            console.log("error: " + err);
        } else {
            console.log("email sent");
            res.status(200).json({ message: "Email Sent" });
        }
    });
});


module.exports = router;