exports.up = function(knex, Promise) {
  return knex.schema.createTable('bears', tbl => {
    tbl.increments();

    tbl.string('name', 256).notNullable();

    // FK
    tbl
      .integer('zoo_id')
      .unsigned() // sometimes
      .notNullable()
      .references('id')
      .inTable('zoos')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('bears');
};
