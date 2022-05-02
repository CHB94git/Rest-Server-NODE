const { Router } = require('express')
const { search, searchByCategory } = require('../controllers/busqueda')

const router = Router()

router.get('/:collection/:termSearch', search)

// Buscar productos por categoria
// router.get('/productos/:category', searchByCategory)



module.exports = router