const router = require('express').Router();
const { isGuest, isUser } = require('../middlewares/guards');

router.get('/', async (req, res) => {
    const plays = await req.storage.getPublicPlays();
    res.render('home', { plays });
});

module.exports = router;
