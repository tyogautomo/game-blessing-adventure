
function sendEmail(userEmail) {

    var nodemailer = require('nodemailer');

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        port: 25,
        auth: {
            user: 'gamergarage2020@gmail.com',
            pass: process.env.PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let HelperOptions = {
        from: '"The Blessed Adventure Game" <gamergarage2020@gmail.com>',
        to: userEmail,
        subject: 'Welcome to The Game',
        text: `Congratulation your account succesfully registered! Enjoy the game!`
    };

    transporter.sendMail(HelperOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log("The message was sent!");
        console.log(info);
    });
}

module.exports = sendEmail;