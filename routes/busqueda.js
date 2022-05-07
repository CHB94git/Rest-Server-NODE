const { Router } = require('express')

const { search } = require('../controllers')

const router = Router()

router.get('/:collection/:termSearch', search)


module.exports = router