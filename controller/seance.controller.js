const {Seance,seance_validation}=require('../model/Seance.model');
const {Film,film_validation}=require('../model/Film.model');
const mongoose = require("mongoose");

exports.getAllSeance = async (req, res) => {
    try {
      const seance = await Seance.find();
     res.status(200).json({seance:seance});
    } catch (err) {
      res.status(400).json("Error: " + err);
    }
  };

  exports.AddSeance = async (req, res) => {
    
    
    try {
        let results = seance_validation(req.body);
        console.log(results)
    if(results.error)
        return res.status(400).json({message:results.error.details[0].message});
    const { date, temps, nombre_place} = req.body;
    const newseance = new Seance({ date, temps, nombre_place});
      const seance = await newseance.save();
      await Film.findByIdAndUpdate(req.params.id, {
        $push: { liste_seance: seance._id },
      });
    
      res.status(200).json({seance:seance,message:"film added"});
    } catch (err) {
      res.status(400).json({Error:err.message});
    }
}
    exports.deleteSeance= async (req, res) => {
        try {
          const Rst = await Seance.findByIdAndDelete(req.params.id);
          if (Rst) {
            res.status(200).json("Seance Deleted");
          } else {
            throw new Error("Seance Undefined ");
          }
        } catch (err) {
          res.status(400).json("Error" + err);
        }
      };
      exports.FindSeanceById = async (req, res) => {
        try {
          const seance = await Seance.findById(req.params.id)
          res.status(200).json(seance);
        } catch (err) {
          res.status(400).json("Error" + err);
        }
      };
      exports.UpdateSeance = async (req, res) => {
        const seanceUpdate = req.body;
        try {
          const Rst = await Seance.findByIdAndUpdate(
            req.params.id,
            { $set: seanceUpdate },
            { new: true }
          );
          if (Rst) {
            res.status(200).json({message:"seance Updated"  ,categories:Rst});
          } else {
            throw new Error("Seance Undefined ");
          }
        } catch (err) {
          res.status(400).json("Error" + err.message);
        }
      };