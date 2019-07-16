const express = require("express");
const createToken = require("../lib/auth").createToken;

const router = express.Router();

router.post("/login_check", (req, res) => {
  if (req.body.username === "user" && req.body.password === "password") {
    const token = createToken({
      firstName: "user",
      lastName: "user"
    });

    res.status(201).send({ token });
  } else {
    res.status(400).send({
      error: "Invalid username/password"
    });
  }
});

router.post("/login", (req, res) => {
  if (req.body.email != null && req.body.password != null) {
    User.login(req.body.email, req.body.password)
      .then(user => {
        const token = createToken({
          firstName: user.firstName,
          lastName: user.lastName
        });

        res.status(201).send({ token });
      })
      .catch(error => {
        res.status(400).send({
          error: error.message
        });
      });
  } else {
    res.status(400).send({
      error: "Invalid username/password"
    });
  }
});

module.exports = router;
