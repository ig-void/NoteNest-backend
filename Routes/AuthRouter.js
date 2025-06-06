const { signup, login } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');

const router= require('express').Router();

// router.post('/login',(req,res)=>{
//     res.send('Login successful');
// });
//IN express only firest matching routes is considered
router.post('/login',loginValidation,login);
router.post('/signup',signupValidation,signup);
module.exports=router;