const express = require("express");
const router = express.Router();

router.get("/api/user/state", (req, res) => {
  let signed_in = req.session.signed_in;

  signed_in ?
      res.json({
        signed_in: true,
        email: (req.session.email || ""),
        first_name: (req.session.first_name || ""),
        last_name: (req.session.last_name || ""),
        expires: (req.session.cookie.expires)
      }) :
      res.json({
        signed_in: false
      });

});

module.exports = router;