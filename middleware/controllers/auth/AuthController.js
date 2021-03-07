let express = require('express');
const cookieParser = require('cookie-parser');
let router = express.Router();

let bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());
router.use(cookieParser());
const {Pool} = require('pg');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');

const authRequests = require('../../sql/queryes/auth.js');
let config = require('../config.js');

const pool = new Pool({
  connectionString: 'postgres://wixtgkfktbzpov:2d40f9096d22e9ad3bb47ede4f03b45fe77cf98e86ef00a92dc057e083894161@ec2-54-155-35-88.eu-west-1.compute.amazonaws.com:5432/d8i1usb6pfsfg',
  ssl: true,
});

router.post('/register', function (req, res) {
  let hashedPassword = bcrypt.hashSync(req.body.password, 8);
  pool.query(authRequests.createUser, [req.body.login, hashedPassword, req.body.first_name, req.body.last_name], (err, result) => {
    if (err) return res.status(500).send({message: "There was a problem registering the user.", err: err});
    // if (!result.rows[0]) return res.status(403).send({message: "User already exists."});
    res.status(200).send({message: "User successfully added."});
  });
});

router.post('/login', function (req, res) {
  pool.query(authRequests.find_user_with_login, [req.body.login], (err, result) => {
    if (err) return res.status(500).send({message: 'Error on the server.'});
    if (!result.rows[0]) return res.status(404).send({message: 'No user found.'});
    let passwordIsValid = bcrypt.compareSync(req.body.password, result.rows[0].password);
    if (!passwordIsValid) return res.status(401).send({message: 'Login or password incorrect.'});
    let token = jwt.sign({id: result.rows[0].id}, config.secret, {
      expiresIn: 83600 //expires in 1 hour
    });
    res.cookie('token', token, {maxAge: 3600000}).status(200).send({ // expires in 1 hour
      auth: true,
      token: token,
      active: result.rows[0].active,
      login: result.rows[0].login
    });
  });
});

router.get('/logout', function (req, res) {
  res.cookie("token", null);
  res.status(200).send({auth: false, token: null});
});

module.exports = router;
