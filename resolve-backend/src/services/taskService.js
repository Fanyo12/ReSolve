const db = require("../config/db");


async function getTasks() {

    const [rows] = await db.query(
        `
        SELECT 
            t.id,
            t.title,
            t.description,
            t.status,
            t.task_date,
            t.created_by,
            u.name AS created_by_name

        FROM daily_tasks t

        LEFT JOIN users u
        ON t.created_by = u.id

        ORDER BY t.created_at DESC
        `
    );

    return rows;

}



async function createTask(data) {

    const {
        title,
        description,
        created_by
    } = data;


    const [result] = await db.query(

        `
        INSERT INTO daily_tasks
        (
            title,
            description,
            created_by
        )

        VALUES (?, ?, ?)
        `,

        [
            title,
            description,
            created_by
        ]

    );


    return {
        id: result.insertId,
        title,
        description,
        status:"pendiente",
        created_by
    };

}



async function updateTask(id) {


    await db.query(

        `
        UPDATE daily_tasks

        SET status =
        CASE

            WHEN status = 'pendiente'
            THEN 'completado'

            ELSE 'pendiente'

        END

        WHERE id = ?

        `,

        [id]

    );


    return {
        message:"Estado actualizado"
    };

}



async function deleteTask(id) {


    await db.query(

        `
        DELETE FROM daily_tasks
        WHERE id = ?
        `,

        [id]

    );


    return {
        message:"Pendiente eliminado"
    };

}



module.exports = {

    getTasks,
    createTask,
    updateTask,
    deleteTask

};