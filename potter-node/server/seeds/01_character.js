const characters = require('../characters')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('character').del()
    .then(function () {
      // Inserts seed entries
      return knex('character').insert(characters);
    });
};
