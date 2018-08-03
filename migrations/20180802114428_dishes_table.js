exports.up = function(knex, Promise) {
  // create the zoo table
  return knex.schema.createTable('dishes', function(tbl) {
    //  pk
    tbl.increments(); // creates an id (you can name it), makes it int, makes autoincrement

    // other fields
    tbl
      .string('name', 256)
      .notNullable()
      .unique()
      .defaultTo('Not Provided');
  });
};

exports.down = function(knex, Promise) {
  // drop the zoo table
  return knex.schema.dropTableIfExists('dishes');
};
