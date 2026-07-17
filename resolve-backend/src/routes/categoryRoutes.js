const express = require("express");

const router = express.Router();

const controller = require("../controllers/categoryController");

const authMiddleware = require("../middlewares/authMiddleware");

router.get(
    "/",
    authMiddleware,
    controller.getCategories
);

module.exports = router;