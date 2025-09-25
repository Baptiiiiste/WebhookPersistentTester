# WebhookPersistentTester

![License](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey)

A fullstack platform to test and replay your webhooks easily with a persistent endpoint\
Side project that could be a SaaS in the future.

## Installation

- Node.js (version 22.14.0 or +): [https://nodejs.org/fr](https://nodejs.org/fr) or use nvm
- pnpm: `npm i pnpm`

## Configuration

Create a .env file at the root of the project containing:

```dotenv
# ENVIRONMENT
NODE_ENV=development

# AUTHENTICATION (Credentials)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=YOUR_NEXTAUTH_SECRET
SALT_ROUNDS=10

# AUTHENTICATION (Google)
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET

# DATABASE (PostgreSQL)
DATABASE_URL=postgresql://user:password@localhost:5432/db

```

## Usage

Install dependencies: `pnpm install`\
Start database: `docker-compose up -d`\
Generate prisma client: `prisma db generate`\
Update the models: `prisma db push`\
Import data (*Optional*): `pnpm run prisma:seed`\
Start development server: `pnpm dev`\
Use it: [http://localhost:3000](http://localhost:3000)

## Contribution

See the [CONTRIBUTING](./CONTRIBUTING.md) file for details.\
See the [TODO](./TODO.md) list for details.

## License

This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)**.  
See the [LICENSE](./LICENSE) file for details.


