const express = require("express");
const router = express.Router();
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

// return all genres
router.get("", (req, res) => {
  res.status(200).send(genres);
});

// get genres by id
router.get("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("This genre with the given id was not found");
  res.send(genre);
});

// post genre
router.post("", (req, res) => {
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
router.put("/:id", (req, res) => {
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
router.delete("/:id", (req, res) => {
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
module.exports = router;
