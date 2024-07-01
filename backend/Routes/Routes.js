import express from 'express';
import { Useregistercontroller, Userlogincontroller } from '../Controllers/Usercontroller.js';
import jwtmiddleware from '../Middleware/Jwtmiddleware.js';
import { Taskaddcontroller, Taskdeletecontroller, Taskeditcontroller, Taskgetusercontroller, Tasksearchcontroller } from '../Controllers/Taskcontroller.js';
const router = express.Router();

router.post('/user/register',Useregistercontroller.register)
router.post('/user/login', Userlogincontroller.login)
router.post('/user/addtask',jwtmiddleware,Taskaddcontroller.taskadd)
router.get('/user/alltask',jwtmiddleware,Taskgetusercontroller.taskgetuser)
router.put('/user/task/edit/:id',jwtmiddleware,Taskeditcontroller.taskedit)
router.delete('/user/task/delete/:id',jwtmiddleware,Taskdeletecontroller.taskdelete)
router.get('/user/task/search', jwtmiddleware, Tasksearchcontroller.tasksearch)

export default router;