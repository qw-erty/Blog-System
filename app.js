//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
require('dotenv').config();

const homeStartingContent = "";
const aboutContent = "";
const contactContent = "";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String,
  type: String,
  img: String
};

const contactSchema = {
  name: String,
  email: String,
  reason: String,
  detail: String
};

const Post = mongoose.model("Post", postSchema);
const Contact = mongoose.model("Contact", contactSchema);

app.get("/tp",function(req,res){
  res.render("tp");
});

app.get("/choice",function(req,res){
  res.render("choice");
});

app.get("/",function(req,res){
  res.render("start");
});

app.get("/home", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/home/finance", function(req, res){

  Post.find({type : "Financial"}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/home/technical", function(req, res){

  Post.find({type : "Technical"}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/home/news", function(req, res){

  Post.find({type : "News"}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/home/general", function(req, res){

  Post.find({type : "General"}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});


app.get("/compose", function(req, res){
  res.render("compose");
});


app.get("/contact", function(req, res){
  res.render("contact" ,{
    responseHead: "Failure",
    responseBody: "Please try again" 
  });
});

app.post("/compose", function(req, res){

  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
    type: req.body.postType,
    img: req.body.postImg
  });


  post.save(function(err){
    if(!err){
      res.redirect("/compose");
    }
    
  });
});

app.post("/contact", function(req, res){

  const contact = new Contact({
    name: req.body.contactName,
    email: req.body.contactEmail,
    reason: req.body.contactReason,
    detail: req.body.ContactBody
  });

  contact.save(function(err){
    if (!err){
      res.render("contact" ,{
      responseHead: "Sucess",
      responseBody: "we will revert back to you within 7 working days" 
    });
  }
  else{
    res.render("contact" ,{
      responseHead: "Failure",
      responseBody: "Please try again" 
    });
  }
  });
});


app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content,
      img: post.img
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started on port 3000");
});



