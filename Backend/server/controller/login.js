const bcrypt = require('bcrypt');
const User = require('../model/user');
const userDB = require('../model/user');

exports.check = (req, res) => {
  const { email, password } = req.body;

  userDB.findOne({ email }, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ status: 'Error', message: 'Internal server error' });
    }
    if (!data) {
      return res.status(401).json({ status: 'Error', message: 'Invalid email or password' });
    }
    const passwordValidator = bcrypt.compareSync(password, data.password);
    if (!passwordValidator) {
      return res.status(401).json({ status: 'Error', message: 'Invalid email or password' });
    }
    const { _id: id, usertype, username } = data;
    res.status(200).json({ status: 'success', data: { id, usertype, username } });
  });
};