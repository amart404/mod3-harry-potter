
exports.up = function(knex, Promise) {
  return knex.schema.createTable('wizard', (table) => {
      table.increments()
      table.text('name')
      table.text('house')
      table.integer('mentor_id').references('character.id')
      table.integer('friend_id').references('character.id')
      table.text('outcome')
  })
};

exports.down = function(knex, Promise) { 
    return knex.schema.dropTable('wizard')
};
