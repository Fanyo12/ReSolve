const db = require("../config/db");

async function getDashboard() {

    // Total de tickets
    const [total] = await db.promise().query(
        "SELECT COUNT(*) as total FROM tickets"
    );

    // Por estado
    const [status] = await db.promise().query(
        `SELECT status, COUNT(*) as count 
         FROM tickets 
         GROUP BY status`
    );

    // Por departamento
    const [departments] = await db.promise().query(
        `SELECT department_id, COUNT(*) as count 
         FROM tickets 
         GROUP BY department_id`
    );

    // Tickets de hoy
    const [today] = await db.promise().query(
        `SELECT COUNT(*) as today 
         FROM tickets 
         WHERE DATE(created_at) = CURDATE()`
    );

    return {
        total_tickets: total[0].total,
        by_status: status,
        by_department: departments,
        today_tickets: today[0].today
    };
}

module.exports = {
    getDashboard
};