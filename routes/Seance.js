const router = require("express").Router();
const SeanceController=require('../controller/seance.controller')

router.get('/',SeanceController.getAllSeance);
router.post("/add/:id",SeanceController.AddSeance);
router.put("/update/:id", SeanceController.UpdateSeance);
router.delete("/delte/:id", SeanceController.deleteSeance);
router.get("/:id", SeanceController.FindSeanceById);
module.exports = router;