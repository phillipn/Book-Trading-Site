var express = require('express');
var router = express.Router();
var ctrlGoogle = require('../controllers/google');
var ctrlBooks = require('../controllers/books');
var ctrlAuth = require('../controllers/authentication');
var jwt = require('express-jwt');

var auth = jwt({
 secret: process.env.JWT_SECRET,
 userProperty: 'payload'
});

router.get('/genres', ctrlBooks.searchForGenres);
router.get('/books', ctrlBooks.searchForBooks);
router.post('/books', auth, ctrlBooks.addMyBook);
router.get('/books/:bookid', auth, ctrlBooks.findBook);
router.post('/books/:bookid', auth, ctrlBooks.requestBook);
router.put('/books/:bookid/requests/:requestid', ctrlBooks.updateRequest);

router.get('/google/books', ctrlGoogle.searchForBooks);

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
router.post('/changePassword', ctrlAuth.changePassword);
router.post('/changeLocation', ctrlAuth.changeLocation);

module.exports = router;
