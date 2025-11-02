🎮 Resumo: Orientação Geral do Trabalho Prático 2 - Aplicação Web

Este é um projeto em grupo para desenvolver uma aplicação web interativa, usando intensamente JavaScript, com o desafio de ir além do conteúdo visto em sala de aula.
O foco é criar um sistema onde o usuário final possa gerar e gerenciar seu próprio conteúdo.

🎯 Tema Escolhido: Gerenciador de Jogos

O site será um sistema que permite ao usuário listar, categorizar e filtrar jogos que ele deseja jogar, já jogou ou está jogando.

O usuário poderá:

Adicionar novos jogos à sua lista.

Editar ou remover jogos existentes.

Criar categorias personalizadas, com nome e cor.

Filtrar os jogos por categoria (exemplo: ação, terror, aventura, RPG, etc.).

Visualizar uma organização clara, funcional e interativa das informações.

💾 Requisitos Obrigatórios Fundamentais

Persistência de Dados: Todos os dados (lista de jogos e categorias) devem ser salvos localmente usando WebStorage (localStorage).

Extrapolação: O trabalho será avaliado pela criatividade e pela implementação de recursos extras além do que foi visto em sala.

✅ Critérios de Avaliação (Funcionalidades Obrigatórias – 2 pontos)

Criação de Conteúdo: O usuário deve poder criar, editar e excluir jogos, com manipulação do DOM. (0,5 ponto)

Armazenamento Local: Uso do WebStorage para guardar informações da aplicação. (0,5 ponto)

Layout e Design: O site deve ser visualmente moderno, organizado e consistente entre as páginas. (0,5 ponto)

Janela Modal: Incluir uma janela modal com informações sobre o projeto e os autores. (0,5 ponto)

✨ Itens Opcionais (Bônus – até 8 pontos)

Uso de Flexbox e Grid para o layout.

Design responsivo com Media Queries, adaptando o site para celulares, tablets e computadores.

Inclusão de transições, animações e transformações sutis para deixar o site mais agradável.

Uso de frameworks CSS (como Bootstrap ou Materialize) e/ou bibliotecas JavaScript (como jQuery, Google Charts, React, Phaser, etc).

Implementar AJAX ou um Back-end com banco de dados, indo além do WebStorage (por exemplo, criando login real ou salvando dados no servidor).

🧑‍💻 Metodologia e Entrega

GitHub: Todos os integrantes devem usar o GitHub.
Cada um precisa fazer pelo menos 2 commits por semana, mostrando a participação no desenvolvimento.

Entrega: Apenas um integrante deve enviar no Moodle a URL do site hospedado no GitHub Pages, com as seguintes informações:

Título do grupo

URL do site

Nome dos integrantes

Itens opcionais implementados

Apresentação: O trabalho será apresentado em sala de aula e todos os membros devem participar.

Perde ponto: plágio, falta de itens obrigatórios, falta de originalidade, código mal organizado, CSS ou JS inline, e uso de tags antigas (como <center> ou <font>).

👥 Organização do Grupo

Todos os integrantes devem participar ativamente do JavaScript, mesmo tendo outras responsabilidades principais.

Caso o grupo tenha 3 integrantes:

Integrante 1 – Estrutura e Funcionalidades:
Responsável por criar o HTML principal (estrutura do site, cabeçalho, seções, botões e modal).
Também desenvolve funções em JavaScript para adicionar, remover e atualizar jogos (manipulação do DOM).

Integrante 2 – Estilo e Layout:
Responsável por todo o CSS, cuidando do design moderno, das cores e da responsividade (com Flexbox e Grid).
Também ajuda no JavaScript com funções visuais e interativas, como trocar cores de categoria e estilizar elementos dinamicamente.

Integrante 3 – Lógica e Armazenamento:
Responsável por organizar o JavaScript geral e integrar as funções do grupo.
Implementa o uso do WebStorage (localStorage) e os filtros por categoria.

Caso o grupo tenha 4 integrantes:

Integrante 1 – Estrutura HTML:
Cria as páginas e seções do site (lista de jogos, formulários e modal).
No JavaScript, trabalha na geração dinâmica do conteúdo na tela (exibição dos jogos e categorias).

Integrante 2 – Estilo e Responsividade:
Cuida do CSS, deixando o layout moderno e responsivo.
No JavaScript, implementa as interações visuais (abrir/fechar modal, trocar tema, efeitos visuais).

Integrante 3 – Armazenamento e Lógica:
Cria a parte de armazenamento dos dados com WebStorage.
Implementa o carregamento automático dos jogos salvos e a atualização do conteúdo.

Integrante 4 – Filtros e Funcionalidades Extras:
Desenvolve as funções de filtro e busca de jogos por categoria ou nome.
Implementa possíveis recursos adicionais, como ordenação de jogos, animações ou gráficos.

💡 Boas Práticas para o Grupo

Todos devem comentar o código e seguir o mesmo padrão de indentação.

As mensagens de commit no GitHub devem ser claras, por exemplo:
add função de salvar no localStorage ou ajuste de layout no CSS principal.

Cada integrante pode trabalhar em uma branch separada (ex: html-base, css-layout, js-filtros) para evitar erros.

No final, o grupo deve revisar o site junto, testar as funções e garantir que o design e o armazenamento estão funcionando corretamente.

A janela modal do site deve conter o nome dos autores e um breve resumo do projeto.
