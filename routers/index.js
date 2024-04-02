const router = require('express').Router()
const userController = require('../controllers/userController')


//users endpoint
router.post('/login', userController.login)
router.post('/add-user', userController.addUser)


module.exports= router
