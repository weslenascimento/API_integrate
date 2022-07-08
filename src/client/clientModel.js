const Sequelize = require('sequelize');
const connection = require('../../database/database');

const ClientModel = connection.define('tb_client', {
    idClient: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    code : {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: true
    },
    name : {
        type: Sequelize.STRING(200),
        allowNull: true
    },
    publicPlace : {
        type: Sequelize.STRING(200),
        allowNull: true
    },
    number: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    complement : {
        type: Sequelize.STRING(200),
        allowNull: true
    },
    neighborhood : {
        type: Sequelize.STRING(200),
        allowNull: true
    },
    uf: {
        type: Sequelize.STRING(14),
        allowNull: true
    },
    cep: {
        type: Sequelize.STRING(8),
        allowNull: true
    },
    ddd: {
        type: Sequelize.STRING(10),
        allowNull: true
    },
    phone: {
        type: Sequelize.STRING(20),
        allowNull: true
    }
});

ClientModel.sync({ alter: true });


module.exports = ClientModel;