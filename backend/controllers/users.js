const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const { JWT_SECRET = "dev-secret-key" } = process.env;

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => {
      res.status(500).send({
        message: "Error interno del servidor",
      });
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({
          message: "Usuario no encontrado",
        });
      }

      if (err.name === "CastError") {
        return res.status(400).send({
          message: "ID de usuario inválido",
        });
      }

      return res.status(500).send({
        message: "Error interno del servidor",
      });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      }),
    )
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "Datos inválidos",
        });
      }

      if (err.code === 11000) {
        return res.status(409).send({
          message: "Este correo electrónico ya está registrado",
        });
      }

      return res.status(500).send({
        message: "Error interno del servidor",
      });
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        return res.status(400).send({
          message: "Datos inválidos",
        });
      }

      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({
          message: "Usuario no encontrado",
        });
      }

      return res.status(500).send({
        message: "Error interno del servidor",
      });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        return res.status(400).send({
          message: "Datos inválidos",
        });
      }

      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({
          message: "Usuario no encontrado",
        });
      }

      return res.status(500).send({
        message: "Error interno del servidor",
      });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Correo o contraseña incorrectos"));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Correo o contraseña incorrectos"));
        }

        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        });

        return res.send({ token });
      });
    })
    .catch(() => {
      res.status(401).send({ message: "Correo o contraseña incorrectos" });
    });
};

const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({
          message: "Usuario no encontrado",
        });
      }

      if (err.name === "CastError") {
        return res.status(400).send({
          message: "ID de usuario inválido",
        });
      }

      return res.status(500).send({
        message: "Error interno del servidor",
      });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getCurrentUser,
};