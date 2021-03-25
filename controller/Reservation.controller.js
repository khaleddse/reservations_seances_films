const {reservation} =require('../model/Reservation.model');
const {Seance,seance_validation}=require('../model/Seance.model');
const mongoose = require("mongoose");


exports.getAllReservation = async (req, res) => {
    try {
      const reserv = await reservation.find().populate('user');
 
     res.status(200).json({Reservation:reserv});
    } catch (err) {
      res.status(400).json("Error: " + err);
    }
};

exports.AddReservation = async (req, res) => {

    try {
        
       const { nbr_place} = req.body;
       const {userId}=req.userData;
      
       const seance=await Seance.findById(req.params.id);
       if(!seance){
         return res.status(404).json("seance with this id not found")
       }
       if (seance.nombre_place>=nbr_place){
         seance.nombre_place=seance.nombre_place-nbr_place;
         await seance.save();
         console.log(userId)
         const newReservation = new reservation({ 
            user:userId,
            seance:req.params.id,
            nbr_place:nbr_place
        });
          const Rst=await newReservation.save();
          
         res.status(200).json({message:"seance reservée avec succes",Reservation:Rst});
       }else{
         throw new Error("il n'est pas encore de place")
        }
    } catch(err){
       res.status(400).json({"error":err.message});
    }
};
    
