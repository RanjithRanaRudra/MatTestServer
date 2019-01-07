const mongoose = require('mongoose');

let owner_schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 25,
    },
    dob: {
        type: Date,
        required: true,
        minlength: 10,
        maxlength: 25
    },
    address: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    }
});

owner_schema.statics = {
    getName : ()=> {
        return this.name;
    },
    setName: (name)=> {
        this.name = name;
    },
    getDOB: ()=> {
        return this.dob;
    },
    setDOB: (dob)=> {
        this.dob = dob;
    },
    getAddress: ()=> {
        return this.address;
    },
    setAddress: (address) => {
        this.address = address;
    }
}

let owner_model = mongoose.model('Owner', owner_schema);

module.exports = {
    Owner: owner_model
};