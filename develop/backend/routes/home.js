import express from 'express'

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/secret', function (req, res, next) {
    // res.render('index', {title: 'Express'});
    res.send('secret');

});

module.exports = router;
