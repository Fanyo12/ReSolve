const express = require("express");
const router = express.Router();

const ticketController = require("../controllers/ticketController");
const authMiddleware = require("../middlewares/authMiddleware");

// Crear ticket
router.post("/", authMiddleware, ticketController.createTicket);
router.get("/", authMiddleware, ticketController.getAllTickets);    
router.put("/:id", authMiddleware, ticketController.updateTicket); 
router.put("/close/:id", authMiddleware, ticketController.closeTicket); 
router.delete("/:id", authMiddleware, ticketController.deleteTicket);      
module.exports = router;