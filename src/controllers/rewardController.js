const RewardModel = require('../models/RewardModel');
const RewardUserModel = require('../models/RewardUserModel');
const UserModel = require('../models/UserModel');
const HistoryModel = require('../models/HistoryModel');
const { nanoid } = require('nanoid');
const { Sequelize } = require('sequelize');

class RewardController {
    async getRewardByID (req, res) {
        try {
            const model = RewardModel();
            const id = req.params.rewardID;

            const data = await model.findOne({ where: { ID: id, }});

            return res.status(200).send({
                message: 'success get single reward',
                data,
            });
        } catch (error) {
            return res.status(500).send({
                message: 'failed get single reward',
                data: {},
            });
        }
    }

    async getAllReward (req, res) {
        try {
            const model = RewardModel();
            const data = await model.findAll();

            return res.status(200).send({
                message: 'success fetch all reward',
                data,
            });
        } catch (error) {
            return res.status(500).send({
                message: 'failed fetch all reward',
                data: {},
            });
        }
    }

    async create (req, res) {
        try {
            const model = RewardModel();
            const data = req.body;
            const userModel = UserModel();
            const check = await userModel.findOne({
                where: {
                    ID: data.userid,
                }
            });

            if (check && check.roleID == '1') {
                const create = await model.create({
                    ID: nanoid(),
                    rewardName: data.name,
                    rewardPrice: data.point,
                    rewardImage: data.imgURL,
                    quantity: data.quantity,
                    tierID: data.tierID
                });

                return res.status(201).send({
                    message: 'success add reward',
                    data: create,
                });
            }

            return res.status(404).send({
                message: 'failed cant add reward',
                data: {},
            });
        } catch (error) {
            return res.status(500).send({
                message: 'failed',
                data: error.toString(),
            });
        }
    }

    async update (req, res) {
        try {
            const id = req.params.rewardID;
            const model = RewardModel();
            const data = req.body;
            const userModel = UserModel();
            const check = await userModel.findOne({
                where: {
                    ID: data.userID,
                }
            });

            if (check && check.roleID == '1') {
                const create = await model.update({
                    rewardName: data.name,
                    rewardPrice: data.point,
                    rewardImage: data.imgURL,
                    quantity: data.quantity,
                    tierID: data.tierID
                }, {
                    where: {
                        ID: id
                    }
                });

                return res.status(201).send({
                    message: 'success update reward',
                    data: create,
                });
            }

            return res.status(404).send({
                message: 'failed update reward',
                data: {},
            });
        } catch (error) {
            return res.status(500).send({
                message: 'failed',
                data: error.toString(),
            });
        }
    }

    async delete (req, res) {
        try {
            const model = RewardModel();
            const id = req.params.rewardID;
            const data = req.body;
            const userModel = UserModel();
            const check = await userModel.findOne({
                where: {
                    ID: data.userID,
                }
            });

            if (check && check.roleID == '1') {
                const remove = await model.destroy({
                    where: {
                        ID: id,
                    }
                });
    
                return res.status(200).send({
                    message: 'success remove reward',
                    data: remove
                }); 
            }

            return res.status(404).send({
                message: 'failed because only parent can remove reward',
                data: {},
            });
        } catch (error) {
            return res.status(500).send({
                message: 'failed remove reward',
                data: error.toString(),
            });
        }
    }

    async getRewardUserTaken (req, res) {
        try {
            const rewardModel = RewardModel();
            const userModel = UserModel();
            const rewardUserModel = RewardUserModel();
            const data = req.body;

            rewardUserModel.belongsTo(rewardModel, {
                foreignKey: 'rewardID',
                as: 'Reward'
            });

            rewardUserModel.belongsTo(userModel, {
                foreignKey: 'userID',
                as: 'User'
            });

            const rewarduserdata = await rewardUserModel.findAll(
                {
                    include: [
                        {
                            model: rewardModel,
                            as: 'Reward'
                        },
                        {
                            model: userModel,
                            as: 'User'
                        }
                    ]
                }, 
                {
                    where: {
                        userID: data.userID
                    }
                });

            return res.status(201).send({
                message: 'success get reward anak taken',
                data: rewarduserdata,
            });
        } catch (error) {
            return res.status(500).send({
                message: 'failed get reward anak taken',
                data: error.toString(),
            });
        }
    }

    async takeRewardByUser (req, res) {
        try {
            const rewardUserModel = RewardUserModel();
            const rewardModel = RewardModel();
            const historyModel = HistoryModel();
            const data = req.body;

            const userdata = await rewardUserModel.create({
                ID: nanoid(),
                userID: data.userID,
                rewardID: data.rewardID,
                isRewardTaken: false
            });

            if (userdata) {
                const updateQuantity = rewardModel.update({
                    quantity: Sequelize.literal(`quantity - ${data.totalTakeReward}`)
                }, {
                    where: {
                        ID: data.rewardID
                    }
                });

                const userHistory = await historyModel.create({
                    ID: nanoid(),
                    rewardID: userdata.ID,
                    userID: data.userID
                });

                return res.status(201).send({
                    message: 'success user take reward',
                    data: updateQuantity,
                    history: userHistory
                });
            }
            return res.status(404).send({
                message: 'failed user take reward',
                data: error.toString(),
            });
        } catch (error) {
            return res.status(500).send({
                message: 'failed',
                data: error.toString(),
            });
        }
    }
}

module.exports = new RewardController();