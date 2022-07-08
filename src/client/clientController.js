const express = require("express");
const Router = express.Router();
// const bcrypt = require("bcrypt");
const ClientObjs = require('./clientObject');
const returns = require('../defaultReturns');
const authenticate = require('../../middlewares/authenticate');
const { user } = require("pg/lib/defaults");

const axios = require('axios');

/**
 * Lista todos registros
*/
Router.get('/clients', authenticate, async (req, res, next) => {
    var data = [];
    try{
        const client = new ClientObjs();
        data = await client.Search.All();
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
Router.get('/clients/:idClient', authenticate, async (req, res, next) => {
    var data;
    try{
        const idClient = parseInt(req.params.idClient);
        const client = new ClientObjs();
        client.Validation.Id(req.params);
        data = await client.Search.Id(idClient);
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
Router.post('/clients', authenticate, async (req, res, next) => {
    var data; 
    var uf;   
    const {code, name, publicPlace, number, complement, neighborhood, cep, ddd, phone} = req.body;
    try {
        const client = new ClientObjs();
        // client.Validation.Fields(req.body);
        uf  = await client.Search.Uf(cep);
        data = await client.Create.New(code, name, publicPlace, number, complement, neighborhood, uf, cep, ddd, phone);
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
Router.put('/clients/:idClient', authenticate, async (req, res, next) => {
    var data;
    const {code, name, publicPlace, number, complement, neighborhood, cep, ddd, phone} = req.body;
    try {
        const idClient = parseInt(req.params.idClient);
        const client = new ClientObjs();

        client.Validation.Id(req.params);
        var uf  = await client.Search.Uf(cep);
        await client.Update.Item(idClient, code, name, publicPlace, number, complement, neighborhood, uf, cep, ddd, phone);
        data = await client.Search.Id(idClient);
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