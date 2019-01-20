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
    // profile_pic:{
    //     type:String,
    //     required:[true, 'description cannot be empty'],

    // },
    message:{
        type:String,
        minlength:[1,'message must be longer than 1 characters'],
        maxlength:[100,'message cannot be over 100 characters'],
        required:[true, 'message cannot be empty'],
    }    
},{
    timestamps: true
})
mongoose.model('User',User);