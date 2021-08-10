const UserModel = require('../models/UserModel');
const TaskModel = require('../models/TaskModel');
const TaskAssignedModel = require('../models/TaskAssignedModel');
const ReviewModel = require('../models/ReviewModel');
class reviewController {
    async getAllReview (req, res) {
        try {
            const reviewModel = ReviewModel();
            const taskAssignedModel = TaskAssignedModel();
            const taskModel = TaskModel();
            const userModel = UserModel();

            reviewModel.belongsTo(taskAssignedModel, { foreignKey: 'taskID', as: 'TaskUser'});
            taskAssignedModel.belongsTo(taskModel, { foreignKey: 'taskID', as: 'Task'});
            reviewModel.belongsTo(userModel, { foreignKey: 'userID', as: 'User'});

            const data = await reviewModel.findAll({
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
                        model: userModel,
                        as: 'User'
                    }
                ]
            });

            res.status(200).send({
                message: 'success get all Review',
                data,
            });
        } catch (error) {
            res.status(500).send({
                message: 'failed get all Review',
                data: error.toString(),
            });
        }
    }
}

module.exports = new reviewController();