const WorkspaceModel = require('../models/WorkspaceModel');
const WorkspaceUserModel = require('../models/WorkspaceUserModel');
const UserModel = require('../models/UserModel');
const { nanoid } = require('nanoid');

class WorkspaceController {
    async create (req, res) {
        try {
            const model = WorkspaceModel();
            const data = req.body;
            const userModel = UserModel();
            const check = await userModel.findOne({
                where: {
                    ID: data.userID,
                }
            });

            if (check && check.roleID == '1') {
                const create = await model.create({
                    ID: nanoid(),
                    workspaceName: data.name,
                    workspaceDetail: data.detail
                });
    
                if (create) {
                    const TakenModel = WorkspaceUserModel();
    
                    const createTaken = await TakenModel.create({
                        ID: nanoid(),
                        workspaceID: create.ID,
                        userID: data.userID, 
                    });
    
                    return res.status(201).send({
                        message: 'success',
                        data: createTaken,
                    });
                }

                return res.status(404).send({
                    message: 'failed because cant create workspaceUser',
                    data: {},
                });
            }

            return res.status(404).send({
                message: 'failed because only parent can add workspace',
                data: {},
            });
        } catch (error) {
            return res.status(500).send({
                message: 'failed',
                data: error.toString(),
            });
        }
    }

    async getAllWorkspace(req, res) {
        try {
            const model = WorkspaceModel();
            const data = await model.findAll();

            return res.status(200).send({
                message: 'success fetch all workspace',
                data,
            });
        } catch (error) {
            return res.status(500).send({
                message: 'failed fetch all workspace',
                data: {},
            });
        }
    }

    async getWorkspaceByID(req, res) {
        try {
            const model = WorkspaceModel();
            const id = req.params.workspaceID;

            const data = await model.findOne({ where: { ID: id, }});

            return res.status(200).send({
                message: 'success get single workspace',
                data,
            });
        } catch (error) {
            return res.status(500).send({
                message: 'failed get single workspace',
                data: {},
            });
        }
    }

    async update(req, res) {
        try {
            const model = WorkspaceModel();
            
            const id = req.params.workspaceID;
            const data = req.body;
            const userModel = UserModel();
            const check = await userModel.findOne({
                where: {
                    ID: data.userID,
                }
            });

            if (check && check.roleID == '1') {
                const update = await model.update({
                    workspaceName: data.name,
                    workspaceDetail: data.detail,
                }, {
                    where: {
                        ID: id,
                    }
                });
    
                return res.status(200).send({
                    message: 'success update workspace',
                    data: update,
                });
            }

            return res.status(404).send({
                message: 'failed because only parent can edit workspace',
                data: {},
            });
        } catch (error) {
            res.status(500).send({
                message: 'failed update workspace',
                data: error.toString(),
            });
        }
    }

    async delete(req, res) {
        try {
            const model = WorkspaceModel();
            const id = req.params.workspaceID;
            const data = req.body;
            const userModel = UserModel();
            const check = await userModel.findOne({
                where: {
                    ID: data.userID,
                }
            });

            if (check && check.roleID == '1') {
                const takenModel = WorkspaceUserModel();
                const takenRemove = await takenModel.destroy({
                    where: {
                        workspaceID: id,
                    }
                });
                
                const remove = await model.destroy({
                    where: {
                        ID: id,
                    }
                });
    
                return res.status(200).send({
                    message: 'success remove workspace',
                    data: remove, 
                    dataTaken: takenRemove,
                }); 
            }

            return res.status(404).send({
                message: 'failed because only parent can remove workspace',
                data: {},
            });

        } catch (error) {
            return res.status(500).send({
                message: 'failed remove workspace',
                data: error.toString(),
            });
        }
    }
}

module.exports = new WorkspaceController();