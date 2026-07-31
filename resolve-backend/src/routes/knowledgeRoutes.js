const express = require("express");

const router = express.Router();

const knowledgeController = require("../controllers/knowledgeController");

const authMiddleware = require("../middlewares/authMiddleware");



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



module.exports = router;