const { Router } = require('express');
const userRoutes = require('./usuarioRotas');
const adminRoutes = require('./adminRotas');
const adminController = require('../controllers/adminController');

const router = Router();

router.use('/user', userRoutes );
router.use('/admin', adminRoutes)
router.post('/login', (req, res) => {
    adminController.login(req, res)
});
router.put('/updateSenha/:id', (req,res) => {
    adminController.updateSenha(req, res)
});


module.exports = router;