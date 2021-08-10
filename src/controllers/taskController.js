const TaskModel = require('../models/TaskModel');
const UserModel = require('../models/UserModel');
const SectionModel = require('../models/SectionModel');
const PriorityModel = require('../models/PriorityModel');
const TaskAssignedModel = require('../models/TaskAssignedModel');
const HistoryModel = require('../models/HistoryModel');
const ReviewModel = require('../models/ReviewModel');
const moment = require('moment');

const { nanoid } = require('nanoid');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

class TaskController {
    async create (req, res) {
        try {
            const model = TaskModel();
            const sectionModel = SectionModel();
            const data = req.body;

            for (const key in data) {
                const userModel = UserModel();
                const check = await userModel.findOne({
                    where: {
                        ID: data[key].userID,
                    }
                });

                const checkSectionIsAvailable = await sectionModel.findOne({
                    where: {
                        ID: data[key].sectionID
                    }
                });

                if (check.dataValues && check.dataValues.roleID == '1') {
                    // moment().format("YYYY-MM-DDThh:mm:ss.SSSZ");

                    if (checkSectionIsAvailable.dataValues) {
                        var create = await model.create({
                            ID: nanoid(),
                            taskName: data[key].name,
                            taskDetail: data[key].detail,
                            point: data[key].point,
                            taskDateStart: data[key].waktuMulai,
                            taskDateEnd: data[key].waktuSelesai,
                            priorityID: data[key].priorityID,
                            sectionID: data[key].sectionID,
                            isTaskDone: false
                        });
                    }
                }    
            }

            return res.status(201).send({
                message: 'success',
                data: create,
            });
        } catch (error) {
            return res.status(500).send({
                message: 'failed',
                data: error,
            });
        }
    }

    async update(req, res) {
        try {
            const model = TaskModel();
            const id = req.params.taskID;
            const data = req.body;
            const userModel = UserModel();
            const check = await userModel.findOne({
                where: {
                    ID: data.userid,
                }
            });

            if (check && check.roleID == '1') {
                const update = await model.update({
                    taskName: data.name,
                    taskDetail: data.detail,
                    point: data.point,
                    taskDateStart: data.waktuMulai,
                    taskDateEnd: data.waktuSelesai,
                    priorityID: data.priorityID,
                    sectionID: data.sectionid
                }, {
                    where: {
                        ID: id,
                    }
                });
    
                return res.status(200).send({
                    message: 'success update task',
                    data: update,
                });
            }

            return res.status(404).send({
                message: 'failed because only parent can edit task',
                data: {},
            });
        } catch (error) {
            return res.status(500).send({
                message: 'failed update task',
                data: {},
            });
        }
    }

    async getTaskByID(req, res) {
        try {
            const model = TaskModel();
            const id = req.params.taskID;

            const data = await model.findOne(
                { 
                    where: { 
                        ID: id, 
                    }
                });

            res.status(200).send({
                message: 'success get single task',
                data,
            });
        } catch (error) {
            res.status(500).send({
                message: 'failed get single task',
                data: {},
            });
        }
    }

    async delete(req, res) {
        try {
            const model = TaskModel();
            const id = req.params.taskID;
            const data = req.body;
            const userModel = UserModel();
            const check = await userModel.findOne({
                where: {
                    ID: data.userid,
                }
            });

            if (check && check.roleID == '1') {
                const remove = await model.destroy({
                    where: {
                        ID: id,
                    }
                });
    
                return res.status(200).send({
                    message: 'success remove task',
                    data: remove,
                });
            }

            return res.status(404).send({
                message: 'failed because only parent can remove task',
                data: {},
            });
        } catch (error) {
            return res.status(500).send({
                message: 'failed remove task',
                data: error.toString(),
            });
        }
    }

    async getAllTaskAnak(req, res) {
        try {
            const taskModel = TaskModel();
            const taskAssignedModel = TaskAssignedModel();
            const userModel = UserModel();
            
            taskAssignedModel.belongsTo(taskModel, {
                foreignKey: 'taskID',
                as: 'Task'
            });

            taskAssignedModel.belongsTo(userModel, {
                foreignKey: 'userID',
                as: 'User'
            });

            const data = await taskAssignedModel.findAll({
                include: [
                    {
                        model: taskModel,
                        as: 'Task',
                    },
                    {
                        model: userModel,
                        as: 'User',
                    }
                ],
            });

            res.status(200).send({
                message: 'success fetch all task anak take',
                data,
            });
        } catch (error) {
            res.status(500).send({
                message: 'failed fetch all task anak take',
                data: {},
            });
        }
    }

