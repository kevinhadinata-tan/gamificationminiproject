const { DataTypes } = require('sequelize');
const { Database } = require('../libraries/database');

function WorkspaceModel() {
    // .define('namaPerwakilanTabel', {} -> kolom tabel di database),
    // {} -> konfigurasi / mapping ke tabel apa di Postgre )

    return Database.define('WorkspaceModel', {
        ID: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        workspaceName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        workspaceDetail: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        tableName: 'Workspaces',
        timestamps: true,
    })
}

module.exports = WorkspaceModel;