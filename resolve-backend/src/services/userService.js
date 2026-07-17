const db = require("../config/db");
const bcrypt = require("bcrypt");

const createUser = async (user) => {

    const passwordHash = await bcrypt.hash(user.password,10);

    const [result] = await db.execute(

        `INSERT INTO users
        (name,email,password,role)
        VALUES (?,?,?,?)`,

        [

            user.name,
            user.email,
            passwordHash,
            user.role

        ]

    );

    return result;

};

module.exports = {

    createUser

};