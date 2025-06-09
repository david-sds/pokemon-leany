Bem-vindo(a) ao desafio técnico para a vaga de Desenvolvedor Backend Júnior na Leany!
O objetivo deste case é avaliar suas habilidades fundamentais na criação de uma API utilizando Nest.JS, com foco em boas práticas de desenvolvimento, arquitetura em camadas e integração com APIs externas como a PokéAPI.

Tecnologia Principal:
Framework: Nest.JS (obrigatório)
API Externa: PokéAPI (https://pokeapi.co/)

Desafio Proposto:
Você deverá desenvolver uma API RESTful para gerenciar Times de Pokémon criados por Treinadores. Os dados dos Pokémon em si (nome, tipo, habilidades, etc.) deverão ser consultados na PokéAPI, mas os dados dos Treinadores e seus Times serão persistidos localmente.

Entidades Principais (a serem persistidas no seu banco):

Treinador (Trainer):
  Atributos: id (gerado automaticamente), nome (string), cidadeOrigem (string, opcional).
  Deve ter um CRUD completo.

Time (Team):
  Atributos: id (gerado automaticamente), nomeDoTime (string), treinadorId (referência ao Treinador dono do time).
  Um Treinador pode ter vários Times, mas um Time pertence a apenas um Treinador (relação 1xN).
  Deve ter um CRUD completo (associado a um Treinador).

Pokémon do Time (TeamPokemon):
  Esta entidade representa a referência a um Pokémon da PokéAPI que faz parte de um Time.

  Atributos: id (gerado automaticamente), timeId (referência ao Time), pokemonIdOuNome (string ou número, o identificador do Pokémon na PokéAPI - ex: "pikachu" ou 25).
  Um Time pode ter vários Pokémon (até um limite, ex: 6). Um Pokémon (da PokéAPI) pode, conceitualmente, estar em vários times diferentes de diferentes treinadores. Esta é a base para a relação NxN entre Time e (o conceito de) Pokemon da PokéAPI, gerenciada pela sua aplicação.

  Operações:
  Adicionar um Pokémon a um Time (dado o pokemonIdOuNome).
  Remover um Pokémon de um Time.
  Listar os Pokémon de um Time (ao listar, idealmente você buscaria os detalhes de cada Pokémon na PokéAPI para enriquecer a resposta).

Requisitos Funcionais e de Arquitetura:
  CRUD para Treinadores e Times:
  Implementar operações de Criar, Ler (um e todos), Atualizar e Deletar para Treinadores.
  Implementar operações de Criar, Ler (um e todos por treinador), Atualizar e Deletar para Times, sempre no contexto de um Treinador.
  Gerenciamento de Pokémon em Times:
  Endpoint para adicionar um Pokémon a um time específico (ex: POST /teams/{teamId}/pokemons). O payload deve conter o pokemonIdOuNome.

  Validação: Antes de adicionar, o serviço deve consultar a PokéAPI para verificar se o Pokémon com o pokemonIdOuNome fornecido realmente existe. Se não existir, retornar um erro apropriado.
  Endpoint para remover um Pokémon de um time específico.
  Endpoint para listar os Pokémon de um time específico (ex: GET /teams/{teamId}/pokemons).
  Enriquecimento de Dados: A resposta deste endpoint deve, para cada Pokémon no time, incluir alguns detalhes básicos obtidos da PokéAPI (ex: nome, tipos, sprite/imagem). Crie um DTO de resposta para isso.

  Relações Entre Entidades (Persistidas):
  1xN: Um Treinador pode ter vários Times.
  NxN (implícita com dados externos): Um Time pode conter referências a vários Pokémon (da PokéAPI), e um mesmo Pokémon (da PokéAPI) pode estar em vários Times. Sua entidade TeamPokemon (ou similar) fará a ponte.

  Mapeamento e Isolamento de Entidades e DTOs:
  Utilize Data Transfer Objects (DTOs) para todas as entradas e saídas da API.
  As entidades do banco de dados não devem ser expostas diretamente.

  Arquitetura em Camadas (Padrão Nest.JS):
  Controllers: Receber requisições, validar DTOs de entrada (usando ValidationPipe e class-validator), chamar serviços.

  Services (Serviços): Contêm a lógica de negócio, incluindo a lógica para interagir com a PokéAPI (crie um serviço específico para isso, ex: PokeApiService).
  Repositories (Repositórios): Comunicação com o banco de dados (usando TypeORM, por exemplo).

  Banco de Dados com Docker:
  Configurar um banco de dados relacional (PostgreSQL ou MySQL) rodando em Docker.
  Sua aplicação Nest.JS deve conectar-se a este banco.
  Incluir docker-compose.yml ou instruções claras no README.

  Validação de DTOs:
  Validar todas as entradas de DTOs usando class-validator e class-transformer.

  Documentação da API:
  Utilizar Swagger (OpenAPI) para documentar todos os endpoints.

  README.md:
  Claro e completo, com instruções de setup, execução e acesso à documentação.
  Comentários sobre decisões de projeto, como você estruturou a interação com a PokéAPI, etc.
  O que NÃO é o foco principal para este desafio JÚNIOR (embora bônus sejam bem-vindos):
  Autenticação e autorização complexas (JWT, roles).
  Paginação e filtros avançados nas listagens (uma listagem simples é suficiente).
  Testes unitários ou e2e (serão um grande diferencial se presentes, mas o foco é a funcionalidade principal).
  Gerenciamento de estado complexo ou caching para as chamadas à PokéAPI.

  Entregáveis:
  Link para o repositório Git.
  README.md na raiz.

  Critérios de Avaliação:
  Funcionalidade: API implementa os requisitos de CRUD, gerenciamento de Pokémon nos times e interação com a PokéAPI?
  Qualidade do Código: Legibilidade, organização, boas práticas de Nest.JS/TypeScript.

  Arquitetura: Aplicação correta das camadas, separação de responsabilidades, criação de um serviço para a PokéAPI.
  Mapeamento Entidade/DTO: Uso correto de DTOs.

  Validação: Implementação de validações.

  Relações: Correta modelagem e implementação da relação 1xN (Treinador-Time) e da lógica para gerenciar os Pokémon nos times (referenciando a PokéAPI).
  Banco de Dados & Docker: Configuração e uso.

  Documentação: Qualidade do README e Swagger.
  Interação com API Externa: Capacidade de consumir e utilizar dados da PokéAPI de forma eficaz.