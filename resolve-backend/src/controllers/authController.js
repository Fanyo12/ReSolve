const authService = require("../services/authService");
const generateToken = require("../utils/generateToken");

async function register(req, res) {
    try {
        const user = await authService.createUser(req.body);

        res.status(201).json({
            success: true,
            message: "Usuario creado correctamente.",
            data: user
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
}

async function login(req, res) {

    try {

        const { email, password } = req.body;

        const user = await authService.login(email, password);

        const token = generateToken(user);

        res.json({
            success: true,
            message: "Inicio de sesión exitoso.",
            token,
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

        res.status(401).json({
            success: false,
            message: error.message
        });

    }

}

function profile(req, res) {

    res.json({
        success: true,
        message: "Perfil obtenido correctamente.",
        data: req.user
    });

}
module.exports = {
    register,
    login,
    profile
};