const {User}=require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
    
    const {email,password,nom} = req.body;
    
    try {
        const userDoc = await User.findOne({ email: email });
        if (userDoc) {
          return res.status(404).json({ message: "email déja existe" });
        }
      const hashedPw = await bcrypt.hash(password, 12);
  
      const user = new User({
        email: email,
        password: hashedPw,
        nom: nom
      });
      const result = await user.save();
      res.status(201).json({ message: 'User created!', userId: result._id });
    } catch (err) {
        res.status(400).json({"error":err.message});
    }
      
    
};


exports.login = async (req, res, next) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(401).json({ message: 'vous avez pas un compte!' });
      }
  console.log(user)
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (isMatch) {
        const { _id, email, nom } = user;
        const payload = {
          userId: _id,
          email,
          nom, 
        };
  
        const token = await jwt.sign(payload, 'reservation2021!', { expiresIn: 3600 });
  
        if (token) {
          res.status(200).json({ success: true, token: 'Bearer ' + token });
        }
      } else {
        return res.status(400).json({ message: 'mot de passe incorrect' });
      }
    } catch (err) {
      return res.status(400).json({ err:err.message });
    }
  };