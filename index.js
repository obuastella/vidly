const Joi = require("joi");
const express = require("express");
const app = express();
app.use(express.json());

// create the genres
const genres = [
  {
    id: 1,
    name: "Mystery",
  },
  {
    id: 2,
    name: "Comedy",
  },
  {
    id: 3,
    name: "Fiction",
  },
];

// create the port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}...`));

// return something on home page
app.get("/", (req, res) => {
  res.status(200).send("Hello, world!");
});

// return all genres
app.get("/genres", (req, res) => {
  res.status(200).send(genres);
});

// get genres by id
app.get("/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("This genre with the given id was not found");
  res.send(genre);
});

// post genre
app.post("/genres", (req, res) => {
  const { error } = validateGenre(req.body.name);
  if (error) return res.status(404).send(error.details[0].message);
  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genre);
});
//updating a genre
app.put("/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) {
    return res.status(404).send("The genre with th given id was not found");
  }
  //   validation
  const { error } = validateGenre(req.body.name);
  if (error) {
    res.status(404).send(error.message);
  }
  genre.name = req.body.name;
  res.send(genre);
});

// deleting a genre
app.delete("/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("Genre with the given id does not exist");
  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
});
function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const result = schema.validate({ name: genre });
  return result;
}
