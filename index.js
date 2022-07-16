const express = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const cors = require('cors');
const Contact = require('./Models/Contact');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: '*'

}));

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true });

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, X-Requested-with, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );
    next();
});


const port = process.env.PORT || 3000



app.listen(port, () => {
    console.log(`app listening to port ${port}`);
})

app.post("/api/addcontact", (req, res) => {
    console.log("here in create contact", req.body);
    let contact = {};

    contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message,
    });


    contact.save();

    res.status(200).json({
        message: "contact created"

    })

});

































module.exports = app;