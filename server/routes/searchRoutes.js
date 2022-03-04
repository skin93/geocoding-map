const express = require("express");
const router = express.Router();

const { getPlaces } = require("../controllers/searchcontrollers");

router.get("/:query", getPlaces);

module.exports = router;
