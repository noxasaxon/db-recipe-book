Access RDB from Node

- raw or native driver.
- query builder.
- Object Relational Mapper (ORM). Bookshelf, Sequelize, TypeORM

Knex

- protects from SQL Injection.
- connection pooling.
- migrations.
- seeding.
- support promises, callbacks.
- schema builder. Use DDL statements like create table, drop table.
- query builder with a clean js api.
- standardization. Normalizes DB dialects.

How to use it

- install it globally (the cli, npm i -g knex or yarn global add knex)
- install a db driver
- initialize knex (knex init).

Tables

Zoos Table should have the following columns:

id: primary key, automincrements.
name: unique, alphanumeric up to 255 characters long.
created_at: should automatically default to the current date and time.
Bears Table should have the following columns:

id: primary key, automincrements.
zooId: an integer that relates this table to the zoos table. Enforce data integrity.
species: unique, alphanumeric up to 80 characters long.
latinName: alphanumeric up to 80 characters long.
createdAt: should automatically default to the current date and time.
