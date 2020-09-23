// Requiring our models and passport as we've configured it
const db = require("../models");
const isAuthenticated = require("../config/middleware/isAuthenticated");
const app = require("express");
const router = app.Router();

router.get("/vehiclefind/:userid", isAuthenticated, (req, res) => {
  const userId = req.params.userid;
  db.Vehicle.findAll({
    where: {
      UserId: userId
    }
  }).then(results => {
    res.json(results)
  })
    .catch(err => {
      console.log(err)
      res.status(401).send("Auth Unsuccessful");
    });
});
router.get("/vehicleOnefind/:vehicleId", isAuthenticated, (req, res) => {
  const VehicleIdGet = req.params.vehicleId;
  db.Vehicle.findAll({
    where: {
      id: VehicleIdGet
    }
  }).then(results => {
    res.json(results)
  })
    .catch(err => {
      console.log(err)
      res.status(401).send("Auth Unsuccessful");
    });
});

// POST route for saving a new post
router.post("/api/postVehicle", isAuthenticated, (req, res) => {
  db.Vehicle.create({
    type: req.body.type,
    make: req.body.make,
    model: req.body.model,
    year: req.body.year,
    vin: req.body.vin,
    mileage: req.body.mileage,
    yearPurchased: req.body.yearPurchased,
    condition: req.body.condition,
    accidents: req.body.accidents,
    numOfOwners: req.body.numOfOwners,
    locationLastOwned: req.body.locationLastOwned,
    UserId: req.body.UserId,
    vehiclePhoto: req.body.vehiclePhoto
  }).then(dbPost => {
    res.json(dbPost);
  }).catch(err => {
    console.log(err);
    res.status(401).json(err);
  });
});

// DELETE route for deleting posts
router.delete("/api/vehicles/:id", isAuthenticated, (req, res) => {
  db.Vehicle.destroy({
    where: {
      id: req.params.id
    }
  }).then(dbVehicle => {
    res.json(dbVehicle);
  });
});

router.put("/api/vehicleMileage/", isAuthenticated, (req, res) => {
  console.log("**************", req.body)
  let newMileage = req.body[1];
  let vehicleId = req.body[0];

  db.Vehicle.update(
    { mileage: newMileage },
    { where: { id: vehicleId } }
  )
    .then(response => {
      console.log(response)
      res.json(response)
    })
})

module.exports = router;
