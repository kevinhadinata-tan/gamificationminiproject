const { DataTypes } = require('sequelize');
const { Database } = require('../libraries/database');

function TaskModel() {
    // .define('namaPerwakilanTabel', {} -> kolom tabel di database),
    // {} -> konfigurasi / mapping ke tabel apa di Postgre )

    return Database.define('TaskModel', {
        ID: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        taskName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        taskDetail: {
            type: DataTypes.STRING,
            allowNull: true
        },
        point: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        taskDateStart: {
            type: DataTypes.DATE,
            allowNull: true
        },
        taskDateEnd: {
            type: DataTypes.DATE,
            allowNull: true
        },
        priorityID: {
            type: DataTypes.STRING,
            allowNull: true
        },
        sectionID: {
            type: DataTypes.STRING,
            allowNull: true
        },
        isTaskDone: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        tableName: 'Tasks',
        timestamps: true,
    })
}

module.exports = TaskModel;