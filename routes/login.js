var express = require('express');
var router = express.Router();
var db = require('../db/db.js');

const getUserByEmail = (email, callback) => {
    db.get('SELECT * FROM user WHERE email = ?', [email], (error, row) => {
      if (error) return callback(error, null);
  
      callback(null, row);
    });
  };

router.post('/', async function(req, res) {
    const { email, password } = req.body;
  
    try {
      getUserByEmail(email, async (error, user) => {
        if (error) {
          console.error('Error fetching:', error.message);
          return res.status(500);
        }
  
        if (!user) return res.status(401).json({ message: 'Invalid email or password' });

        if (password === user.password) return res.json({ user });

        return res.status(401).json({ message: 'Invalid email or password' });
      });
    } catch (error) {
      console.error('Login failed:', error.message);
      return res.status(500);
    }
});

module.exports = router;
