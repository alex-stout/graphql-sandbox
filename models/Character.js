var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CharacterSchema = Schema({
  page_id: Number,
  name: String,
  urlslug: String,
  id: String,
  align: String,
  eye: String,
  hair: String,
  sex: String,
  gsm: String,
  alive: String,
  appearances: Number,
  first_appearance: String,
  year: Number
});

module.exports = mongoose.model("Character", CharacterSchema);
