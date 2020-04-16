'use strict'

var nodemailer = require('nodemailer');

// email sender function
exports.sendEmail = function(req, res){
// Definimos el transporter
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: '',
            pass: ''
        }
    });
// Definimos el email
var mailOptions = {
    from: '',
    to: '',
    subject: 'Asunto',
    text: 'Mensaje de prueba'
};
// Enviamos el email
transporter.sendMail(mailOptions, function(error, info){
    if (error){
        console.log(error);
        res.status(500).send({message: error.message});
    } else {
        console.log("Email sent");
        res.status(200).jsonp(req.body);
    }
});
};