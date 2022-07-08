const express = require('express');
const app = express();

const connection = require('./database/database');
const bodyParser = require('body-parser'); ///Pergar dados de formulário
const indexErrors = require('./errors/indexErrors');

const cors = require('cors');

const axios = require('axios');

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


/**
* Conecta ao banco
 */
connection.authenticate().then(() => {
    console.log(`
 *********************************************
        CONECTADO COM SUCESSO AO
            BANCO DE DADOS!
 *********************************************`);
}).catch((e) =>{
    console.log(e);
})


/**
 * Importa controllers
 */
const AuthController        = require('./src/#auth/AuthController');
const UsersController       = require('./src/users/UsersController');
const PersonController      = require('./src/persons/PersonController');
const CarsController        = require('./src/cars/CarsController');
const RentsController       = require('./src/rents/RentsController');
const InstitutionController = require('./src/institution/InstitutionController');
const clientController      = require('./src/client/clientController');


/**
 * Rotas
 */
app.use('/', AuthController);
app.use('/', UsersController);
app.use('/', PersonController);
app.use('/', CarsController);
app.use('/', RentsController);
app.use('/', InstitutionController);
app.use('/', clientController);


/**
 * Tratamento de erros
 */
app.use(indexErrors);

/**
 * Cria e executa a aplicação
*/
app.listen("8000", () =>{
    console.log("Running Server!!");
});