const express = require("express");
const router = express.Router();
const hotelController = require("../controller/hotelController");
const validate = require("../midill/validate");

router.post("/add", validate, hotelController.add);
router.get("/list", hotelController.getall);

router.get("/getById/:id", hotelController.getbyid);
router.delete("/delete/:id", hotelController.deleteHotel);

module.exports = router;
