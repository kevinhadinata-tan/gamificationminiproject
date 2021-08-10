const { DataTypes } = require('sequelize');
const { Database } = require('../libraries/database');

function TaskAssignedModel() {
    // .define('namaPerwakilanTabel', {} -> kolom tabel di database),
    // {} -> konfigurasi / mapping ke tabel apa di Postgre )

    return Database.define('TaskAssignedModel', {
        ID: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        taskID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isTaskCompleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        tableName: 'Task_Assigned',
        timestamps: true,
    })
}

module.exports = TaskAssignedModel;