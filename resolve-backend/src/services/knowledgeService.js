const db = require("../config/db");

// =======================================
// Crear conocimiento manual
// =======================================

async function createManualKnowledge(data, userId) {
    const {

        title,
        problem,
        category_id,
        location,
        solution

    } = data;

    const [result] = await db.query(

        `
        INSERT INTO knowledge_base (

            type,
            title,
            problem,
            category_id,
            location,
            solution,
            created_by

        )

        VALUES (?, ?, ?, ?, ?, ?, ?)
        `,

        [

            "manual",
            title,
            problem,
            category_id,
            location,
            solution,
            userId

        ]

    );

    const [knowledge] = await db.query(

        `
        SELECT

            kb.id,
            kb.type,
            kb.title,
            kb.problem,
            kb.location,
            kb.solution,

            c.name AS category,

            u.name AS created_by,

            kb.created_at,
            kb.updated_at

        FROM knowledge_base kb

        LEFT JOIN categories c
            ON kb.category_id = c.id

        LEFT JOIN users u
            ON kb.created_by = u.id

        WHERE kb.id = ?
        `,

        [result.insertId]

    );

    return knowledge[0];

}



// =======================================
// Obtener conocimientos
// =======================================

async function getKnowledge(){

    const [knowledge] = await db.query(

        `
       SELECT

    kb.id,
    kb.type,
    kb.ticket_id,

    COALESCE(kb.title, i.title) AS title,

    COALESCE(kb.problem, i.description) AS problem,

    COALESCE(kb.location, d.name) AS location,

    COALESCE(kb.solution, i.solution) AS solution,

    COALESCE(c.name, tc.name) AS category,

    u.name AS created_by,

    kb.created_at,
    kb.updated_at

FROM knowledge_base kb

LEFT JOIN incidents i
    ON kb.ticket_id = i.id

LEFT JOIN departments d
    ON i.department_id = d.id

LEFT JOIN categories c
    ON kb.category_id = c.id

LEFT JOIN categories tc
    ON i.category_id = tc.id

LEFT JOIN users u
    ON kb.created_by = u.id

ORDER BY kb.created_at DESC

        `

    );

    return knowledge;

}

// =======================================
// Obtener detalle de conocimiento
// =======================================

async function getKnowledgeById(id){

    const [knowledge] = await db.query(

        `
        SELECT
            kb.id,
            kb.type,
            kb.ticket_id,
            kb.title,
            kb.problem,
            kb.location,
            kb.solution,

            c.name AS category,

            u.name AS created_by,

            kb.created_at

        FROM knowledge_base kb

        LEFT JOIN categories c
            ON kb.category_id = c.id

        LEFT JOIN users u
            ON kb.created_by = u.id

        WHERE kb.id = ?

        `,

        [id]

    );


    if(!knowledge.length){
        return null;
    }


    const item = knowledge[0];


    // Si viene de ticket
    if(item.type === "ticket"){

        const [ticket] = await db.query(

            `
            SELECT *
            FROM incidents
            WHERE id = ?

            `,

            [item.ticket_id]

        );


        item.ticket = ticket[0];

        item.title = ticket[0].title;
item.problem = ticket[0].description;
item.solution = ticket[0].solution;

    }


    return item;

}

// =======================================
// Obtener tickets disponibles para conocimiento
// =======================================

async function getAvailableTickets(){

    const [tickets] = await db.query(

        `
        SELECT

            i.id,
            i.folio,
            i.description,
            i.solution,
            i.status,

            d.name AS department,

            c.name AS category

        FROM incidents i

        LEFT JOIN departments d
            ON i.department_id = d.id

        LEFT JOIN categories c
            ON i.category_id = c.id

        LEFT JOIN knowledge_base kb
            ON kb.ticket_id = i.id

        WHERE

            i.status IN ('resuelto','cerrado')

            AND kb.ticket_id IS NULL

        ORDER BY i.created_at DESC

        `

    );

    return tickets;

}

// =======================================
// Crear conocimiento desde ticket
// =======================================

async function createTicketKnowledge(ticket_id, user){

    try{

        const [result] = await db.query(

            `
            INSERT INTO knowledge_base
            (
                type,
                ticket_id,
                created_by
            )

            VALUES (?, ?, ?)
            `,

            [
                "ticket",
                ticket_id,
                user.id
            ]

        );

        return {

            id: result.insertId,
            ticket_id,
            type: "ticket"

        };

    }catch(error){

        if(error.code === "ER_DUP_ENTRY"){

            throw new Error(
                "Este ticket ya forma parte de la base de conocimiento."
            );

        }

        throw error;

    }

}

module.exports = {

    createManualKnowledge,
    getKnowledge,
    getKnowledgeById,
    getAvailableTickets,
    createTicketKnowledge

};