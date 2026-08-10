const express = require("express");

const router = express.Router();

const taskController = require("../controllers/taskController");

const authMiddleware = require("../middlewares/authMiddleware");

const roleMiddleware = require("../middlewares/roleMiddleware");



// Obtener pendientes
// Todos pueden consultar

router.get(
    "/",
    authMiddleware,
    taskController.getTasks
);



// Crear pendiente
// Admin y técnicos

router.post(
    "/",
    authMiddleware,
    roleMiddleware(["admin", "tecnico"]),
    taskController.createTask
);



// Cambiar estado completado/pendiente
// Admin y técnicos

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware(["admin", "tecnico"]),
    taskController.updateTask
);



// Eliminar pendiente
// Solo administradores

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware(["admin"]),
    taskController.deleteTask
);



module.exports = router;