# CICD

##  CodeQL

Added an automatic pipeline for CodeQL analysis on every push and merge-request to any branch.

## Dev
[Pipeline for dev (.github/workflows/dev.yml)](./.github/workflows/dev.yml)

On merge-request or push to `dev` and `main` branch:
- Build the application
- Run tests on the most important features [See tests (tests)](./tests)
- Run code quality checks on a private sonarqube server
- Build image using the Dockerfile and push Docker image to registry
- Deploy to staging environment on private server

Test account for sonarqube:
- link: https://sonarqube.baptiiiste.com/dashboard?id=WPT&codeScope=overall
- user: user
- password: MySuperUser1234@

Docker compose on my server:
```yml
version: '3.8'
services:
  wpt-dev_postgres:
    image: postgres:16
    container_name: wpt-dev_postgres
    restart: always
    environment:
      POSTGRES_USER: $POSTGRES_USER
      POSTGRES_PASSWORD: $POSTGRES_PASSWORD
      POSTGRES_DB: $POSTGRES_DB
    volumes:
      - wpt-dev_data:/var/lib/postgresql/data
    networks:
      - web
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U $POSTGRES_USER -d $POSTGRES_DB"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s
      
  wpt-dev_website:
    image: ghcr.io/baptiiiiste/webhookpersistenttester:dev-latest
    container_name: wpt-dev_website
    restart: always
    environment:
      NODE_ENV: production
      NEXTAUTH_URL: https://wpt-dev.baptiiiste.com
      API_URL: https://wpt-dev.baptiiiste.com/api
      NEXTAUTH_SECRET: $NEXTAUTH_SECRET
      SALT_ROUNDS: "10"
      AUTH_TRUST_HOST: "true"
      GOOGLE_CLIENT_ID: $GOOGLE_CLIENT_ID
      GOOGLE_CLIENT_SECRET: $GOOGLE_CLIENT_SECRET
      DATABASE_URL: postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@wpt-dev_postgres:5432/$POSTGRES_db
    networks:
      - web
    depends_on:
      wpt-dev_postgres:
        condition: service_healthy
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.wpt-dev-ws.rule=Host(`wpt-dev.baptiiiste.com`)"
      - "traefik.http.routers.wpt-dev-ws.entrypoints=websecure"
      - "traefik.http.routers.wpt-dev-ws.tls.certresolver=letsencrypt"
      - "traefik.http.services.wpt-dev-ws.loadbalancer.server.port=3000"
      
  adminer:
    image: adminer
    container_name: wpt-dev_adminer
    restart: always
    depends_on:
      - wpt-dev_postgres
    networks:
      - web
    environment:
      ADMINER_DEFAULT_SERVER: wpt-dev_postgres
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.wpt-dev-adminer.rule=Host(`adminer-wpt-dev.baptiiiste.com`)"
      - "traefik.http.routers.wpt-dev-adminer.entrypoints=websecure"
      - "traefik.http.routers.wpt-dev-adminer.tls.certresolver=letsencrypt"
      - "traefik.http.services.wpt-dev-adminer.loadbalancer.server.port=8080"
      
networks:
  web:
    external: true
volumes:
  wpt-dev_data:
```

What is deployed here on my server:
- PostgreSQL database container
- Next.js application container
- Adminer container for database management

Access the application here:
- link: https://wpt-dev.baptiiiste.com
- user: test@test.com
- password: Test@1234

## Prod
[Pipeline for prod (.github/workflows/prod.yml)](./.github/workflows/prod.yml)

On create tag `v*.*.*`:
- Build the application
- Run tests on the most important features [See tests (./tests)](tests)
- Build image using the Dockerfile and push Docker image to registry
- Deploy to production environment on private server

Docker compose on my server:
```yml
version: '3.8'
services:
  wpt_postgres:
    image: postgres:16
    container_name: wpt_postgres
    restart: always
    environment:
      POSTGRES_USER: $POSTGRES_USER
      POSTGRES_PASSWORD: $POSTGRES_PASSWORD
      POSTGRES_DB: $POSTGRES_DB
    volumes:
      - wpt_data:/var/lib/postgresql/data
    networks:
      - web
    ports:
      - "5433:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U $POSTGRES_USER -d $POSTGRES_DB"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s

  wpt_website:
    image: ghcr.io/baptiiiiste/webhookpersistenttester:latest
    container_name: wpt_website
    restart: always
    environment:
      NODE_ENV: production
      NEXTAUTH_URL: https://wpt.baptiiiste.com
      API_URL: https://wpt.baptiiiste.com/api
      NEXTAUTH_SECRET: $NEXTAUTH_SECRET
      SALT_ROUNDS: "10"
      AUTH_TRUST_HOST: "true"
      GOOGLE_CLIENT_ID: $GOOGLE_CLIENT_ID
      GOOGLE_CLIENT_SECRET: $GOOGLE_CLIENT_SECRET
      DATABASE_URL: postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@wpt_postgres:5432/$POSTGRES_db
    networks:
      - web
    ports:
      - "3001:3000"
    depends_on:
      wpt_postgres:
        condition: service_healthy
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.wpt-ws.rule=Host(`wpt.baptiiiste.com`)"
      - "traefik.http.routers.wpt-ws.entrypoints=websecure"
      - "traefik.http.routers.wpt-ws.tls.certresolver=letsencrypt"
      - "traefik.http.services.wpt-ws.loadbalancer.server.port=3000"

networks:
  web:
    external: true
volumes:
  wpt_data:
```

What is deployed here on my server:
- PostgreSQL database container
- Next.js application container

Access the application here:
- link: https://wpt.baptiiiste.com
- create your own account to test, with not sensitive information

## Deployment on Private Server

- Setup Github runners on private server
- Created a `docker-compose.yml` file for each environment (staging and production)
- Used the runner to pull the latest Docker image and restart the container

Server architecture:
- Ubuntu server
- Portainer for container management
- Traefik as reverse proxy (application are using the `web` network that is linked to my domain)
- Docker and Docker Compose for containerization
- Let's Encrypt for SSL certificates


