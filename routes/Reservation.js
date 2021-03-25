const router = require("express").Router();
const ReservationController=require('../controller/Reservation.controller');
const {isAuth}=require('../middlware/auth');

router.get('/',ReservationController.getAllReservation);
router.post('/add/:id',isAuth,ReservationController.AddReservation);

module.exports=router;