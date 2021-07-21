import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('items', 
    table => {
      table.timestamp('created_at').defaultTo(new Date())
      table.timestamp('updated_at').defaultTo(new Date())      
    })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('items',
    table => {
      table.dropColumn('created_at')
      table.dropColumn('updated_at')
    }
  )
}

