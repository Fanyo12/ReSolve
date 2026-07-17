const db = require("../config/db");

// Generador de folio
function generateFolio(type) {

    const prefix = type === "room"
        ? "HB"
        : "FG";

    const random = Math.floor(1000 + Math.random() * 9000);

    return `${prefix}-${Date.now()}-${random}`;

}

async function createTicket(data, user) {

    const {

        type,
        department_id,
        room_number,
        category_id,
        reported_by,
        title,
        description,
        priority,
        observations,
        external_provider,
        provider_name,
        due_date,
        assigned_to

    } = data;

    const today = new Date();

    const report_date = today.toISOString().split("T")[0];
    const report_time = today.toTimeString().split(" ")[0];

    const folio = generateFolio(type);

    const [result] = await db.query(

        `INSERT INTO incidents (

            folio,
            type,
            report_date,
            report_time,
            department_id,
            room_number,
            category_id,
            reported_by,
            title,
            description,
            priority,
            observations,
            external_provider,
            provider_name,
            due_date,
            assigned_to,
            created_by

        )

        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,

        [

            folio,
            type,
            report_date,
            report_time,
            department_id || null,
            room_number || null,
            category_id,
            reported_by,
            title,
            description,
            priority || "media",
            observations || null,
            external_provider || false,
            provider_name || null,
            due_date || null,
            assigned_to || null,
            user.id

        ]

    );

    const [newTicket] = await db.query(
    `
    SELECT
        i.id,
        i.folio,
        i.type,
        i.report_date,
        i.report_time,
        i.department_id,
        d.name AS department,
        i.category_id,
        c.name AS category,
        i.room_number,
        i.reported_by,
        i.title,
        i.description,
        i.priority,
        i.status,
        i.solution,
        i.observations,
        i.external_provider,
        i.provider_name,
        i.due_date,
        i.assigned_to,
        i.publish_library,
        i.created_at

    FROM incidents i

    LEFT JOIN departments d
        ON i.department_id = d.id

    LEFT JOIN categories c
        ON i.category_id = c.id

    WHERE i.id = ?
    `,
    [result.insertId]
);


return newTicket[0];

}

async function getAllTickets(filters) {

    let query = `
        SELECT
            i.id,
            i.folio,
            i.type,
            i.report_date,
            i.report_time,
            i.department_id,
            i.category_id,
            d.name AS department,
            c.name AS category,
            i.room_number,
            i.reported_by,
            i.description,
            i.title,
            i.priority,
            i.status,
            i.solution,
            i.observations,
            i.external_provider,
            i.provider_name,
            i.due_date,
            i.assigned_to,
            i.publish_library,
            i.created_at
        FROM incidents i

        LEFT JOIN departments d
            ON i.department_id = d.id

        LEFT JOIN categories c
            ON i.category_id = c.id

        WHERE 1=1
    `;

    const params = [];

    if (filters.status) {
        query += " AND i.status = ?";
        params.push(filters.status);
    }

    if (filters.type) {
        query += " AND i.type = ?";
        params.push(filters.type);
    }

    if (filters.department_id) {
        query += " AND i.department_id = ?";
        params.push(filters.department_id);
    }

    if (filters.priority) {
        query += " AND i.priority = ?";
        params.push(filters.priority);
    }

    if (filters.folio) {
        query += " AND i.folio LIKE ?";
        params.push(`%${filters.folio}%`);
    }

    query += " ORDER BY i.created_at DESC";

    const [rows] = await db.query(query, params);

    return rows;

}

async function updateTicket(id, data) {

    const {

        department_id,
        room_number,
        category_id,
        reported_by,
        title,
        description,
        priority,
        status,
        solution,
        observations,
        external_provider,
        provider_name,
        due_date,
        assigned_to,
        publish_library

    } = data;

    const [result] = await db.query(

        `
        UPDATE incidents
        SET

            department_id = ?,
            room_number = ?,
            category_id = ?,
            reported_by = ?,
            title = ?,
            description = ?,
            priority = ?,
            status = ?,
            solution = ?,
            observations = ?,
            external_provider = ?,
            provider_name = ?,
            due_date = ?,
            assigned_to = ?,
            publish_library = ?

        WHERE id = ?
        `,

        [

            department_id || null,
            room_number || null,
            category_id,
            reported_by,
            title,
            description,
            priority,
            status,
            solution || null,
            observations || null,
            external_provider || false,
            provider_name || null,
            due_date || null,
            assigned_to || null,
            publish_library || false,
            id

        ]

    );

    if (result.affectedRows === 0) {

        throw new Error("Incidencia no encontrada.");

    }

    return {

        id,
        ...data

    };

}

async function closeTicket(id) {

    const [result] = await db.query(

        `
        UPDATE incidents
        SET status = 'cerrado'
        WHERE id = ?
        `,

        [id]

    );

    if (result.affectedRows === 0) {

        throw new Error("Incidencia no encontrada.");

    }

    return {

        id,
        status: "cerrado"

    };

}
async function deleteTicket(id) {

    const [result] = await db.query(

        `
        DELETE FROM incidents
        WHERE id = ?
        `,

        [id]

    );


    if (result.affectedRows === 0) {

        throw new Error("Incidencia no encontrada.");

    }


    return {

        id,
        deleted: true

    };

}

module.exports = {

    createTicket,
    getAllTickets,
    updateTicket,
    closeTicket,
    deleteTicket
};