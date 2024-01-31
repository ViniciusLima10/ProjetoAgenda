const express = require('express');
const route = express.Router(); // Change 'route' to 'router'

//controllers
const homeController = require('./src/controllers/homeController.js');
const loginController = require('./src/controllers/loginController.js');
const contatoController = require('./src/controllers/contatoController.js');
const { loginRequired } = require('./src/middleware/middleware');
// Routes for home

route.get('/', homeController.index);

// Routes for login
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

//routes for contacts
route.get("/contato/index", loginRequired, contatoController.index);
route.post("/contato/create", loginRequired, contatoController.create);
route.get("/contato/index/:id", loginRequired, contatoController.editIndex);
route.post("/contato/edit/:id", loginRequired, contatoController.edit);
route.get("/contato/delete/:id", loginRequired, contatoController.delete);

module.exports = route; // Change 'route' to 'router'
