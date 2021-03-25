const router = require("express").Router();
const FilmController=require('../controller/Film.controller');

router.get('/',FilmController.getAllFilm);
router.post("/add", FilmController.AddFilm);
router.put("/update/:id", FilmController.UpdateFilm);
router.delete("/delte/:id",FilmController.deleteFilm);
router.get("/:id", FilmController.findFilmById);
module.exports = router;