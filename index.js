const express= require('express');
const app=express();
require('dotenv').config();
require('./Models/db');
const AuthRouter= require('./Routes/AuthRouter')
const cors= require('cors')
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const NoteRouter = require('./Routes/NoteRouter');
app.get('/', (req, res) => {
  res.send('✅ Backend is running successfully!');
});
app.use(express.json());
app.use(bodyParser.json());
app.get('/ping',(req,res)=>{
    res.send("pongn")
})
app.use(cors());// Cors is used for takig request from global
app.use('/auth',AuthRouter);
app.use('/notes', NoteRouter);
app.listen(PORT,()=>{
    console.log('The app is running on port $(PORT)');
})
