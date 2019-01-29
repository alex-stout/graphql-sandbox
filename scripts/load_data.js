const csv = require("csvtojson");
const mongoose = require("mongoose");
var Character = require("../models/Character");
var axios = require("axios");

csv()
  .fromFile("./marvel-wikia-data.csv")
  .subscribe(json => {
    return new Promise((resolve, reject) => {
      //console.log(JSON.stringify(json, null, 2));
      var data = {
        page_id: json.page_id,
        name: json.name,
        urlslug: json.urlslug,
        id: json.ID,
        align: json.ALIGN,
        eye: json.EYE,
        hair: json.HAIR,
        sex: json.SEX,
        gsm: json.GSM,
        alive: json.ALIVE,
        appearances: json.APPEARANCES,
        year: json.YEAR
      };
      axios
        .post("http://localhost:4000/data", data)
        .then(res => {
          console.log(res);
        })
        .then(res => {
          resolve();
        });
      // newCharacter.save(err => {
      //   if (err) {
      //     console.log("Failed to save user" + err);
      //   }
      // });
    });
  });
