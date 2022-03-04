const express = require('express')
const { route } = require('express/lib/application')
const router = express.Router()
const mongoose = require ('mongoose')
require('../models/Categoria')
const Categoria = mongoose.model("categorias")
require('../models/Postagem')
const Postagem = mongoose.model("postagens")


router.get('/', (req, res) => {
    res.render("admin/index")
})

router.get('/posts', (res,req) =>{
    res.send('Pagina de post do painel ADM')
})

router.get('/categorias',(req, res) =>{
    Categoria.find().lean().sort({data: 'desc'}).then((categorias) =>{
        res.render("admin/categorias", {categorias: categorias})    
    }).catch((err) =>{
        req.flash("error_msg", "Houve um erro ao listar as categorias")
        res.redirect("/admin")
    })
    
})

router.get('/categorias/addcategoria',(req, res) =>{
    res.render('admin/addcategoria')

})

router.post("/categorias/nova", (req, res) => {

    var erros = []
    
    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
     erros.push({text: "Nome inválido"})
    }

    if(req.body.nome.length !=0 && req.body.nome.length < 3){
        erros.push({text: "Nome muito curto"})
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        erros.push({text: "Slug inválido"})
    }

    if(erros.length>0){
        res.render("admin/addcategoria", {erros: erros})
    }else{
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
            
        }

        new Categoria(novaCategoria).save().then(()=>{
            req.flash("success_msg", "Categoria criada com sucesso")
            res.redirect("/admin/categorias")
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao salvar a categoria, tente novamente.")
            res.redirect("/admin/categorias")
        })
    }
})

router.get("/categorias/edit/:id", (req, res) => {
    Categoria.findOne({_id: req.params.id}).lean().then((categoria) =>{
        res.render("admin/editcategorias", {categoria: categoria})
    }).catch((err) =>{
        req.flash("error_msg", "Essa categoria não existe")
        res.redirect("/admin/categorias")
    })
    
})

router.post("/categorias/deletar", (req,res) =>{
    Categoria.deleteOne({_id: req.body.id}).lean().then(() =>{
        req.flash("success_msg", "Categoria deletada com sucesso")
        res.redirect("/admin/categorias")
    }).catch((err) =>{
        req.flash("error_msg", "Erro ao deletar a categoria")
        res.redirect("/admin/categorias")
    })
})

router.get("/postagens", (req, res) =>{
    res.render("admin/postagens")
})


router.get("/postagens/addpostagem", (req, res) =>{
    Categoria.find().lean().then((categorias) =>{
        res.render("admin/addpostagem", {categorias: categorias})
    }).catch((err) =>{
        req.flash("error_msg", "Houve um erro ao carreagar o formulário")
        req.redirect("/admin")
    })
    
})

router.post("/postagens/nova", (req,res) =>{
    var erros = []
    
    if(!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null){
        erros.push({text: "Título inválido"})
       }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        erros.push({text: "Slug inválido"})
    }

    if(!req.body.descricao || typeof req.body.descricao == undefined || req.body.descricao == null){
        erros.push({text: "Descrição inválida"})
    }

    if(!req.body.conteudo || typeof req.body.conteudo == undefined || req.body.conteudo == null){
        erros.push({text: "Conteúdo inválida"})
    }

    if(req.body.categoria == "0"){
        erros.push({text: "Categoria inválida, registre uma categoria"})
    }

    if(erros.length>0){
        res.render("admin/addpostagem", {erros: erros})
    }else{
        const novaPostagem = {
            titulo: req.body.titulo,
            slug: req.body.slug,
            descricao: req.body.descricao,
            conteudo: req.body.conteudo,
            categoria: req.body.categoria
        }

        new Postagem(novaPostagem).save().then(()=>{
            req.flash("success_msg", "Postagem criada com sucesso")
            res.redirect("/admin/postagens")
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao salvar a postagem, tente novamente.")
            res.redirect("/admin/postagens")
        })

    }
})




module.exports = router