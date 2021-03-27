const { reservation } = require("../model/Reservation.model");
const { Seance, seance_validation } = require("../model/Seance.model");
const mongoose = require("mongoose");

exports.getAllReservation = async (req, res) => {
  try {
    const reserv = await reservation.find().populate("user");

    res.status(200).json({ Reservation: reserv });
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

exports.AddReservation = async (req, res) => {
  try {
    const { nbr_place } = req.body;
    const { userId } = req.userData;

    const seance = await Seance.findById(req.params.id);
    if (!seance) {
      return res.status(404).json("seance with this id not found");
    }
    if (seance.nombre_place >= nbr_place) {
      seance.nombre_place = seance.nombre_place - nbr_place;
      await seance.save();

      const newReservation = new reservation({
        user: userId,
        seance: req.params.id,
        nbr_place: nbr_place,
      });
      const Rst = await newReservation.save();

      res
        .status(200)
        .json({ message: "seance reservée avec succes", Reservation: Rst });
    } else {
      throw new Error("il n'est pas encore de place");
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const reserv = await reservation.findById(id);

    const seance = await Seance.findById(reserv.seance);
    if (!seance) {
      throw new Error("Seance with this id not found");
    }
    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }
    today = mm + "/" + dd + "/" + yyyy;
    const dd1 = seance.date.split("/");
    const date = dd1[1] + "/" + dd1[0] + "/" + dd1[2];
    const date1 = new Date(date);
    console.log(date1);
    const date2 = new Date(Date.now());
    const diffTime = Math.abs(date1 - date2);
    console.log(diffTime);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;
    //si vous pouvez  annuler  reservation avant un seul jour vou ne pouvez pas
    if (diffDays < 1 && diffDays >= 0) {
      return res.status(404).json({
        message:
          "desole vous ne pouvez pas annuler la reservation avant une seul jour ",
      });
      //si vous pouvez annuler le reservation on ajouter
      //le nombre_place dans la reservation a la seance
    } else if (diffDays > 1) {
      seance.nombre_place = seance.nombre_place + reserv.nbr_place;
      await seance.save();

      const Rst = await reserv.remove();

      return res.status(200).json({
        reservation: Rst,
        message: "reservation est supprimée",
      });
      //sinon si le seance est deja fait on a supprimer le reservation
    } else {
      const Rst = await reserv.remove();

      return res.status(200).json({
        reservation: Rst,
        message: "reservation est supprimée",
      });
    }
  } catch (err) {
    res.status(400).json("Error" + err);
  }
};

exports.upDateReservation = async (req, res) => {
  try {
    const nbr_place = req.body.nbr_place;
    const { id } = req.params;
    const reserv = await reservation.findById(id);
    const seance = await Seance.findById(reserv.seance);
    if (!seance) {
      throw new Error("Seance with this id not found");
    }
    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }
    today = mm + "/" + dd + "/" + yyyy;
    const dd1 = seance.date.split("/");

    //pour changer le format date de seance a mm/dd/yyyy
    const date = dd1[1] + "/" + dd1[0] + "/" + dd1[2];

    const date1 = new Date(date);

    const date2 = new Date(Date.now());
    const diffTime = Math.abs(date1 - date2);

    //diffDays pour calculer le difference entre le jour de l'update est le date de seance
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;

    //si tu peut modifier la reservation avant un seul jour tu peut pas
    if (diffDays < 1) {
      return res.status(404).json({
        message:
          "desole tu ne peut pas modifeir le reservation avant une seul jour ",
      });
    }
    if (reserv.nbr_place == nbr_place) {
      return res.status(404).json({
        message: "reservation deja reservée avec meme nombre de place",
      });

      //sinon si vous pouvez dimiuni le nombre de place de la reservation , 
      //on ajouter vous place a la seance
    } else if (reserv.nbr_place > nbr_place && nbr_place > 0) {
      const diff_nbrPlace = reserv.nbr_place - nbr_place;

      seance.nombre_place = seance.nombre_place + diff_nbrPlace;
      await seance.save();
      reserv.nbr_place = nbr_place;
      const Rst = await reserv.save();
      console.log(diffDays + " days");
      return res.status(200).json({
        reservation: Rst,
        message: "reservation update avec succes ",
      });
      //sinon si vous pouvez augmenter le nombre de place dans votre reservation
      //on verifiée apres si il ya place dispoinible ou non
    } else if (reserv.nbr_place < nbr_place) {
      const diff_nbrPlace = nbr_place - reserv.nbr_place;
      if (seance.nombre_place >= diff_nbrPlace) {
        seance.nombre_place = seance.nombre_place - diff_nbrPlace;
        await seance.save();
        reserv.nbr_place = nbr_place;
        const Rst = await reserv.save();
        console.log(diffDays + " days");
        return res.status(200).json({
          reservation: Rst,
          message: "reservation update avec succes ",
        });
      } else {
        throw new Error(
          "aucun place dispoinible pour ajouter des place seance est complete"
        );
      }
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
