var mongoose = require('mongoose');
var Schema=mongoose.Schema;
mongoose.Promise = global.Promise;
var User = new mongoose.Schema({
    name: {
        type: String,
        minlength:[3,'name must be longer than 3 characters'],
        maxlength:[100,'name cannot be over 100 characters'],
        required:[true, 'name cannot be empty'],
    },
    type:{
        type:String,
        minlength:[3,'type must be longer than 3 characters'],
        maxlength:[100,'type cannot be over 100 characters'],
        required:[true, 'type cannot be empty'],

    },
    description:{
        type:String,
        minlength:[3,'description must be longer than 3 characters'],
        maxlength:[100,'description cannot be over 100 characters'],
        required:[true, 'description cannot be empty'],

    },
    skills:{
        type:[String],
    },
    likes:{
        type:Number
    }
}, {
    timestamps: true
})
mongoose.model('User',User);