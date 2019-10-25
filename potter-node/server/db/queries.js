const knex = require('./knex')

module.exports = {
    getAllChars() {
        return knex('character')
    },
    getOneChar(id) {
        return knex('character').where('id', id).first()
    },
    createChar(character) {
        return knex('character').insert(character, '*')
    },
    updateChar(id, character) {
        return knex('character').where('id', id).update(character, '*')
    },
    deleteChar(id) {
        return knex('character').where('id', id).del()
    },
    getAllSpells() {
        return knex('spell')
    },
    getOneSpell(id) {
        return knex('spell').where('id', id).first()
    },
    getAllWizards() {
        return knex('wizard')
    },
    getOneWizard(id) {
        return knex('wizard').where('id', id).first()
    },
    createWizard(wizard) {
        return knex('wizard').insert(wizard, '*')
    },
    updateWizard(id, wizard) {
        return knex('wizard').where('id', id).update(wizard, '*')
    },
    deleteWizard(id) {
        return knex('wizard').where('id', id).del()
    }
}