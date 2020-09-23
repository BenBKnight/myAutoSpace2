// Requiring our models and passport as we've configured it
const db = require("../models");
const app = require("express");
const router = app.Router();
const isAuthenticated = require("../config/middleware/isAuthenticated");
const { response } = require("express");

// Route for getting some data about our user to be used client side
router.get("/api/user_data", isAuthenticated, (req, res) => {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    // Otherwise send back the user's email and id
    res.json({
      lastName: req.user.lastName,
      firstName: req.user.firstName,
      email: req.user.email,
      id: req.user.id
    });
  }
});
router.put("/api/userPhoto/", isAuthenticated, (req, res) => {
  let userId = req.body[1]
  let userPhoto = req.body[0]
  db.User.update(
    { profolioPic: userPhoto },
    { where: { id: userId } }
  )
    .then(response => {
      res.json(response)
    })
})

module.exports = router;
