const { DataTypes } = require('sequelize');
const { Database } = require('../libraries/database');

function WorkspaceUserModel() {
    // .define('namaPerwakilanTabel', {} -> kolom tabel di database),
    // {} -> konfigurasi / mapping ke tabel apa di Postgre )

    return Database.define('WorkspaceUserModel', {
        ID: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        workspaceID: {
            type: DataTypes.STRING,
            allowNull: true
        },
        userID: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'Workspace_Users',
        timestamps: true,
    })
}

module.exports = WorkspaceUserModel;