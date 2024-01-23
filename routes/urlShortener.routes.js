const express = require("express");
const router = express.Router();
const urlShortenerController = require("../controller/urlShortener.controller");

router.post("/create", urlShortenerController.createShortURL);
router.get("/:short_url", urlShortenerController.getLongUrl);

module.exports = router;
