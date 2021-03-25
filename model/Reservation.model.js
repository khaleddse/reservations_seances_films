const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require('joi');
Joi.objectID = require('joi-objectid')(Joi)

const Reservation=new Schema({
    user:[{ type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
     }],
    seance:[{ type: mongoose.Schema.Types.ObjectId,
         ref: "seance" 
        }],
    nbr_place:{type:Number,
        required: true
    }

})
const reservation = mongoose.model("reservation", Reservation);
module.exports.reservation = reservation;