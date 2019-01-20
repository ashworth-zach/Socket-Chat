var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports={
    getall:function (req, res) {
        User.find({}).sort('type').exec(function (err, tasks) {
            if (err) {
                res.json({
                    message: "Error",
                    error: err
                })
            } else {
                res.json({
                    message: "success",
                    data: tasks
                })
    
            }
        })
    },
    getone:function(req,res){
        User.findOne({_id:req.params.id},function(err,User){
            console.log(User);
            if (err){
                console.log(err)
                res.json({
                    message: "Error",
                    error: err
                })
            }
            else{
                res.json({
                    message: "Success",
                    data:User
                });
            }
        })
    },
    create:function(req,res){
        User.findOne({name:req.body.name},function(err,y){
            if(y != null){
                res.json({message:"Error", error:"User already exists in database"});
            }
            else{
                User.create({name:req.body.name},function(err,x){
                    if (err){
                        res.json({
                            message: "Error",
                            error: err
                        })
                    }
                    else{
                        x.save();
                        res.json({message:"success"});

                    }
                })
                
            }
        })
    },
    update:function(req,res){
        User.findOne({_id:req.params.id},function(err,x){
            console.log(req.body);
            if (err){
                console.log(err)
                res.json({
                    message: "Error",
                    error: err
                })
            }
            else{
                User.findOne({name:req.body.name},function(err,y){
                    console.log(y);
                    if(y != null){
                        res.json({message:"Error", error:"Uesr already exists in database"});
                    }
                    else{
                        User.updateOne({_id:x._id},{name:req.body.name},{ runValidators: true },function(err){
                            if (err){
                                console.log(err)
                                res.json({
                                    message: "Error",
                                    error: err
                                })
                            }
                            else{
                                x.save();
                                res.json({message:"success"});
                            }
                        })
                    }
            })
        }
        
    })
},
    delete:function(req,res){
        User.deleteOne({_id:req.params.id},function(err){
            if (err){
                console.log(err)
                res.json({
                    message: "Error",
                    error: err
                })
            }
            else{
                res.json({message:"success"});
            }
        })
    },
}