    async childTakeTask(req, res) {
        try {
            const model = TaskAssignedModel();
            const data = req.body;

            const create = model.create({
                ID: nanoid(),
                taskID: data.taskID,
                userID: data.userID,
                isTaskCompleted: false
            });

            return res.status(201).send({
                message: 'success child take task',
                data: create,
            });
        } catch (error) {
            return res.status(500).send({
                message: 'failed child take task',
                data: error.toString(),
            });
        }
    }

    async taskCompleted(req, res) {
        try {
            const model = TaskAssignedModel();
            const userModel = UserModel();
            const taskModel = TaskModel();
            const historyModel = HistoryModel();
            const reviewModel = ReviewModel();
            const taskAssignedModel = TaskAssignedModel();
            const data = req.body;
            const id = req.params.taskID;

            const update = await model.update({
                isTaskCompleted: true,
            }, {
                where: {
                    [Op.and]: [
                      { userID: data.userID },
                      { taskID: id }
                    ]
                }
            });

            if (update) {
                const taskdata = await taskModel.findOne({
                    where: {
                        ID: id
                    }
                });
                // check waktu pengumpulan
                if (moment().isAfter(taskdata.taskDateEnd)) {
                    console.log('kurang');
                    const userdata = await userModel.update({
                        score: Sequelize.literal(`score - ${taskdata.point}`)
                    }, {
                        where: {
                            ID: data.userID
                        }
                    });

                    const usertaskdata = await taskAssignedModel.findOne({
                        where: {
                            taskID: id
                        }
                    });

                    const userReview = await reviewModel.create({
                        ID: nanoid(),
                        taskID: usertaskdata.ID,
                        userID: data.userID,
                        isTaskSuccess: false
                    });

                    const userHistory = await historyModel.create({
                        ID: nanoid(),
                        taskID: usertaskdata.ID,
                        userID: data.userID
                    });

                    return res.status(200).send({
                        message: 'success set point user with substraction',
                        data: userdata,
                        history: userHistory,
                        review: userReview
                    });
                }

                if (moment().isBefore(taskdata.taskDateEnd)) {
                    console.log('tambah');

                    const userdata = await userModel.update({
                        score: Sequelize.literal(`score + ${taskdata.point}`)
                    }, {
                        where: {
                            ID: data.userID
                        }
                    });

                    const usertaskdata = await taskAssignedModel.findOne({
                        where: {
                            taskID: id
                        }
                    });

                    const userReview = await reviewModel.create({
                        ID: nanoid(),
                        taskID: usertaskdata.ID,
                        userID: data.userID,
                        isTaskSuccess: true
                    });

                    const userHistory = await historyModel.create({
                        ID: nanoid(),
                        taskID: usertaskdata.ID,
                        userID: data.userID
                    });
                    
                    return res.status(200).send({
                        message: 'success set point user with addition',
                        data: userdata,
                        history: userHistory,
                        review: userReview
                    });
                }

                return res.status(404).send({
                    message: 'failed set point task completed',
                    data: {}
                });
            }

            return res.status(404).send({
                message: 'failed update set task completed',
                data: {}
            });
        } catch (error) {
            return res.status(500).send({
                message: 'failed set task completed',
                data: error.toString(),
            });
        }
    }

    async searchTask(req, res) {
        try {
            const keyword = req.query.q;
            const model = TaskModel();
            console.log(keyword);
            const data = await model.findAll({
                where: {
                    taskName: { [Op.like]: `%${keyword}%` }
                },
                raw: true
            });

            return res.status(201).send({
                message: 'success search task',
                data
            });
        } catch (error) {
            return res.status(500).send({
                message: 'failed search task',
                data: error.toString(),
            });
        }
    }

    async getAllTask(req, res) {
        try {
            const model = TaskModel();
            const priorityModel = PriorityModel();

            model.belongsTo(priorityModel, { foreignKey: 'priorityID', as: 'Priority'});

            const data = await model.findAll({
                include: [
                    { 
                        model: priorityModel, 
                        as: 'Priority' 
                    }
                ]
            });

            res.status(200).send({
                message: 'success fetch all task',
                data,
            });
        } catch (error) {
            res.status(500).send({
                message: 'failed fetch all task',
                data: {},
            });
        }
    }

    async filterPriority(req, res) {
        try {
            const keyword = req.query.p;
            const model = TaskModel();
            const priorityModel = PriorityModel();

            model.belongsTo(priorityModel, { foreignKey: 'priorityID', as: 'Priority'});
            
            const data = await model.findAll({
                include: [
                    {
                        model: priorityModel,
                        as: 'Priority',
                        where: {
                            priorityName: keyword
                        }
                    }
                ],
                raw: true,
            });

            return res.status(201).send({
                message: 'success filter priority for task',
                data
            });
        } catch (error) {
            return res.status(500).send({
                message: 'failed filter priority for task',
                data: error.toString(),
            });
        }
    }
}

module.exports = new TaskController();