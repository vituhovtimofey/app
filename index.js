const BlogPost = require('./models/BlogPost.js')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const ejs = require('ejs')
const path = require('path')
const express = require('express')
const app = new express()
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true})

app.listen(4000, () => {
  console.log('App listening on port 4000')
})

app.get('/', async(req, res) => {
  const blogposts = await BlogPost.find({})
  res.render('index', {
    blogposts
  });
})

app.get('/about', (req, res) => {
  res.render('about');
})

app.get('/post', (req, res) => {
  res.render('post');
})

app.get('/contact', (req, res) => {
  res.render('contact');
})

app.get('/posts/new', (req, res) => {
  res.render('create')
})

app.post('/posts/store', (req, res) => {
  BlogPost.create(req.body);
  res.redirect('/')
})


