const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const withAuth = require('./middleware');

const mongo_uri = 'mongodb://localhost/jwt-auth';
mongoose.connect(mongo_uri,{useNewUrlParser: true, useUnifiedTopology: true} , (err) => {
    if(err) {
        throw err
    } else {
        console.log(`Successfully connected to ${mongo_uri}`);
    }
});

const secret = 'mysecretsshhh';

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true   
}));
app.use(cookieParser())

app.get('/api/home', (req, res) => {
    res.send('Welcome');
});

app.get('/api/secret', withAuth, (req, res) => {
    res.send('Password is potato');
});

app.post('/api/register', function(req, res) {
    const { email, password } = req.body;
    const user = new User({ email, password });
    user.save(function(err) {
        if (err) {
        res.status(500)
            .send("Error registering new user please try again.");
            console.log(err)
        } else {
        res.status(200).send("Welcome to the club!");
        }
    });
});
 
app.post('/api/authenticate', function(req, res) {
    const { email, password } = req.body;
    User.findOne({ email }, function(err, user) {
        if (err) {
        console.error(err);
        res.status(500)
            .json({
            error: 'Internal error please try again'
        });
        } else if (!user) {
        res.status(401)
            .json({
            error: 'Incorrect email or password'
            });
        } else {
        user.isCorrectPassword(password, function(err, same) {
            if (err) {
            res.status(500)
                .json({
                error: 'Internal error please try again'
            });
            } else if (!same) {
            res.status(401)
                .json({
                error: 'Incorrect email or password'
            });
            } else {
            // Issue token
            const payload = { email };
            const token = jwt.sign(payload, secret, {
                expiresIn: '1h'
            });
            res.cookie('token', token, { httpOnly: true })
                .sendStatus(200);
            }
        });
        }
    });
});

app.get('/checkToken', withAuth, function(req, res) {
    res.sendStatus(200);
});
app.get('/logout', withAuth, (req, res) => {
    res.clearCookie('token').send('Clear');
})

app.listen(8000, () => {
    console.log('Listening on port 8000')
});