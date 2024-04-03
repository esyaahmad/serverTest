const router = require('express').Router()
const leaveController = require('../controllers/leaveController')
const userController = require('../controllers/userController')
const { authentication } = require('../middlewares/authentication')


//users endpoint
router.post('/login', userController.login)
router.post('/add-user', userController.addUser)
router.use(authentication)

router.get('/users', userController.getUsers)
router.get('/users-by-department', userController.getUsersByDepartment)
router.get('/users-supervisor-by-department', userController.getUsersByDepartmentSupervisor)
router.get('/users-manager-by-department', userController.getUsersByDepartmentManager)
router.get('/users-by-id-login', userController.getUsersByIdLogin)

router.post('/add-leave-request', leaveController.addLeaveRequest)
router.get('/leave-report', leaveController.getLeaveReports)



// router.get('/users/:id', projectController.getProjectsById)


module.exports= router
