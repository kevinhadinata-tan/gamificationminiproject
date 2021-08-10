const { DataTypes } = require('sequelize');
const { Database } = require('../libraries/database');

function RewardUserModel() {
    // .define('namaPerwakilanTabel', {} -> kolom tabel di database),
    // {} -> konfigurasi / mapping ke tabel apa di Postgre )

    return Database.define('RewardUserModel', {
        ID: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        userID: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        rewardID: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        rewardTakenDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        isRewardTaken: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        }
    }, {
        tableName: 'Reward_Users',
        timestamps: true,
    })
}

module.exports = RewardUserModel;