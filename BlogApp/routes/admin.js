const express = require('express')
const { route } = require('express/lib/application')
const router = express.Router()

router.get('/', (req, res) => {
    res.render("admin/index")
})

router.get('/posts', (res,req) =>{
    res.send('Pagina de post do painel ADM')
})

router.get('/categorias',(req, res) =>{
    res.render("admin/categorias")
})

router.get('/categorias/addcategoria',(req, res) =>{
    res.render('admin/addcategoria')

})
module.exports = router