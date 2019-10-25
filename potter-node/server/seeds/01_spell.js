const spells = require('../spells')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('spell').del()
    .then(function () {
      // Inserts seed entries
      return knex('spell').insert(spells);
    });
};
