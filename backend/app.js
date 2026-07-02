const express = require('express');
const mongoose = require('mongoose');

const { login, createUser } = require('./controllers/users');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(express.json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use((req, res, next) => {
  req.user = {
    _id: '6a1e6b4c1350d41e718f807a',
  };

  next();
});

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((req, res) => {
  res.status(404).send({
    message: 'Recurso solicitado no encontrado',
  });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});