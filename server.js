const router = require("express").Router();
const express = require("express");
const mongoDbConnect = require("./utils/db.js");
const cors = require("cors");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

const FilmRouter=require('./routes/Film');
const SeanceRouter=require('./routes/Seance');
const ReservationRouter=require('./routes/Reservation');
const UserController=require('./routes/User');

app.use('/film',FilmRouter);
app.use('/seance',SeanceRouter);
app.use('/reservation',ReservationRouter);
app.use('/user',UserController);



const main = async () => {
    try {
      const connection = await mongoDbConnect();
      if (connection) {
        console.log("db connecté");
        app.listen(port, () => {
          console.log(`Server is running on port: ${port}`);
        });
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  
  main();
  