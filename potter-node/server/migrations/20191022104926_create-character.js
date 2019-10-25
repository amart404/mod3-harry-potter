
exports.up = function(knex, Promise) {
  return knex.schema.createTable('character', (table) => {
      table.increments()
      table.text('name')
      table.text('role')
      table.text('house')
      table.text('patronus')
      table.boolean('ministryOfMagic')
      table.boolean('orderOfThePhoenix')
      table.boolean('dumbledoresArmy')
      table.boolean('deathEater')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('character')
};
