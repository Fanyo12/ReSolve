const express = require("express");

const router = express.Router();

const controller = require("../controllers/departmentController");

const authMiddleware = require("../middlewares/authMiddleware");

router.get(

    "/",

    authMiddleware,

    controller.getDepartments

);

module.exports = router;