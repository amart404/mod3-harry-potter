const express = require('express')
const router = express.Router()
const queries = require('../db/queries')

function isValidId(req, res, next) {
    if(!isNaN(req.params.id)) return next()
    next(new Error('Invalid ID'))
}

function validSpell(spell) {
    const hasName = typeof spell.name == 'string' && spell.name.trim() != ''
    const hasType = typeof spell.type == 'string' && spell.type.trim() != ''
    const hasDesc = typeof spell.description == 'string' && spell.description.trim() != ''
    return hasName && hasType && hasDesc
}

router.get('/', (req, res) => {
    queries.getAllSpells().then(spells => {
        res.json(spells)
    })
})

router.get('/:id', isValidId, (req, res, next) => {
    queries.getOneSpell(req.params.id).then(spell => {
        if(spell) {
            res.json(spell)
        } else {
            next()
        }
    })
})

module.exports = router