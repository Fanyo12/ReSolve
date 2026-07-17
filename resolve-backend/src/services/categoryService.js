const db = require("../config/db");

async function getCategories(type) {

    let query = `
        SELECT
            id,
            name,
            type
        FROM categories
        WHERE active = 1
    `;

    const params = [];

    if (type) {
        query += " AND type = ?";
        params.push(type);
    }

    query += " ORDER BY name";

    const [rows] = await db.query(query, params);

    return rows;
}

module.exports = {
    getCategories
};