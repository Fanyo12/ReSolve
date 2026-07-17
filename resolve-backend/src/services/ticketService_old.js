const db = require("../config/db");

// 🔥 Generador de folio simple
function generateFolio() {
    const date = new Date();
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");

    const random = Math.floor(1000 + Math.random() * 9000);

    return `INC-${y}${m}${d}-${random}`;
}

async function createTicket(ticketData, user) {

    const folio = generateFolio();

    const {
        department_id,
        category_id,
        description,
        reported_by,
        responsible,
        title
    } = ticketData;

    try {

        const [result] = await db.promise().query(
            `INSERT INTO tickets 
            (folio, type, category_id, department_id, description, reported_by, registered_by, responsible, title)
            VALUES (?, 'general', ?, ?, ?, ?, ?, ?, ?)`,
            [
                folio,
                category_id,
                department_id,
                description,
                reported_by,
                user.id,
                responsible
            ]
        );

        return {
            id: result.insertId,
            folio,
            type: "general",
            category_id,
            department_id,
            description,
            reported_by,
            registered_by: user.id,
            responsible,
            status: "nuevo"
        };

    } catch (error) {
        console.log("🔥 ERROR INSERT TICKET:", error);
        throw error;
    }
}

async function getAllTickets(filters) {

    let query = `
        SELECT 
            id,
            folio,
            title,
            type,
            category_id,
            department_id,
            description,
            reported_by,
            registered_by,
            responsible,
            status,
            created_at
        FROM tickets
        WHERE 1=1
    `;

    const params = [];

    if (filters.status) {
        query += " AND status = ?";
        params.push(filters.status);
    }

    if (filters.department_id) {
        query += " AND department_id = ?";
        params.push(filters.department_id);
    }

    if (filters.folio) {
        query += " AND folio LIKE ?";
        params.push(`%${filters.folio}%`);
    }

    query += " ORDER BY created_at DESC";

    const [rows] = await db.promise().query(query, params);

    return rows;
}
async function updateTicket(id, data) {

    const {
        status,
        responsible,
        solution
    } = data;

    let query = "UPDATE tickets SET ";
    const params = [];
    const updates = [];

    if (status) {
        updates.push("status = ?");
        params.push(status);
    }

    if (responsible) {
        updates.push("responsible = ?");
        params.push(responsible);
    }

    if (solution) {
        updates.push("solution = ?");
        params.push(solution);
    }

    if (updates.length === 0) {
        throw new Error("No hay datos para actualizar.");
    }

    query += updates.join(", ");
    query += " WHERE id = ?";
    params.push(id);

    const [result] = await db.promise().query(query, params);

    if (result.affectedRows === 0) {
        throw new Error("Ticket no encontrado.");
    }

    return {
        id,
        ...data
    };
}
async function closeTicket(id) {

    const [rows] = await db.promise().query(
        "SELECT * FROM tickets WHERE id = ?",
        [id]
    );

    if (rows.length === 0) {
        throw new Error("Ticket no encontrado.");
    }

    const ticket = rows[0];

    // Validaciones
    if (ticket.status !== "resuelto") {
        throw new Error("Solo se pueden cerrar tickets resueltos.");
    }

    if (!ticket.solution) {
        throw new Error("No se puede cerrar un ticket sin solución.");
    }

    await db.promise().query(
        "UPDATE tickets SET status = 'cerrado' WHERE id = ?",
        [id]
    );

    return {
        id,
        status: "cerrado"
    };
}

module.exports = {
    createTicket,
    getAllTickets,
    updateTicket,
    closeTicket
};  