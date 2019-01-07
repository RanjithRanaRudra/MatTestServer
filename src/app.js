const express = require('express');
const _ = require('lodash');
const body_parser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const {Owner} = require('./models/owner');

const port = 3000;

const app = express();
app.use(
    body_parser.json(),
    (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        next();
  });

app.get('/', (req, res)=> {
    res.send('hello World');
});

// Creating Owner 
app.post('/createOwner', (req, res)=> {
    let owner = new Owner({
        name: req.body.name,
        dob: req.body.dob,
        address: req.body.address
    });

    owner.save().then((result) => {
        res.status(200).send(JSON.stringify(result, undefined, 2));
    }).catch((err) => {
        res.status(400).send(err);
    });
});

// getting all the Owners
app.get('/getOwners', (req, res)=> {
    Owner.find().then((result)=> {
        res.status(200).send(result);
    }).catch((err)=> {
        res.status(400).send(err);
    });
});

// delete a record
app.delete('/deleteOwner/:id', (req, res) => {
    let id = req.params.id;
    if(!ObjectID.isValid(id)) {
        res.status(404).send();
    }
    Owner.findByIdAndDelete(id).then((owner) => {
        if(!owner) {
            res.status(404).send();
        }
        Owner.find().then((result)=> {
            res.status(200).send(result);
        }).catch((err)=> {
            res.status(400).send(err);
        });
    }).catch((e)=> res.status(400).send(e));
});

app.listen(port, ()=> {
    console.log(`Server running on port : ${port}`);
});