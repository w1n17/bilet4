const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const rentalController = require("../controllers/rentalController");

router.post("/", auth, rentalController.rent);
router.get("/", auth, rentalController.list);
router.patch("/:id", auth, rentalController.extend);

module.exports = router;
