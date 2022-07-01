const jwt = require('jsonwebtoken');

async function checkToken(req, res, next) {
  const authHeader = req.headers['authorization']; //Token
  const token = authHeader && authHeader.split(' ')[1];

  if (token === null) {
    return res.status(401).json({ error: 'Null token' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) {
      return res.status(403).json({ error: error.message });
    }
    //req.user = user;
    next();
  });
}

async function createToken(req, res, next) {
  const token = jwt.sign(
    { login: req.body.name, password: req.body.password },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '2h' }
  );

  res.json(token);

  next();
}

module.exports = { checkToken, createToken };
