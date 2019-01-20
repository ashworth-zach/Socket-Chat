var mongoose = require('mongoose');
var pet = mongoose.model('pet');

module.exports={
 
    get:function (req, res) {
        pet.find({}).sort('type').exec(function (err, tasks) {
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
        pet.findOne({_id:req.params.id},function(err,pet){
            console.log(pet);
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
                    data:pet
                });
            }
        })
    },
    create:function(req,res){
        pet.findOne({name:req.body.name},function(err,y){
            if(y != null){
                res.json({message:"Error", error:"Pet already exists in database"});
            }
            else{
                pet.create({name:req.body.name,type:req.body.type,description:req.body.description},function(err,x){
                    if (err){
                        res.json({
                            message: "Error",
                            error: err
                        })
                    }
                    else{
                        if(req.body.skill1.length>3){
                            x.skills.push(req.body.skill1);
                        }
                        if(req.body.skill2.length>3){
                            x.skills.push(req.body.skill2);
                        }
                        if(req.body.skill3.length>3){
                            x.skills.push(req.body.skill3);
                        }
                        x.likes=0;
                        x.save();
                res.json({message:"success"});

                    }
                })
                
            }
        })
    },
    update:function(req,res){
        pet.findOne({_id:req.params.id},function(err,x){
            console.log(req.body);
            if (err){
                console.log(err)
                res.json({
                    message: "Error",
                    error: err
                })
            }
            else{
                pet.findOne({name:req.body.name},function(err,y){
                    console.log(y);
                    if(y != null){
                        res.json({message:"Error", error:"Pet already exists in database"});
                    }
                    else{
                        pet.updateOne({_id:x._id},{name:req.body.name,type:req.body.type,description:req.body.description},{ runValidators: true },function(err){
                            if (err){
                                console.log(err)
                                res.json({
                                    message: "Error",
                                    error: err
                                })
                            }
                            else{
                                x.skills=[];
                                if(req.body.skill1!= undefined){
                                    x.skills.push(req.body.skill1);
                                }
                                if(req.body.skill2!= undefined){
                                    x.skills.push(req.body.skill2);
                                }
                                if(req.body.skill3!= undefined){
                                    x.skills.push(req.body.skill3);
                                }
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
        pet.deleteOne({_id:req.params.id},function(err){
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
    like:function(req,res){
        pet.findOne({_id:req.params.id},function(err,x){
            x.likes+=1;
            x.save();
            res.json({message:'success', like:x.likes})
        })
    }
}