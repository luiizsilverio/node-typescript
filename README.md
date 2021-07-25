# curso-node-aluizio
## Conteúdo
* [Sobre o Projeto](#sobre-o-projeto)
* [Tecnologias](#hammer_and_wrench-tecnologias)
* [Iniciando o Projeto](#car-Iniciando-o-projeto)
* [Contato](#email-contato)

## Sobre o projeto
<p>API desenvolvida em NodeJS + Express durante o ![minicurso](https://www.youtube.com/watch?v=M-pNDHC25Vg&list=PLE0DHiXlN_qp251xWxdb_stPj98y1auhc) do prof. Aluizio</p>
<p>Uso de autenticação JWT, upload de imagens, acesso a banco de dados SQLite por meio do Knex.</p>
<p>API publicada na plataforma Heroku, ![aqui](https://curso-node-aluizio.herokuapp.com).</p>
<br />
### Rotas da API
Rota | endpoint                 | Descrição
-----|--------------------------|---------------------------------------------------------------
POST | /sessions                | Rota de autenticação, recebe email e senha retorna o token JWT
GET  | /users                   | Retorna a lista de usuários
POST | /users                   | Cadastra novo usuário e retorna o id
GET  | /items                   | Retorna a lista de itens
GET  | /locations               | Retorna a lista de locations
GET  | /locations/:id           | Retorna os itens da location informada
GET  | /locations?city&uf&items | Retorna as locations da cidade/uf informada
POST | /locations               | Cadastra nova location (objeto no body da requisição          
<br />

## :hammer_and_wrench: Tecnologias
* <ins>NodeJS + Express</ins>
* <ins>Typescript</ins>
* <ins>bcryptjs</ins> para criptografia de senha
* <ins>jsonwebtoken</ins> para geração do token JWT
* Banco de dados <ins>SQLite</ins>
* <ins>Knex</ins> para acessar o banco
* <ins>Celebrate</ins> para validar os dados da requisição
* <ins>Multer</ins> para fazer upload de imagens
* <ins>Cors</ins> para liberar o acesso da API

## :car: Iniciando o projeto
```bash
# Baixe o repositório com git clone e entre na pasta do projeto.
$ git clone https://github.com/luiizsilverio/node-typescript.git

# Execute yarn para instalar as dependências (ou npm install)
$ yarn

# Para iniciar a aplicação
$ yarn dev
 ________________________________
< Servidor rodando na porta 3333 >
 --------------------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||

# Abra http://localhost:3333 no navegador
```

## :email: Contato

E-mail: [**luiiz.silverio@gmail.com**](mailto:luiiz.silverio@gmail.com)
