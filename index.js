//********* */ This is the main file **************
const express=require('express');
const mongoose=require("mongoose")
require("dotenv/config")

const app=express();

app.use(express.json())

app.get('/',(req,res)=>{
    res.send("User Api Authentication.\n for register : http://localhost:5000/api/users/register.\n for login : http://localhost:5000/api/users/login")

})

// imports the routes ...
const userRoutes=require('./routes/auth');
const postRoutes=require('./routes/posts')
app.use("/api/users",userRoutes)
app.use("/api/posts",postRoutes)

mongoose.connect(process.env.DB_CONNECTION)


app.listen(5000,()=>{
    console.log("server started at 5000")
})