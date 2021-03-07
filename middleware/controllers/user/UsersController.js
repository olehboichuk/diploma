let express = require('express');
let router = express.Router();
const {Pool} = require('pg');
let bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());
let jwt = require('jsonwebtoken');
const userRequests = require('../../sql/queryes/user.js');

const pool = new Pool({
  connectionString: 'postgres://wixtgkfktbzpov:2d40f9096d22e9ad3bb47ede4f03b45fe77cf98e86ef00a92dc057e083894161@ec2-54-155-35-88.eu-west-1.compute.amazonaws.com:5432/d8i1usb6pfsfg',
  ssl: true,
});

router.route('/user/files')
  .get((req, res) => {
    let token = req.header('x-access-token');
    let id = jwt.decode(token).id;
    pool.query(userRequests.find_user_files, [id], (err, result) => {
      if (err) return res.status(500).send({message: 'Error on the server.'});
      res.status(200).json(result.rows)
    });
  });

router.route('/user/file')
  .post((req, res) => {
    let token = req.header('x-access-token');
    let id = jwt.decode(token).id;
    pool.query(userRequests.add_file_to_user, [req.body.name, req.body.data], (err, result) => {
      if (err) return res.status(500).send({message: 'Error on the server.'});
      let fileId = result.rows[0].id;
      pool.query(userRequests.add_reference_file_to_user, [id, fileId], (err, resul) => {
        if (err) return res.status(500).send({message: 'Error on the server.'});
        res.status(200).json(result.rows)
      });
    });
  });

router.route('/user/file/:id_file')
  .get((req, res) => {
    let token = req.header('x-access-token');
    let id = jwt.decode(token).id;
    pool.query(userRequests.find_user_file, [id, req.params.id_file], (err, result) => {
      if (err) return res.status(500).send({message: 'Error on the server.'});
      res.status(200).json(result.rows)
    });
  })
  .delete((req, res) => {
    pool.query(userRequests.delete_user_file, [req.params.id_file], (err, result) => {
      if (err) throw err;
      res.status(200).json(result.rows)
    });
  });

module.exports = router;
