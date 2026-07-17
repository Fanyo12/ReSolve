const ticketService = require("../services/ticketService");

async function createTicket(req, res) {

    try {

        const ticket = await ticketService.createTicket(
            req.body,
            req.user
        );

        res.status(201).json({
            success: true,
            message: "Ticket creado correctamente.",
            data: ticket
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

}

async function getAllTickets(req, res) {

    try {

        const filters = req.query;

        const tickets = await ticketService.getAllTickets(filters);

        res.json({
            success: true,
            message: "Tickets obtenidos correctamente.",
            data: tickets
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

}
async function updateTicket(req, res) {

    try {

        const { id } = req.params;

        const ticket = await ticketService.updateTicket(id, req.body);

        res.json({
            success: true,
            message: "Ticket actualizado correctamente.",
            data: ticket
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

}
async function closeTicket(req, res) {

    try {

        const { id } = req.params;

        const ticket = await ticketService.closeTicket(id);

        res.json({
            success: true,
            message: "Ticket cerrado correctamente.",
            data: ticket
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

}
async function deleteTicket(req, res) {

    try {

        const { id } = req.params;

        const ticket = await ticketService.deleteTicket(id);

        res.json({
            success: true,
            message: "Ticket eliminado correctamente.",
            data: ticket
        });

    } catch (error) {

        res.status(400).json({
            success:false,
            message:error.message
        });

    }

}

module.exports = {
    createTicket,
    getAllTickets,
    updateTicket,
    closeTicket,
    deleteTicket
};
