const express = require("express");
const router = express.Router();
const serverController = require("../controllers/serverController");

router.get("/", serverController.list);
router.post("/", serverController.create);

module.exports = router;
