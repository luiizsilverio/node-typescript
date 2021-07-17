import { Knex } from 'knex'

export async function seed(knex: Knex) {
  await knex('items').insert([
    { title: 'Papéis e papelão',   image: 'papel.png' },
    { title: 'Vidros e lâmpadas',  image: 'vidro.png' },
    { title: 'Óleo de cozinha',    image: 'oleo.png' },
    { title: 'Resíduos orgânicos', image: 'organico.png' },
    { title: 'Baterias e pilhas',  image: 'bateria.png' },
    { title: 'Eletrônicos',        image: 'eletronico.png' },
  ])
}
