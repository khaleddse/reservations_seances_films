const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require('joi');
Joi.objectID = require('joi-objectid')(Joi)

const film=new Schema({
    nom:{ type: String, required: true },
    liste_acteurs:{type :[String], validate : {  validator: function(v){
        return v.length > 0
    }, message : 'film acteur must contains at least one acteurs.'}},
    liste_seance:[{ type: mongoose.Schema.Types.ObjectId, ref: "seance" }]
});
let film_validation_schema = Joi.object({
    nom : Joi.string().min(3).required(),
    liste_acteurs : Joi.array().items(Joi.string().min(3)),
    
  
})
function film_validation(body) {
    return film_validation_schema.validate(body);
}

let film_validation_update_schema = Joi.object({
    nom : Joi.string().min(3).required(),
    liste_acteurs : Joi.array().items(Joi.string().min(3)),
    liste_seance : { id: Joi.objectID() },
})
function film_validation_update(body) {
    return film_validation_update_schema.validate(body);
}

const Film = mongoose.model("Film", film);
module.exports.Film = Film;
module.exports.film_validation= film_validation;
module.exports.film_validation_update= film_validation_update;