const router = require("express").Router();
const UserController=require('../controller/User.controller');

//router.get('/',UserController.
router.post('/signup',UserController.signup);
router.post('/login',UserController.login);

module.exports=router;