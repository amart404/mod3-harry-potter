
exports.up = function(knex, Promise) {
  return knex.schema.createTable('spell', (table) => {
    table.increments()
    table.text('name')
    table.text('type')
    table.text('description')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('spell')
};
