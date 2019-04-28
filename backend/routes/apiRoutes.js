const router = require('express').Router();
const { playersHandler } = require('../controllers/socketController');

router.get('/get/players', (req, res) => {
    return res.json({ success: true, data: JSON.stringify(playersHandler.getPlayers()) });
});


module.exports = router;