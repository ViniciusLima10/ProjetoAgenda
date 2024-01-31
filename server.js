require("dotenv").config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.CONECTION_STRING)
  .then(() => {
    app.emit("pronto");
    console.log("base de dados conectada")
  }).catch(e => console.log(e))

//Configurando COOKIES  =================================

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const sessionOptions = session({
  secret: "aasdnijashn kjashd kajsdh kajsh kjsahd kasjh",
  store: MongoStore.create({mongoUrl: process.env.CONECTION_STRING,
  resave: false,
  saveUnitialized: false,
  cookie: { 
    maxAge: 1000 * 60 * 60 * 24 * 7,//7 dias
    httpOnly: true
  }
  })
})

app.use(sessionOptions);
app.use(flash());

//=================================================
const routes = require('./routes');
const path = require('path');
const helmet = require('helmet')
const csrf = require('csurf')
const {middlewareGlobal, checkCsrfErro, csrfMiddleware} = require('./src/middleware/middleware')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

app.use(helmet())
app.use(csrf())
app.use(middlewareGlobal)
app.use(checkCsrfErro)
app.use(csrfMiddleware)

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(routes);

app.on("pronto", () => {
  app.listen(3000, () => {
    console.log('Acessar http://localhost:3000');
    console.log('Servidor executando na porta 3000');
  });
})

