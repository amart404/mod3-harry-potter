const express = require('express')
const router = express.Router()
const queries = require('../db/queries')

function isValidId(req, res, next) {
    if(!isNaN(req.params.id)) return next()
    next(new Error('Invalid ID'))
}

function validChar(character) {
    const hasName = typeof character.name == 'string' && character.name.trim() != ''
    const hasMinistry = typeof character.ministryOfMagic == 'boolean' && character.ministryOfMagic != null
    const hasDumbledore = typeof character.dumbledoresArmy == 'boolean' && character.dumbledoresArmy != null
    const hasOrder = typeof character.orderOfThePhoenix == 'boolean' && character.orderOfThePhoenix != null
    const hasDeath = typeof character.deathEater == 'boolean' && character.deathEater != null
    return hasName && hasMinistry && hasDumbledore && hasOrder && hasDeath
}

router.get('/', (req, res) => {
    queries.getAllChars().then(characters => {
        res.json(characters)
    })
})

router.get('/:id', isValidId, (req, res, next) => {
    queries.getOneChar(req.params.id).then(character => {
        if(character) {
            res.json(character)
        } else {
            next()
        }
    })
})

router.post('/', (req, res, next) => {
    if(validChar(req.body)) {
        queries.createChar(req.body).then(characters => {
            res.json(characters[0]);
        })
    } else {
        next(new Error('Invalid character'))
    }
})

router.put('/:id', isValidId, (req, res, next) => {
    if(validChar(req.body)) {
        queries.updateChar(req.params.id, req.body).then(characters => {
            res.json(characters[0])
        })
    } else {
        next(new Error('Invalid character'))
    }
})

router.delete('/:id', isValidId, (req, res) => {
    queries.deleteChar(req.params.id).then(() => {
        res.json({
            deleted: true
        })
    })
})

module.exports = router