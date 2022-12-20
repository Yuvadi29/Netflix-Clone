const addToLiked = require('../controllers/UserController');

const router = require("express").Router();

router.post('/add',(req,res) => addToLiked);

module.exports = router;