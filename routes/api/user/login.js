const express = require("express");
const tools = require("../../../config/tools");
const router = express.Router();
const {OAuth2Client} = require('google-auth-library');

const client_id = "532922622875-di9napjhci2k61955r92qs7lv64265nt.apps.googleusercontent.com";

const client = new OAuth2Client(client_id);


router.post("/api/user/login", async (req, res) => {
  if(req.session.signed_in)
    return res.json({success: false, error: "There is already a user signed in"});

  let isVotingStation = Boolean(req.cookies.isVotingStation);

  const validateOptions = {
    idToken: (req.body.token || ""),
    audience: client_id
  };

  client.verifyIdToken(validateOptions)
      .then(ticket => ticket.getPayload())
      .then(payload => {

        if(payload.aud !== client_id || payload.azp !== client_id)
          return "That token was not generated for this app";

        if(! payload.email_verified)
          return "That email address has not been verified";

        if( payload.hd !== "stuy.edu" )
          return "Please sign in with an @stuy.edu email address";

        // Create session now that info has been validated
        // Generate a random key and salt to encrypt the user's sub (secret user id)
        let encryptKey = tools.genString(32);
        let encryptIv = tools.genString(16);

        let maxAge = isVotingStation ? 1000 * 60 * 5 : 1000 * 86400 * 30;

        req.session.signed_in = true;
        req.session.email = payload.email;
        req.session.encryptedID = tools.encryptString(payload.sub, encryptKey, encryptIv);
        req.session.sessionTest = tools.encryptString(tools.getDecryptionTestString(), encryptKey, encryptIv);
        req.session.full_name = payload.name;
        req.session.first_name = payload.given_name;
        req.session.last_name = payload.family_name;
        req.session.cookie.expires = new Date(new Date().getTime() + maxAge);

        // Create a user cookie to store the information needed to decrypt the user id
        // The decryption keys only exist on the user side
        let options = {
          maxAge: maxAge, // Normal cookie lasts for 30 days, voting station lasts 5 min
          httpOnly: true, // The cookie only accessible by the web server
          signed: true // Indicates if the cookie should be signed
        };

        res.cookie('decryptKey', encryptKey, options);
        res.cookie('decryptIv', encryptIv, options);

        res.json({success: true});

        return false;
      })
      .then(error => {
        if(error)
          res.json({success: false, error: error});
      })
      .catch(() => res.json({success: false, error: "That token could not be validated"}));
});

module.exports = router;