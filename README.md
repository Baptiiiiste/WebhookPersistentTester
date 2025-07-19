## Pré-requis

- Node.js (version 22.14.0 ou supérieure): [https://nodejs.org/fr](https://nodejs.org/fr) ou utiliser nvm
- pnpm (version 10.6.3 ou supérieure): `npm i pnpm`

## Mettre à jour les variables d'environnements

Créer un fichier d'environement .env à la racine du projet contenant:

```dotenv
# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=CLE_TRES_LONGUE_ET_COMPLEXE
```

## Lancer le projet

Installer les dépendances : `pnpm install`\
Lancer le serveur de développement : `pnpm dev`\
Accéder à l'application : [http://localhost:3000](http://localhost:3000)