const express = require('express')
const router = express.Router()
const queries = require('../db/queries')

function isValidId(req, res, next) {
    if(!isNaN(req.params.id)) return next()
    next(new Error('Invalid ID'))
}

function validWizard(wizard) {
    const hasName = typeof wizard.name == 'string' && wizard.name.trim() != ''
    const hasHouse = typeof wizard.house == 'string' && wizard.house.trim() != ''
    const hasMentor = !isNaN(wizard.mentor_id)
    const hasFriend = !isNaN(wizard.friend_id)
    const hasOutcome = typeof wizard.outcome == 'string' && wizard.outcome.trim() != ''
    return hasName && hasHouse && hasMentor && hasFriend && hasOutcome
}

router.get('/', (req, res) => {
    queries.getAllWizards().then(wizards => {
        res.json(wizards)
    })
})

router.get('/:id', isValidId, (req, res, next) => {
    queries.getOneWizard(req.params.id).then(wizard => {
        if(wizard) {
            res.json(wizard)
        } else {
            next()
        }
    })
})

router.post('/', (req, res, next) => {
    if(validWizard(req.body)) {
        queries.createWizard(req.body).then(wizards => {
            res.json(wizards[0]);
        })
    } else {
        next(new Error('Invalid wizard'))
    }
})

router.put('/:id', isValidId, (req, res, next) => {
    if(validWizard(req.body)) {
        queries.updateWizard(req.params.id, req.body).then(wizards => {
            res.json(wizards[0])
        })
    } else {
        next(new Error('Invalid wizard'))
    }
})

router.delete('/:id', isValidId, (req, res) => {
    queries.deleteWizard(req.params.id).then(() => {
        res.json({
            deleted: true
        })
    })
})

module.exports = router