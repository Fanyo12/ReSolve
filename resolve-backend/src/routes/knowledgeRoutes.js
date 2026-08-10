const express = require("express");

const router = express.Router();

const knowledgeController = require("../controllers/knowledgeController");

const authMiddleware = require("../middlewares/authMiddleware");

const roleMiddleware = require("../middlewares/roleMiddleware");


router.post(
    "/manual",
    authMiddleware,
    knowledgeController.createManualKnowledge
);



router.get(
    "/",
    authMiddleware,
    knowledgeController.getKnowledge
);

router.get(
    "/available-tickets",
    authMiddleware,
    knowledgeController.getAvailableTickets
);

router.post(
    "/ticket",
    authMiddleware,
    knowledgeController.createTicketKnowledge
);

router.get(
    "/:id",
    authMiddleware,
    knowledgeController.getKnowledgeById
);

router.post(
    "/manual",
    authMiddleware,
    roleMiddleware("admin","tecnico"),
    knowledgeController.createManualKnowledge
);

router.post(
    "/ticket",
    authMiddleware,
    roleMiddleware("admin","tecnico"),
    knowledgeController.createTicketKnowledge
);

module.exports = router;