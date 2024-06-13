const mongo = require("mongoose");
const Schema = mongo.Schema;
const Chambre = new Schema({
  hotel: String,
  numero: Number,
  reservee: String,
  nom_client: String,
});

module.exports = mongo.model("chambre", Chambre);
