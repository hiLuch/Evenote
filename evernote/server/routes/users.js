const express = require('express');
const router = express.Router();
const { User } = require('../db/models');
const bcrypt = require('bcrypt');

router.post('/registration', async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;
    const checkUser = await User.findOne({ where: { email } });
    if (!checkUser) {
      const hashPass = await bcrypt.hash(password, 10);

      const user = await User.create({ name, email, password: hashPass });
      req.session.user = user.name;
      res.json(user);
      res.end();
    } else {
      res.json({ email: false });
    }
  } catch (err) {
    console.log(err, 'ошибка в руте регистр');
  }
});

router.get('/', (req, res) => {
  res.json({ user: req.session.user });
});

router.post('/login', async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const chekUser = await User.findOne({ where: { email } });
    if (chekUser) {
      const checkPass = await bcrypt.compare(password, chekUser.password);
      if (checkPass) {
        console.log('login OK');
        req.session.user = chekUser.name;
        res.json(chekUser);
        res.end();
      } else {
        console.log('пароль не тот');
        // res.json({ password: false });
        res.status(401).json({ text: 'неверный пароль' });

        res.end();
      }
    } else {
      // res.json({ email: false });
      res.status(401).json({ text: 'неверный email' });
      res.end();
    }
  } catch (err) {
    console.log(err, 'err in router login');
  }
});

router.delete('/logout', async (req, res) => {
  try {
    req.session.destroy(() => {
      res.clearCookie('authCookie');
      res.json({ user: '' });
    });
  } catch (err) {
    console.log(err, 'ошибка в руте destroy user');
  }
});
module.exports = router;
