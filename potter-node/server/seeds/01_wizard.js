const wizards = require('../wizards')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('wizard').del()
    .then(function () {
      // Inserts seed entries
      return knex('wizard').insert(wizards);
    });
};
