const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => {
      res.status(500).send({
        message: 'Error interno del servidor',
      });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Datos inválidos',
        });
      }

      return res.status(500).send({
        message: 'Error interno del servidor',
      });
    });
};

const deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .orFail()
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        return res.status(403).send({
          message: 'No tienes permiso para eliminar esta tarjeta',
        });
      }

      return Card.findByIdAndDelete(req.params.cardId)
        .then((deletedCard) => res.send(deletedCard));
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({
          message: 'Tarjeta no encontrada',
        });
      }

      if (err.name === 'CastError') {
        return res.status(400).send({
          message: 'ID de tarjeta inválido',
        });
      }

      return res.status(500).send({
        message: 'Error interno del servidor',
      });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({
          message: 'Tarjeta no encontrada',
        });
      }

      if (err.name === 'CastError') {
        return res.status(400).send({
          message: 'ID de tarjeta inválido',
        });
      }

      return res.status(500).send({
        message: 'Error interno del servidor',
      });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({
          message: 'Tarjeta no encontrada',
        });
      }

      if (err.name === 'CastError') {
        return res.status(400).send({
          message: 'ID de tarjeta inválido',
        });
      }

      return res.status(500).send({
        message: 'Error interno del servidor',
      });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};