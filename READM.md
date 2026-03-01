## 📝 Blog Engine - Projeto Acadêmico Node.js

Este projeto é um sistema de gerenciamento de blog funcional, desenvolvido para fins educativos, demonstrando as capacidades de uma arquitetura CRUD (Create, Read, Update, Delete) utilizando o ambiente Node.js e o framework Express.

## 🚀 Funcionalidades

 - Vitrine Pública: Área de leitura onde os visitantes podem visualizar todos os posts ou filtrá-los por categoria.

 - Filtro por Categoria: Sistema de navegação dinâmica via Query Strings que agrupa posts por tags.

 - Painel Administrativo: Área restrita para gestão de conteúdo com interface de tabela e modais.

 - CRUD Completo: Criação, edição e exclusão de postagens com persistência em memória.

 - Segurança: Proteção de rotas administrativas via Middleware de Autenticação Básica.

 - Tratamento de Erros: Página personalizada de Erro 404 para rotas inexistentes.

## 🛠️ Tecnologias Utilizadas

 - Node.js & Express: Núcleo do servidor e gerenciamento de rotas.

 - EJS (Embedded JavaScript Templates): Motor de visualização para renderização dinâmica de HTML.

 - Bootstrap 5: Framework de CSS para design responsivo e componentes de interface (modais, tabelas).

 - Method-Override: Middleware para suportar verbos HTTP como PUT e DELETE em formulários HTML.

 - Morgan: Logger para monitoramento de requisições no console.

## 📦 Como Instalar e Rodar

1. Clone o repositório ou baixe os arquivos.

2. Instale as dependências via terminal:
´´´
npm install
´´´
Inicie o servidor:
´´´
node index.js
´´´
Acesse no navegador:

 - Vitrine: http://localhost:3000

 - Admin: http://localhost:3000/admin (Usuário: admin | Senha: 1234)

## 📖 Estrutura do Código

 - index.js: Ponto de entrada da aplicação, contendo a lógica das rotas e middlewares.

 - views/: Contém os arquivos de template EJS (Blog, Admin, Post, 404) e parciais (Header, Footer).

 - utils/: Funções auxiliares para formatação de datas e tratamento de parágrafos de texto.

 - Parabéns pela conclusão deste projeto! Você agora tem uma base sólida de como funciona o fluxo de dados em uma aplicação web moderna.
