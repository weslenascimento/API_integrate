const ClientModel  = require('./clientModel');
const filedsRequired    = require('../../errors/error/1-filedsRequired');
const validationId      = require('../../errors/error/2-validationId');

const axios = require('axios');

class Search{
    All(){
        return ClientModel.findAll();
    }
    Id(value){
        return ClientModel.findByPk(value);
    }
    Uf(value){
        return axios.get(`https://viacep.com.br/ws/${value}/json/`).then(resp =>{
            return resp.data.uf;
        })
    }
}

class Create{
    async New(code, name, publicPlace, number, complement, neighborhood, uf, cep, ddd, phone){
        return ClientModel.create({
            code,
            name,
            publicPlace,
            number,
            complement,
            neighborhood,
            uf,
            cep,
            ddd,
            phone
        });
    }
}

class Update{
    Item(idClient, code, name, publicPlace, number, complement, neighborhood, uf, cep, ddd, phone){      
        return ClientModel.update({
            code,
            name,
            publicPlace,
            number,
            complement,
            neighborhood,
            uf,
            cep,
            ddd,
            phone
        },{
            where: {
                idClient: idClient
            }
        })
    }
}

class Delete{
    Item(code){
        ClientModel.destroy({
            where:{
                idClient: idClient
            }
        })
    }
}

class Validation {
    Id(fields){
        if(isNaN(fields.idClient)){
            throw new validationId('idClient');
        }
        if(!fields.idClient){
            throw new filedsRequired('idClient');
        }
    }
    Fields(fields){
        if(!fields.name){
            throw new filedsRequired('name');
        }
        if(!fields.tradeName){
            throw new filedsRequired('tradeName');
        }
        if(!fields.cnpj){
            throw new filedsRequired('cnpj');
        }
        if(!fields.atived){
            throw new filedsRequired('atived');
        }
    }    
}

class Institution{
    constructor(name, tradeName, maintainer, cnpj, atived){
        this.name = name;
        this.tradeName = tradeName;
        this.maintainer = maintainer;
        this.cnpj = cnpj;
        this.atived = atived;

        /////    Métodos Consulta    ///////
        this.Search = new Search();
        /////    Métodos Criação     ///////
        this.Create = new Create();
        /////    Métodos Atualização ///////
        this.Update = new Update();
        /////    Métodos Atualização ///////
        this.Delete = new Delete();
        /////      Validação         //////
        this.Validation = new Validation();
    }
}


module.exports = Institution;