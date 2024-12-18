const Joi = require("joi");
const express = require("express");
const app = express();
const genres = require("./routes/genres");
const home = require("./routes/home");
app.use(express.json());
app.use("/genres", genres);
app.use("/", home);
// create the port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}...`));
