const express = require("express");
const hotel = require("../modele/hotel");
const chambre = require("../modele/chambre");

async function add(req, res) {
  try {
    const Hotel = new hotel({
      nom: req.body.nom,
      adresse: req.body.adresse,
      nbChambre: 0,
      email: req.body.email,
    });

    await Hotel.save();
    console.log("add success");
    // res.status(200).send("Le hotel a été ajouté avec succès :" + Hotel.nom);
    res.status(201).json(Hotel);
  } catch (err) {
    console.log({ error: err.toString() });
  }
}

async function getall(req, res) {
  try {
    const data = await hotel.find();
    res.send(data);
  } catch (err) {
    res.send(err);
  }
}

async function getbyid(req, res) {
  try {
    const data = await hotel.findById(req.params.id);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
}

async function deleteHotel(req, res) {
  try {
    const data = await hotel.findByIdAndDelete(req.params.id);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
}

module.exports = {
  add,
  getall,
  getbyid,
  deleteHotel,
};
