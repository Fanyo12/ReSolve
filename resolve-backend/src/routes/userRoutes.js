const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");


router.get(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    userController.getUsers
);


router.post(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    userController.createUser
);


router.put(
    "/:id/status",
    authMiddleware,
    roleMiddleware("admin"),
    userController.updateUserStatus
);


module.exports = router;