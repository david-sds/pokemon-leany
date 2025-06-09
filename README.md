# Pokémon Leany Back

Backend do projeto Pokémon Leany, uma API em NestJS com MySQL, usando Docker para o banco de dados e npm para gerenciamento de dependências.

## 🔧 Requisitos

- Docker
- Docker Compose
- npm

📦 Clone o repositório e entre na pasta do backend:

```
git clone https://github.com/david-sds/pokemon-leany.git
cd pokemon-leany/pokemon-leany-back
```

🐳 Rodando com Docker

```
docker-compose up -d
```

## ⚙️ Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=root
DB_DATABASE=pokemon_leany_db
```

▶️ Rodando a API (modo dev)

```
npm install
npm run start:dev
```
