const { DataTypes } = require('sequelize');
const { Database } = require('../libraries/database');

function UserModel() {
    // .define('namaPerwakilanTabel', {} -> kolom tabel di database),
    // {} -> konfigurasi / mapping ke tabel apa di Postgre )

    return Database.define('UserModel', {
        ID: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        roleID: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        tierID: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }, {
        tableName: 'Users',
        timestamps: true,
    })
}

module.exports = UserModel;