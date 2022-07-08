const express = require("express");
const Router = express.Router();
// const bcrypt = require("bcrypt");
const InstitutionObjs = require('./InstitutionObject');
const returns = require('../defaultReturns');
const authenticate = require('../../middlewares/authenticate');
const { user } = require("pg/lib/defaults");

/**
 * Lista todos registros
*/
Router.get('/institutions', authenticate, async (req, res, next) => {
    var data = [];
    try{
        const institution = new InstitutionObjs();
        data = await institution.Search.All();
        res.status(200);
        res.json({
            message: returns('get', data),
            data: data
        });
    } catch(e){
        next(e)
    }
});

/**
 * Lista registro específico
 */
Router.get('/institutions/:idInstitution', authenticate, async (req, res, next) => {
    var data;
    try{
        const idInstitution = parseInt(req.params.idInstitution);
        const person = new InstitutionObjs();
        person.Validation.Id(req.params);
        data = await person.Search.Id(idInstitution);
        res.status(200);
        res.json({
            message: returns('get', data),
            data: data
        });
    } catch(e){
        next(e);
    }
});


/**
 * Cria novo registro
*/
Router.post('/institutions', authenticate, async (req, res, next) => {
    var data;
    const {name, tradeName, maintainer, cnpj, atived} = req.body;
    try {
        const institution = new InstitutionObjs();
        institution.Validation.Fields(req.body);
        data = await institution.Create.New(name, tradeName, maintainer, cnpj, atived);
        res.status(200);
        res.json({
            message: returns('post'),
            data: data
        });
    } catch (e) {
        next(e);
    }
});

/**
 * Edita registro existente
*/
Router.put('/institutions/:idInstitution', authenticate, async (req, res, next) => {
    var data;
    const {name, tradeName, maintainer, cnpj, atived} = req.body;
    try {
        const idInstitution = parseInt(req.params.idInstitution);
        const institution = new InstitutionObjs();

        institution.Validation.Id(req.params);
        institution.Validation.Fields(req.body);

        await institution.Update.Item(idInstitution, name, tradeName, maintainer, cnpj, atived);
        data = await institution.Search.Id(idInstitution);
        res.status(200);
        res.json({
            message: returns('update'),
            data: data
        });
    } catch (e) {
        next(e);
    }
});
module.exports = Router;