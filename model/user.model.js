const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');
Joi.objectID = require('joi-objectid')(Joi)

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  nom: {
    type: String,
    required: true
  },
  
  reservation: [
    {
      type: Schema.Types.ObjectId,
      ref: 'reservation'
    }
  ]
});
const user_valid = Joi.object ({
  nom : Joi.string().min(4).required(),
  email : Joi.string().email().required(),
  password : Joi.string().regex(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{4,})")).required(),

})

function user_validate_fun(user){
  let results = user_valid.validate(user);
  return results.error;
}

const User= mongoose.model('User', userSchema);
module.exports.User =User;
module.exports.user_validate_fun = user_validate_fun;
