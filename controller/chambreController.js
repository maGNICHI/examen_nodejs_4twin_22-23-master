const express = require("express");
const hotel = require("../modele/hotel");
const chambre = require("../modele/chambre");

async function add(req, res) {
  try {
    const Chambre = new chambre({
      numero: req.body.numero,
      hotel: req.params.id,
      reservee: "false",
      nom_client: "",
    });

    await Chambre.save();
    console.log("add success");
    res.status(201).json(Chambre);
  } catch (err) {
    console.log({ error: err.toString() });
  }
}

async function reserve(req, res) {
  try {
    const reserveC = await chambre.findByIdAndUpdate(req.params.id, {
      nom_client: req.params.nom,
      reservee: "true",
    });

    res.send(reserveC);
  } catch (err) {
    res.send(err);
  }
}

async function getNonReservee(data) {
  try {
    const hotel = data.hotel;

    const chambres = await chambre.find({ hotel: hotel, reservee: "false" });

    return chambres;
  } catch (err) {
    res.send(err);
  }
}

module.exports = {
  add,
  reserve,
  getNonReservee,
};
