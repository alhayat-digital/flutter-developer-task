const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function validationError(errors) {
  return {
    message: 'The given data was invalid.',
    errors,
  };
}

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const errors = {};

    if (!name) {
      errors.name = ['The name field is required.'];
    }
    if (!email) {
      errors.email = ['The email field is required.'];
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = ['The email must be a valid email address.'];
    }
    if (!password) {
      errors.password = ['The password field is required.'];
    } else if (password.length < 6) {
      errors.password = ['The password must be at least 6 characters.'];
    }

    if (email && !errors.email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        errors.email = ['The email has already been taken.'];
      }
    }

    if (Object.keys(errors).length > 0) {
      return res.status(422).json(validationError(errors));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(422).json(validationError({
        email: ['The email has already been taken.'],
      }));
    }
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const errors = {};

    if (!email) {
      errors.email = ['The email field is required.'];
    }
    if (!password) {
      errors.password = ['The password field is required.'];
    }

    if (Object.keys(errors).length > 0) {
      return res.status(422).json(validationError(errors));
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(422).json(validationError({
        email: ['These credentials do not match our records.'],
      }));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(422).json(validationError({
        email: ['These credentials do not match our records.'],
      }));
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

exports.profile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'name', 'email'],
    });

    if (!user) {
      return res.status(404).json({ message: 'Resource not found.' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};
