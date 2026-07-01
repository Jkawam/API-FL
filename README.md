<div align="center">

#  Digital Store API

### API REST desenvolvida com Node.js, Express, Sequelize e MySQL

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens)

</div>

---

#  Sobre o Projeto

A **Digital Store API** é uma API REST desenvolvida durante um **curso de Desenvolvimento Full Stack**, com o objetivo de fornecer toda a camada Back-end de uma plataforma de e-commerce.

A aplicação foi construída utilizando **Node.js**, **Express**, **Sequelize** e **MySQL**, seguindo a arquitetura **MVC (Model-View-Controller)** para garantir organização, escalabilidade e facilidade de manutenção.

Além do gerenciamento de usuários, categorias e produtos, a API implementa autenticação baseada em **JSON Web Token (JWT)** para proteger rotas que exigem autenticação.

---

#  Destaques

- API REST seguindo boas práticas de desenvolvimento
- Arquitetura MVC
- Autenticação utilizando JWT
- Banco de dados relacional com MySQL
- ORM Sequelize
- Organização modular do projeto
- Código escalável e de fácil manutenção
- Desenvolvimento colaborativo em equipe

---

#  Funcionalidades

## Usuários

- Cadastro de usuários
- Consulta de usuários
- Atualização de usuários
- Exclusão de usuários

## Categorias

- Cadastro de categorias
- Consulta de categorias
- Atualização de categorias
- Exclusão de categorias

## Produtos

- Cadastro de produtos
- Consulta de produtos
- Atualização de produtos
- Exclusão de produtos
- Associação entre produtos e categorias
- Cadastro de imagens dos produtos
- Cadastro de opções dos produtos

## Autenticação

- Login
- Geração de Token JWT
- Proteção de rotas privadas

---

#  Tecnologias Utilizadas

## Back-end

- Node.js
- Express.js
- Sequelize ORM
- MySQL
- JWT (JSON Web Token)
- bcrypt
- dotenv

## Ferramentas

- Git
- GitHub
- Postman

---

#  Arquitetura do Projeto

```text
src
├── config
├── controllers
├── database
├── middlewares
├── models
├── routes
├── services
├── utils
├── app.js
└── server.js
```

---

# 🔗 Endpoints

## Usuários

| Método | Endpoint | Descrição |
|---------|----------|-----------|
| GET | /users | Lista todos os usuários |
| GET | /users/:id | Busca usuário por ID |
| POST | /users | Cadastra um usuário |
| PUT | /users/:id | Atualiza um usuário |
| DELETE | /users/:id | Remove um usuário |

---

## Categorias

| Método | Endpoint | Descrição |
|---------|----------|-----------|
| GET | /categories | Lista todas as categorias |
| GET | /categories/:id | Busca categoria por ID |
| POST | /categories | Cadastra uma categoria |
| PUT | /categories/:id | Atualiza uma categoria |
| DELETE | /categories/:id | Remove uma categoria |

---

## Produtos

| Método | Endpoint | Descrição |
|---------|----------|-----------|
| GET | /products | Lista todos os produtos |
| GET | /products/:id | Busca produto por ID |
| POST | /products | Cadastra um produto |
| PUT | /products/:id | Atualiza um produto |
| DELETE | /products/:id | Remove um produto |

---

#  Autenticação

A API utiliza **JSON Web Token (JWT)** para autenticação.

As rotas protegidas exigem o envio do token no cabeçalho da requisição:

```http
Authorization: Bearer SEU_TOKEN
```

---

# 🗄️ Banco de Dados

O projeto utiliza **MySQL** como banco de dados relacional.

### Principais entidades

- Usuários
- Categorias
- Produtos
- Imagens dos Produtos
- Opções dos Produtos

---

#  Objetivos do Projeto

Este projeto foi desenvolvido para consolidar conhecimentos em desenvolvimento Back-end adquiridos durante um curso de Desenvolvimento Full Stack.

Os principais conceitos trabalhados foram:

- Desenvolvimento de APIs REST
- Arquitetura MVC
- Node.js
- Express.js
- Sequelize ORM
- Banco de dados MySQL
- Autenticação JWT
- Relacionamentos entre tabelas
- Organização e modularização de código
- Versionamento com Git e GitHub

---

#  Aprendizados

Durante o desenvolvimento deste projeto foram aprimoradas habilidades relacionadas a:

- Desenvolvimento Back-end
- Criação de APIs REST
- Estruturação de aplicações Node.js
- Arquitetura MVC
- Modelagem de banco de dados
- Sequelize ORM
- Autenticação com JWT
- Criptografia de senhas utilizando bcrypt
- Tratamento de erros
- Trabalho colaborativo em equipe

---

# 👥 Equipe

- José Kawam Rodrigues da Silva
- Antônio Mathyas Santos da Silva
- Iarlei Ferreira de Barros
- Nirla Maria dos Santos

---

#  Observações

Este projeto foi desenvolvido exclusivamente para fins educacionais durante um **curso de Desenvolvimento Full Stack**.

Seu principal objetivo foi colocar em prática conceitos modernos de desenvolvimento Back-end por meio da construção de uma API REST para uma plataforma de e-commerce.

---

<div align="center">

###  Obrigado por visitar este repositório!

Se este projeto foi útil ou interessante para você, considere deixar uma estrela ⭐ no repositório.

</div>
