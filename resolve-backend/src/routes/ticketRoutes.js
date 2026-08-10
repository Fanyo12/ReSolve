const express = require("express");
const router = express.Router();

const ticketController = require("../controllers/ticketController");
const authMiddleware = require("../middlewares/authMiddleware");

const roleMiddleware = require("../middlewares/roleMiddleware");

// Crear ticket
router.post("/", authMiddleware, ticketController.createTicket);
router.get("/", authMiddleware, ticketController.getAllTickets);    
router.put("/:id", authMiddleware, ticketController.updateTicket); 
router.put("/close/:id", authMiddleware, ticketController.closeTicket); 
router.delete("/:id", authMiddleware, ticketController.deleteTicket);      
module.exports = router;

// Crear ticket
router.post(
    "/",
    authMiddleware,
    roleMiddleware("admin","tecnico"),
    ticketController.createTicket
);


// Ver tickets
router.get(
    "/",
    authMiddleware,
    ticketController.getAllTickets
);


// Editar ticket
router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("admin","tecnico"),
    ticketController.updateTicket
);


// Cerrar ticket
router.put(
    "/close/:id",
    authMiddleware,
    roleMiddleware("admin","tecnico"),
    ticketController.closeTicket
);


// Eliminar ticket
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    ticketController.deleteTicket
);