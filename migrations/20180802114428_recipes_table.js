exports.up = function(knex, Promise) {
  // create the zoo table
  return knex.schema.createTable('recipes', function(tbl) {
    //  pk
    tbl.increments(); // creates an id (you can name it), makes it int, makes autoincrement

    // fk from dish, each recipe goes to one dish. dish can have multiple recipes
    tbl
      .integer('dish_id')
      .unsigned() // sometimes
      .notNullable()
      .references('id')
      .inTable('dishes')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    // other fields
    tbl
      .string('name', 256)
      .notNullable()
      .unique()
      .defaultTo('Not Provided');

    tbl.string('ingredients', 500).defaultTo('Not Provided');

    tbl.string('steps', 1000).defaultTo('Not Provided');
  });
};

exports.down = function(knex, Promise) {
  // drop the zoo table
  return knex.schema.dropTableIfExists('recipes');
};
