const express = require("express");
const router = express.Router();
const chambreController = require("../controller/chambreController");

router.post("/add/:id", chambreController.add);
router.put("/reserve/:id/:nom", chambreController.reserve);

router.get("/chambre", (req, res, next) => {
  res.render("partie");
});

// router.post("/nonReservee", chambreController.getNonReservee);

module.exports = router;
