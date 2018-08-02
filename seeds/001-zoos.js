exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('zoos')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('zoos').insert([
        { name: 'Houston Zoo' },
        { name: 'Central Park Zoo' },
        { name: 'LA Zoo' },
      ]);
    });
};
