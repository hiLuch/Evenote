const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();
const users = require('./routes/users');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const app = express();

app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true, // позволяет передавать куки с сервера
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

const sessionConfig = {
  name: 'authCookie',
  store: new FileStore(),
  secret: process.env.SESSION_SECRET ?? 'Секретное слово',
  resave: false, // * если true, пересохранит сессию, даже если она не менялась
  saveUninitialized: false, // * если false, куки появятся только при установке req.session
  cookie: {
    maxAge: 9999999, // * время жизни в мс (ms)
    httpOnly: true,
  },
};
app.use(session(sessionConfig));

app.use('/user', users);

app.listen(process.env.PORT ?? 3002, () => {
  console.log(`Server started 3002`);
});
