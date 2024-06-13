const express = require("express");
const  app = express();
const path = require("path");
const userModel = require('./models/user')
const jwt = require("jsonwebtoken"); 
const cookieParse = require('cookie-parser');
const contactModel = require('./models/contact');
const contact = require("./models/contact");
const crypto = require('crypto');
const bodyParser = require('body-parser');

app.use(express.json());
app.set("view engine","ejs");
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json());
  
app.get("/",function(req ,res){
res.render('index')
});

app.get("/register", function(req ,res){
res.render("register");
});

app.get("/login", function(req ,res){
res.render("index");
});

app.get("/main",function(req ,res){
    res.render("main");
});

app.get ("/courses", function(req ,res){
  res.render("courses")
});

app.get ("/contact", function(req ,res){
  res.render("contact");
});
  
app.get ("/about", function(req ,res){
    res.render("about");
});
  
app.get ("/underwork", function(req ,res){
  res.render("undercon");
});

app.get ("/logout", function(req ,res){
  res.cookie("token","")
  res.redirect("/login")
});

app.post("/login",async function(req ,res){
   let user =  await userModel.findOne({email: req.body.email, password:req.body.password})
   if(!user){  
      res.redirect("/login") 
   }
    else{
      let token = await jwt.sign({email: req.body.email,password: req.body.password},"aliooooo0");
   res.cookie("token",token)
   console.log(token);
   console.log(user);
      res.redirect("main");
    }
});
 
app.post("/register",async function(req ,res){
   let{name,email,password,age} = req.body;
   let registerUser = await userModel.create({
    name,
    email,
    password,
    age,
   });
   let tokens = jwt.sign({email},"aliooo");
   res.cookie("token",tokens)
   res.redirect("main")
   console.log(registerUser);
});

app.post("/contact", async function(req ,res){
let{nameo,emailo,message}=req.body;
 let contactUser = await contactModel.create({
  nameo,
  message,
  emailo,
 });
  console.log(contactUser);
  res.redirect("main");
});


const port = 9000
app.listen(port,()=>(
console.log(" port is working || 9000 ")
));   