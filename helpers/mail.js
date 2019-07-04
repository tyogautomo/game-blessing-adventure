let fs = require('fs')
let password = fs.readFileSync('./config/password.csv', 'utf8')
// console.log(password)

function sendEmail(userEmail) {

    var nodemailer = require('nodemailer');

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        port: 25,
        auth: {
            user: 'gamergarage2020@gmail.com',
            pass: password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let HelperOptions = {
        from: '"Gamer" <gamergarage2020@gmail.com',
        to: userEmail,
        subject: 'Welcome to The Game',
        text: `Congratulation!`
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