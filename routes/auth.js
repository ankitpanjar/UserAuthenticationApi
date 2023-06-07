const router=require("express").Router();
const User=require("../models/user");
const bcrypt=require('bcryptjs');
const {registerValidation,loginValidation} =require("../validation");
const jwt=require("jsonwebtoken")

// get the data ....

router.get('/',(req,res)=>{
    res.send("inside the user...")
});

// register the data ......

router.post('/register',async(req,res)=>{
    // res.send(req.body)
    // validate the user data  .....
    const {error}=registerValidation(req.body);
    // res.send(error)
    if(error) return res.status(400).send(error.details[0].message)

    // checking the user email is already exist or not....

    const emailExist=await User.findOne({email:req.body.email})
    // return res.send(emailExist)
    if(emailExist) return res.status(400).send("Email already exist.")


    // making password as encrypted ...
    const salt=await bcrypt.genSalt(10); // use 10 here for 
    const hashedPassword=await bcrypt.hash(req.body.password,salt);
    // res.send(hashedPassword);

    const user= new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword
    });

    try{
        const saveUser=await user.save();
        res.status(200).send({
            user:saveUser._id
        })
    }catch(err){
        res.status(400).send({
            status:"failed",
            mesg:err
        })
    }
});

// login
router.post('/login',async(req,res)=>{
    // res.send(req.body);
    // validation of user data
    const { error }=loginValidation(req.data);
    if(error) return res.status(400).send(error.details[0].message)

// checking the user email is present or not
    const user=await User.findOne({email:req.body.email})
    // return res.send(emailExist)
    if(!user) return res.status(400).send("Invalid Email");

    // decrepted the password: checking the password
    const validPass=await bcrypt.compare(req.body.password,user.password);
    if(!validPass) res.status(400).send("Invalid Password .")

    // creating a token for the user ...
    const token =jwt.sign({_id: user._id},process.env.TOKEN_SECRET)
    // res.send(token)
    res.header('auth-token',token).send(token)
});

module.exports=router;