const express = require('express');
const app = express();
const bodyParser= require('body-parser')

app.use(express.static(__dirname + '/styles'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

var passport = require('passport');
var ObjectId = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://treklore:531dU7aB@ds145299.mlab.com:45299/treklore', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, function() {
    console.log('listening on 3000')
  })
})

app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
   if (err) return console.log(err)
   res.render('index.pug', {title: 'Master Developer Quotes', quotes: result})
  })
})

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
});

app.delete('/quotes', (req, res) => {
  console.log(req.body._id)
  db.collection('quotes').deleteOne({"_id" : ObjectId(req.body._id)},
  (err, result) => {
    if (err) return res.send(500, err)
    res.send('A darth vadar quote got deleted')
  })
})
