const { DataTypes } = require('sequelize');
const { Database } = require('../libraries/database');

function TierModel() {
    // .define('namaPerwakilanTabel', {} -> kolom tabel di database),
    // {} -> konfigurasi / mapping ke tabel apa di Postgre )

    return Database.define('TierModel', {
        ID: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        tierName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pointLimit: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        tableName: 'Tiers',
        timestamps: false,
    })
}

module.exports = TierModel;