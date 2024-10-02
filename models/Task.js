const mongo  = require("mongoose");

const mongoschema = new mongo.Schema({

    Task:{
    type:String
},

Discription:{
    type:String
},

Taskdate:{
    type:String
}
})

const mon = mongo.model('User',mongoschema)

module.exports=mon