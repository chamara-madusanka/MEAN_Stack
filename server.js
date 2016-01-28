var express = require('express');

var app = express();

var mongojs = require('mongojs');

var bodyParser = require('body-parser');

var db = mongojs('contactlist', ['contactlist']);

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());

app.get('/contactlist', function(req, res) {
    
    console.log("I recieved a get request.");

    db.contactlist.find(function(error, docs) {
        console.log(docs);
        res.json(docs);    
    });
    
});

app.post('/contactlist', function(req, res) {
    console.log(req.body);
    db.contactlist.insert(req.body, function(error, docs) {
        res.json(docs);
    });
});

app.delete('/contactlist/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);
    db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(error, docs) {
        res.json(docs);
    });
});

app.get('/contactlist/:id', function(req, res) {
    var id = req.params.id;
    db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(error, docs) {
        res.json(docs);
    });
    
});

app.put('/contactlist/:id', function(req, res) {
    var id = req.params.id;
    console.log(req.body.name);
    db.contactlist.findAndModify({query:{_id: mongojs.ObjectId(id)},
                                  update:{$set:{
                                      name: req.body.name,
                                      email: req.body.email, 
                                      number:req.body.number}},
                                  new: true}, function(error, docs) {
        res.json(docs);
    });
});

app.listen(3000);
console.log("Server is running on port 3000");