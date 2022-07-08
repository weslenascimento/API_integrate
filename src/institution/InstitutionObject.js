const InstitutionModel  = require('./InstitutionModel');
const filedsRequired    = require('../../errors/error/1-filedsRequired');
const validationId      = require('../../errors/error/2-validationId');

class Search{
    All(){
        return InstitutionModel.findAll();
    }
    Id(value){
        return InstitutionModel.findByPk(value);
    }
}

class Create{
    async New(name, tradeName, maintainer, cnpj, atived){
        return InstitutionModel.create({
            name,
            tradeName,
            maintainer,
            cnpj,
            atived
        });
    }
}

class Update{
    Item(idInstitution, name, tradeName, maintainer, cnpj, atived){      
        return InstitutionModel.update({
            name,
            tradeName,
            maintainer,
            cnpj,
            atived
        },{
            where: {
                idInstitution: idInstitution
            }
        })
    }
}

class Delete{
    Item(idInstitution){
        InstitutionModel.destroy({
            where:{
                idInstitution: idInstitution
            }
        })
    }
}

class Validation {
    Id(fields){
        if(isNaN(fields.idInstitution)){
            throw new validationId('idInstitution');
        }
        if(!fields.idInstitution){
            throw new filedsRequired('idInstitution');
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