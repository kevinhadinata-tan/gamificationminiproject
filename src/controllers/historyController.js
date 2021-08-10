const UserModel = require('../models/UserModel');
const RewardModel = require('../models/ReviewModel');
const RewardUserModel = require('../models/RewardUserModel');
const TaskModel = require('../models/TaskModel');
const TaskAssignedModel = require('../models/TaskAssignedModel');
const HistoryModel = require('../models/HistoryModel');

class historyController {
    async getAllHistory (req, res) {
        try {
            const historyModel = HistoryModel();
            const taskAssignedModel = TaskAssignedModel();
            const taskModel = TaskModel();
            const rewardUserModel = RewardUserModel();
            const rewardModel = RewardModel();
            const userModel = UserModel();

            historyModel.belongsTo(taskAssignedModel, { foreignKey: 'taskID', as: 'TaskUser'});
            taskAssignedModel.belongsTo(taskModel, { foreignKey: 'taskID', as: 'Task'});
            historyModel.belongsTo(rewardUserModel, { foreignKey: 'rewardID', as: 'RewardUser'});
            rewardUserModel.belongsTo(rewardModel, { foreignKey: 'rewardID', as: 'Reward'})
            historyModel.belongsTo(userModel, { foreignKey: 'userID', as: 'User'});

            const data = await historyModel.findAll({
                include: [
                    { 
                        model: taskAssignedModel, 
                        as: 'TaskUser',
                        include: [{
                            model: taskModel,
                            as: 'Task'
                        }]
                    },
                    {
                        model: rewardUserModel,
                        as: 'RewardUser',
                        include: [{
                            model: rewardModel,
                            as: 'Reward'
                        }]
                    },
                    {
                        model: userModel,
                        as: 'User'
                    }
                ]
            });

            res.status(200).send({
                message: 'success get all History',
                data,
            });
        } catch (error) {
            res.status(500).send({
                message: 'failed get all History',
                data: error.toString(),
            });
        }
    }
}

module.exports = new historyController();