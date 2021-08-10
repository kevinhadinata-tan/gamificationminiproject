const { DataTypes } = require('sequelize');
const { Database } = require('../libraries/database');

function RewardModel() {
    // .define('namaPerwakilanTabel', {} -> kolom tabel di database),
    // {} -> konfigurasi / mapping ke tabel apa di Postgre )

    return Database.define('RewardModel', {
        ID: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        rewardName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rewardPrice: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tierID: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        rewardImage: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        isShowReward: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    }, {
        tableName: 'Rewards',
        timestamps: true,
    })
}

module.exports = RewardModel;