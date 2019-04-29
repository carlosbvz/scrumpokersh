const router = require('express').Router();
const { playersHandler } = require('../controllers/socketController');

router.get('/get/players', (req, res) => {
    return res.json({ success: true, data: JSON.stringify(playersHandler.getAll()) });
});
router.post('/update/player', (req, res) => {
    const { id, name, score } = req.body;
    playersHandler.update({id, name, score});
    return res.json({ success: true });
});
router.post('/delete/player', (req, res) => {
    const { id } = req.body;
    playersHandler.deleteById(id);
    return res.json({ success: true });
});
router.post('/delete/estimates', (req, res) => {
    playersHandler.deleteEstimates();
    return res.json({ success: true });
});



module.exports = router;