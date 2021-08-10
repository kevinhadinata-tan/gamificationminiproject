const UserModel = require('../models/UserModel');

class ScoreController {
    async getScore (req, res) {
        try {
            const userModel = UserModel();
            const data = req.body;

            const scoredata = await userModel.findOne({
                where: {
                    ID: data.userID
                }
            });

            return res.status(201).send({
                message: 'success get score user',
                data: scoredata,
            });
        } catch (error) {
            return res.status(500).send({
                message: 'failed get score user',
                data: error.toString(),
            });
        }
    }
}

module.exports = new ScoreController();