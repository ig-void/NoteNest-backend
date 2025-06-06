// void@100%coder   mongodb+srv://igvoid:<db_password>@cluster0.qvy9zkd.mongodb.net/   mongodb+srv://igvoid:<db_password>@practice.fqt3qud.mongodb.net/
const mongoose= require('mongoose');

const mongo_url= process.env.MONGO_CONN;
 mongoose.connect(mongo_url)
 .then(()=>{
    console.log("MongoDB Connected...");
 }).catch((err)=>{
    console.log("Mongo connection failed",err);
 })