const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
    name: {type: String, required: true},
    lastname: {type: String, required: false, default: ''},
    email: {type: String, required: false, default: ''},
    phone: {type: String, required: false, default: ''},
    criadoEm: {type: Date, default: Date.now},
});

const ContatoModel = mongoose.model("Contato", ContatoSchema);


const buscaPorId = async function (id) {
    if(typeof id != "string") return;
    const contato = await ContatoModel.findById(id);
    return contato;
}
const buscaPorIdAndDelete = async function (id) {
    if(typeof id != "string") return;
    await ContatoModel.findByIdAndDelete({_id: id});
    return;
}

const buscaContatos = async function () {
    const contatos = await ContatoModel.find().sort({criadoEm: -1});
    return contatos
}


class Contato {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.contato = null;
    }

    async create() {
        this.valida();
        if(this.errors.length > 0) return;
        this.contato = await ContatoModel.create(this.body);
    }

    async buscaPorId(id) {
        if(typeof id === "string") return;
        const contato = await ContatoModel.findById(id);
        return contato
    }



    async editId(id) {
        if(typeof id != "string") return;
        this.valida();
        if(this.errors.length > 0) return;
        this.contato  = await ContatoModel.findByIdAndUpdate(id, this.body, {new: true})
    }

    valida() {
        this.cleanUp();
        //email precisa ser valido
        if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
        if(!this.body.name) this.errors.push('Nome necessario');
        if(!this.body.email && !this.body.phone) this.errors.push('Email ou telefone precisa ser enviado');
    }

    cleanUp() {
        for(const key in this.body) {
          if(typeof this.body[key] !== 'string') {
            this.body[key] = '';
          }
        }
        this.body = {
            name: this.body.name,
            lastname: this.body.lastname,
            email: this.body.email,
            phone: this.body.phone
        };
    }
}



module.exports = {Contato, buscaPorId, buscaContatos, buscaPorIdAndDelete};