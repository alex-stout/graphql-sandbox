var express = require("express");
var router = express.Router();
var graphqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Character = require("./models/Character");

mongoose.Promise = global.Promise;

mongoose
  .connect(
    "mongodb://localhost:27017/soccer",
    {
      user: "proto",
      pass: "password123",
      useNewUrlParser: true
    }
  )
  .then(() => console.log("connection succesful"))
  .catch(err => console.error(err));

// graphQL schema
var schema = buildSchema(`
  type Query {
    character(name: String!): Character
    characters(align: String): [Character]
  }

  type Character {
      page_id: Int,
      name: String,
      urlslug: String,
      id: String,
      align: String,
      eye: String,
      hair: String,
      sex: String,
      gsm: String,
      alive: String,
      appearances: Int,
      first_appearance: String,
      year: Int
  }
`);

var getCharacter = args => {
  var name = args.name;
  return Character.findOne({ name: name }, (err, character) => {
    if (err) {
      console.err(err);
    }
    return character;
  });
};

var getCharacters = args => {
  if (args.align) {
    var align = args.align;
    return Character.find({ align: align }, (err, characters) => {
      if (err) {
        console.err(err);
      }
      return characters;
    });
  } else {
    return Character.find({}, (err, characters) => {
      if (err) {
        console.err(err);
      }
      return characters;
    });
  }
};

var root = { character: getCharacter, characters: getCharacters };

var app = express();

app.get("/", (req, res) => {
  Character.estimatedDocumentCount({}, (err, count) => {
    if (err) return res.json(err);
    res.json(count);
  });
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);
app.listen(4000, () => console.log("Now browse to localhost:4000/graphql"));
