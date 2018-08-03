exports.up = function(knex, Promise) {
  return knex.schema.createTable('ingredients', tbl => {
    tbl.increments(); //creates a unique id

    tbl.string('name', 256).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('ingredients');
};
