const mongoose = require('mongoose');

const mongoDbConnect = async () => {
  const uri = "mongodb://localhost:27017/Reservation_Film";
  mongoose.set('useFindAndModify', false);
  //mongoose.set('debug', true)
  try {
    return await mongoose.connect(uri, 
        { useNewUrlParser: true, 
          useCreateIndex: true, 
          useUnifiedTopology: true 
        })
  } catch(err) {
    console.error(err)
    throw err
  }
}

module.exports = mongoDbConnect