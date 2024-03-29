
# NestJS and GraphQL Test

This is a NestJS application configured with GitHub Actions for CI/CD, GraphQL for querying, Husky for pre-commit hooks, and set up for deployment on AWS Lambda.

## Features

- **GraphQL**: Implementing GraphQL for efficient and flexible querying.
- **Husky**: Using Husky for managing Git hooks.
- **Docker**: Containerization of NestJS app and PostgreSQL database.

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running with Docker

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

```bash
# To manually trigger Husky hooks
npm run lint
```

## Running with Docker

### Postgres Database

```bash
cd postgres-docker
docker-compose up -d
```
### Populate database

```bash
npm start-database
```

### NestJS App

```bash
cd ..
docker-compose up -d
```
Note: Remember to update the environment variables in the .env file. You can use the .env.example file as a template.

```bash
# Stop the NestJS app
docker-compose down

# Stop the Postgres database
cd postgres-docker
docker-compose down
cd ..
```

## Testing

```bash
# Stop the NestJS app
docker-compose down

# Stop the Postgres database
cd postgres-docker
docker-compose down
cd ..
```

## Build

```bash
npm run build
```

# View

After running you will have to enter to http://localhost:3000/transport-app and you will see the queries and mutations as shows below

![image](https://github.com/cglv11/Python-Byte4Bit/assets/20548770/bedbd9b3-4e8e-443d-9bc8-7f4820432bd9)
