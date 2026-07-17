const db = require("../config/db");

async function getDepartments() {

    const [rows] = await db.query(

        `
        SELECT
            id,
            name
        FROM departments
        WHERE active = 1
        ORDER BY name
        `

    );

    return rows;

}

module.exports = {

    getDepartments

};