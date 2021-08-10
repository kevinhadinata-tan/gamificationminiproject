const { DataTypes } = require('sequelize');
const { Database } = require('../libraries/database');

function SectionModel() {
    // .define('namaPerwakilanTabel', {} -> kolom tabel di database),
    // {} -> konfigurasi / mapping ke tabel apa di Postgre )

    return Database.define('SectionModel', {
        ID: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        sectionName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        workspaceID: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'Sections',
        timestamps: true,
    })
}

module.exports = SectionModel;