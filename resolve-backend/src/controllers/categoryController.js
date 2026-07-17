const categoryService = require("../services/categoryService");

async function getCategories(req, res) {

    try {

        const { type } = req.query;

        const categories = await categoryService.getCategories(type);

        res.json({
            success: true,
            data: categories
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

}

module.exports = {
    getCategories
};