const db = require("../config/db");
const bcrypt = require("bcrypt");


const createUser = async (user) => {

    const passwordHash = await bcrypt.hash(
        user.password,
        10
    );

    const [result] = await db.execute(

        `INSERT INTO users
        (name, email, password, role)
        VALUES (?, ?, ?, ?)`,

        [
            user.name,
            user.email,
            passwordHash,
            user.role
        ]

    );

    return result;

};


const getUsers = async () => {

    const [rows] = await db.execute(

        `SELECT
            id,
            name,
            email,
            role,
            active
        FROM users
        ORDER BY id DESC`

    );

    return rows;

};


const updateUserStatus = async (id, active) => {

    const [result] = await db.execute(

        `UPDATE users
        SET active = ?
        WHERE id = ?`,

        [
            active ? 1 : 0,
            id
        ]

    );

    if (result.affectedRows === 0) {

        throw new Error(
            "Usuario no encontrado."
        );

    }

    return result;

};


module.exports = {
    createUser,
    getUsers,
    updateUserStatus
};