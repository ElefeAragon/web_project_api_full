const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

const validateObjectId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
});

const validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateURL),
  }),
});

router.get('/', getCards);
router.post('/', validateCardBody, createCard);
router.delete('/:cardId', validateObjectId, deleteCard);

router.put('/:cardId/likes', validateObjectId, likeCard);
router.delete('/:cardId/likes', validateObjectId, dislikeCard);

module.exports = router;