const Sequelize = require('sequelize');
const connection = require('../../database/database');

const InstitutionModel = connection.define('tb_institution', {
    idInstitution: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name : {
        type: Sequelize.STRING(200),
        allowNull: false
    },
    tradeName : {
        type: Sequelize.STRING(200),
        allowNull: false
    },
    maintainer : {
        type: Sequelize.STRING(200),
        allowNull: false
    },
    cnpj: {
        type: Sequelize.STRING(14),
        allowNull: false,
        unique: true
    },
    atived: {
        type: Sequelize.BOOLEAN
    }
});

InstitutionModel.sync({ alter: true });


module.exports = InstitutionModel;