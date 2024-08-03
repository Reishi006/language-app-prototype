const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

require('./assets/db');

const homeRoute = require('./routes/home');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const profileRoute = require('./routes/profile');
const lessonsRoute = require('./routes/lessons');
const logoutRoute = require('./routes/logout');
const aboutRoute = require('./routes/about');

const originDomain = 'http://localhost:3000';

app.use(helmet());

app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', `script-src 'self' ${originDomain}`);
    return next();
});

app.use(express.json());

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(cors({
    origin: originDomain,
    credentials: true,
}));

app.use(cookieParser());

app.use(homeRoute);
app.use(registerRoute);
app.use(loginRoute);
app.use(profileRoute)
app.use(lessonsRoute);
app.use(logoutRoute);
app.use(aboutRoute);

app.all('*', (req, res) => {
    res.status(404).send('Błąd 404: Nie znaleziono zawartości');
})

app.listen(process.env.PORT, () => console.log(`server running on port: ${process.env.PORT}`));
