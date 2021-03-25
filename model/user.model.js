const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
const User= mongoose.model('User', userSchema);
module.exports=User; 
