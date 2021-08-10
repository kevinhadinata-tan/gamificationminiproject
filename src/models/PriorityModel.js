const { DataTypes } = require('sequelize');
const { Database } = require('../libraries/database');

function PriorityModel() {
    // .define('namaPerwakilanTabel', {} -> kolom tabel di database),
    // {} -> konfigurasi / mapping ke tabel apa di Postgre )

    return Database.define('PriorityModel', {
        ID: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        priorityName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'Priorities',
        timestamps: false,
    })
}

module.exports = PriorityModel;