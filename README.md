# Echo

Get feedback from your users with Echo, a simple and elegant feedback tool.
Side project that could be a SaaS in the future.

## Installation

- Node.js (version 22.14.0 or +): [https://nodejs.org/fr](https://nodejs.org/fr) or use nvm
- pnpm (or +): `npm i pnpm`

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

Install dependencies : `pnpm install`\
Start database : `docker-compose up -d`\
Start development server : `pnpm dev`\
Use it : [http://localhost:3000](http://localhost:3000)