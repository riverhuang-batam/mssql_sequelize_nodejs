const express = require('express'),
    router = express.Router(),
    userController = require('./controllers/userController'),
    checkToken = require('./middleware/checkToken')

router.get('/', (_, res) => res.status(200).json({
    'message' : 'welcome back'
}))

router.post('/user/register', userController.register);
router.post('/user/login', userController.login);
router.get('/user/profile', checkToken, userController.getProfile);

module.exports = router;