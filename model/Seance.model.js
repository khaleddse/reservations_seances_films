const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require('joi');
Joi.objectID = require('joi-objectid')(Joi)


const seance=new Schema({
    date:{
        type:String,
        required:true
    },
    temps:{type:String,
        required:true
    },
    nombre_place:{type:Number,
        required:true
    },
    
})
let seance_validation_schema = 
Joi.object({
    date:Joi.string().regex(new RegExp("^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.]((19|20)\\d\\d)$")),
    temps : Joi.string().min(3).required(),
    nombre_place : Joi.number().positive(),
   
})
function seance_validation(body) {
    return seance_validation_schema.validate(body);
}



const Seance = mongoose.model("seance", seance);
module.exports.Seance = Seance;
module.exports.seance_validation = seance_validation;
