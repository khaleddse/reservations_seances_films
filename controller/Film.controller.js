const {Film,film_validation}=require('../model/Film.model');
const mongoose = require("mongoose");

exports.getAllFilm = async (req, res) => {
    try {
      const film = await Film.find().populate('liste_seance')
      res.status(200).json({film:film});
    } catch (err) {
      res.status(400).json("Error: " + err);
    }
  };

exports.AddFilm = async (req, res) => {
    
   
    try {
        let results = film_validation(req.body);
        console.log(results)
        if(results.error)
            return res.status(400).json({message:results.error.details[0].message});
        const { nom, liste_acteurs} = req.body;
        const newfilm = new Film({ nom, liste_acteurs });
      const films = await newfilm.save()
      res.status(200).json({film:films,message:"film added"});
    } catch (err) {
      res.status(400).json({Error:err.message});
    }
}
    exports.deleteFilm = async (req, res) => {
        try {
          const Rst = await Film.findByIdAndDelete(req.params.id);
          if (Rst) {
            res.status(200).json("Film Deleted");
          } else {
            throw new Error("Film Undefined ");
          }
        } catch (err) {
          res.status(400).json("Error" + err);
        }
    };

    exports.findFilmById = async (req, res) => {
        try {
          const film = await Film.findById(req.params.id).populate('liste_seance');
          res.status(200).json(film);
        } catch (err) {
          res.status(400).json("Error" + err);
        }
      };
      exports.UpdateFilm = async (req, res) => {
        const filmupdate = req.body;
        try {
          const Rst = await Film.findByIdAndUpdate(
            req.params.id,
            { $set: filmupdate },
            { new: true }
          );
          if (Rst) {
            res.status(200).json({message:"film Updated"  ,categories:Rst});
          } else {
            throw new Error("film Undefined ");
          }
        } catch (err) {
          res.status(400).json("Error" + err.message);
        }
      };