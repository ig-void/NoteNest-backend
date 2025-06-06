const UserModel = require("../Models/User");
const bcrypt= require('bcrypt');
const jwttoken=require('jsonwebtoken');
const signup= async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        const user=await UserModel.findOne({email})
        if(user){
            return res.status(409)
            .json({message:'User is already existing, You can login ', success:false});
        }
        const userModel=new UserModel({name,email, password});
        userModel.password = await bcrypt.hash(password,10);
        await userModel.save();
        res.status(201)
        .json({
            message:"Signup successfull",
            success:true
        })
    }catch(err){
        res.status(500)
        .json({
            message:"Internal server error",
            success:false
        })

    }

}
const login= async(req,res)=>{
    try{
        const {email,password}=req.body;
        console.log("Login attempt:", email, password);
        const user=await UserModel.findOne({email});
        console.log("User found:", user);
        const mess='Authentication failed, Email or Password is wrong ';
        if(!user){
            return res.status(403)
            .json({message:mess,
                 success:false});
        }
       const isPassEqual =await bcrypt.compare(password,user.password);
       console.log("Password match:", isPassEqual);
       if(!isPassEqual)
       {
         return res.status(403)
            .json({message:mess,
                 success:false});
       }
       const token=jwttoken.sign(
        {email:user.email,_id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:'24h'}
    )
        res.status(200)
        .json({
            message:"Login successfull",
            success:true,
            token,
            email,
            name:user.name
        })
    }catch(err){
        console.log("Password match:", isPassEqual);
        res.status(500)
        .json({
            message:"Internal server error",
            success:false
        })

    }

}
module.exports={
    signup,
    login
}