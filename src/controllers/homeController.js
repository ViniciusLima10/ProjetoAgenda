const {buscaContatos} = require('../models/ContatoModel')

exports.index = async(req, res) => {
  const contatos = await buscaContatos();
  res.render('index', {contatos});
};
