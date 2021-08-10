const SectionModel = require('../models/SectionModel');
const WorkspaceModel = require('../models/WorkspaceModel');
const UserModel = require('../models/UserModel');
const { nanoid } = require('nanoid');

class SectionController {
    async create (req, res) {
        try {
            const model = SectionModel();
            const workspaceModel = WorkspaceModel();
            const data = req.body;

            for (const key in data) {
                const userModel = UserModel();

                const check = await userModel.findOne({
                    where: {
                        ID: data[key].userID,
                    }
                });

                const checkWorkspaceIsAvailable = await workspaceModel.findOne({
                    where: {
                        ID: data[key].workspaceID
                    }
                });

                // console.log('check ', check.dataValues.roleID);
    
                if (check.dataValues && check.dataValues.roleID == '1') {
    
                    // kondisi bila workspacenya sudah ada atau belum
                    if (checkWorkspaceIsAvailable.dataValues) {
                        // if (data.length )
                        var create = await model.create({
                            ID: nanoid(),
                            sectionName: data[key].name,
                            workspaceID: data[key].workspaceID,
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

    async getAllSection(req, res) {
        try {
            const model = SectionModel();
            const workspaceModel = WorkspaceModel();
            model.belongsTo(workspaceModel, {
                foreignKey: 'workspaceID',
                as: 'Workspace'
            })

            const data = await model.findAll({
                include: [
                    {
                        model: workspaceModel,
                        as: 'Workspace'
                    }
                ]
            });

            res.status(200).send({
                message: 'success fetch all section',
                data,
            });
        } catch (error) {
            res.status(500).send({
                message: 'failed fetch all section',
                data: {},
            });
        }
    }

    async getSectionByID(req, res) {
        try {
            const model = SectionModel();
            const id = req.params.ID;

            const data = await model.findOne({ where: { ID: id, }});

            res.status(200).send({
                message: 'success get single section',
                data,
            });
        } catch (error) {
            res.status(500).send({
                message: 'failed get single section',
                data: {},
            });
        }
    }

    async update(req, res) {
        try {
            const model = SectionModel();
            const id = req.params.sectionID;
            const data = req.body;
            const userModel = UserModel();
            const check = await userModel.findOne({
                where: {
                    ID: data.userID,
                }
            });

            console.log('workspace id >> ', id);

            if (check && check.roleID == "1") {
                const update = await model.update({
                    sectionName: data.name,
                }, {
                    where: {
                        ID: id,
                    }
                });
    
                return res.status(200).send({
                    message: 'success update section',
                    data: update,
                });
            }

            return res.status(404).send({
                message: 'failed because only parent can edit section',
                data: {},
            });
        } catch (error) {
            return res.status(500).send({
                message: 'failed update section',
                data: {},
            });
        }
    }

    async delete(req, res) {
        try {
            const model = WorkspacesModel();
            const id = req.params.sectionID;
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
                    message: 'success remove section',
                    data: remove,
                });
            }

            return res.status(404).send({
                message: 'failed because only parent can remove section',
                data: {},
            });

        } catch (error) {
            return res.status(500).send({
                message: 'failed remove section',
                data: {},
            });
        }
    }
}

module.exports = new SectionController();