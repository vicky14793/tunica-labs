exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', function(table) {
    table.increments('id').unsigned().primary();
    table.string('name');
    table.string('school');
    table.string('sclass');
    table.date('dob');
    table.string('division');
    table.boolean('status').defaultTo(true);
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('students');
};
