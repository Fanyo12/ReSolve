const bcrypt = require("bcrypt");
const db = require("../config/db");


async function createUser(userData) {

    const {
        name,
        email,
        password,
        role
    } = userData;


    // Verificar si ya existe el correo
    const [existingUsers] = await db.query(
        "SELECT id FROM users WHERE email = ?",
        [email]
    );


    if (existingUsers.length > 0) {

        throw new Error(
            "El correo ya está registrado."
        );

    }


    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(
        password,
        10
    );


    // Guardar usuario
    const [result] = await db.query(

        `INSERT INTO users
        (name, email, password, role)
        VALUES (?, ?, ?, ?)`,

        [
            name,
            email,
            hashedPassword,
            role
        ]

    );


    return {

        id: result.insertId,
        name,
        email,
        role

    };

}


async function login(email, password) {


    // Buscar usuario
    const [users] = await db.query(

        "SELECT * FROM users WHERE email = ?",

        [email]

    );


    if (users.length === 0) {

        throw new Error(
            "Correo o contraseña incorrectos."
        );

    }


    const user = users[0];


    // Verificar contraseña
    const validPassword = await bcrypt.compare(
        password,
        user.password
    );


    if (!validPassword) {

        throw new Error(
            "Correo o contraseña incorrectos."
        );

    }


    // Verificar si el usuario está activo
    if (!user.active) {

        throw new Error(
            "Tu usuario está desactivado. Contacta al administrador."
        );

    }


    // Actualizar último inicio de sesión
    await db.query(

        "UPDATE users SET last_login = NOW() WHERE id = ?",

        [user.id]

    );


    return user;

}


module.exports = {
    createUser,
    login
};