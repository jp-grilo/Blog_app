// Carregando módulos:
    const express = require('express')
    const handlebars = require('express-handlebars')
    const bodyParser = require('body-parser')
    const mongoose = require('mongoose')
    const path = require ('path')
    const session = require('express-session')
    const flash = require('connect-flash')

    const app= express()
    const admin = require ('./routes/admin')

// Configurações
    //sessão
        app.use(session({
            secret: "123456",
            reseva: true,
            saveUninitialized: true
        }))
        app.use(flash())
    
    //Middleware
        app.use((req,res,next) => {
            res.locals.success_msg = req.flash("success_msg")
            res.locals.error_msg = req.flash("error_msg")
            next()
        })    

    // Body-Parser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())

    // Handlebars
        app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')
    
    // Mongoose
        mongoose.Promise = global.Promise
        mongoose.connect('mongodb://localhost/blogapp').then(()=>{
            console.log("Conectado ao BD!")
        }).catch((erro) =>{
            console.log("Erro: "+ erro)
        })
        
    //Public
    
        app.use(express.static(path.join(__dirname,"public")))

// Rotas
    app.use('/admin', admin)
// Outros
const PORT = 8001
app.listen(PORT, ()=>{
    console.log('Servidor rodando')
})