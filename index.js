const Joi = require("joi");
const express = require("express");
const app = express();
app.use(express.json());

// create the port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}...`));

// return something on home page
app.get("/", (req, res) => {
  res.status(200).send("Hello, world!");
});
