const express = require("express");
const router = express.Router();
// return something on home page

router.get("/", (req, res) => {
  res.status(200).send("Hello, world!");
});

module.exports = router;
