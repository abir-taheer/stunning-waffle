const express = require("express");
const router = express.Router();
const db = require("./../../../config/database");

router.get("/api/user/state", (req, res) => {
  res.json({
    signed_in: true,
    email: "ataheer10@stuy.edu"
  })
});

module.exports = router;