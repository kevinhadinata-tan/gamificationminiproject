const { DataTypes } = require('sequelize');
const { Database } = require('../libraries/database');

function HistoryModel() {
    // .define('namaPerwakilanTabel', {} -> kolom tabel di database),
    // {} -> konfigurasi / mapping ke tabel apa di Postgre )

    return Database.define('HistoryModel', {
        ID: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        taskID: {
            type: DataTypes.STRING,
            allowNull: true
        },
        userID: {
            type: DataTypes.STRING,
            allowNull: true
        },
        rewardID: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'Histories',
        timestamps: false,
    })
}

module.exports = HistoryModel;