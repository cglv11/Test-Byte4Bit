import { Client } from 'pg';
import { config } from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables from .env file
config();

console.log({
  host: process.env.DATABASE_HOST,
  port: 5432,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
});

async function databaseExists(
  client: Client,
  dbName: string,
): Promise<boolean> {
  const result = await client.query(
    'SELECT 1 FROM pg_database WHERE datname=$1',
    [dbName],
  );
  return result.rowCount > 0;
}

async function createDatabase() {
  const client = new Client({
    host: process.env.DATABASE_HOST,
    port: 5432,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  });

  await client.connect();
  const dbName = process.env.DATABASE_DATABASE;

  if (!(await databaseExists(client, dbName))) {
    await client.query(`CREATE DATABASE "${dbName}"`);
    console.log(`Database ${dbName} created.`);
  } else {
    console.log(`Database ${dbName} already exists.`);
  }

  await client.end();
}

async function seedDatabase() {
  const client = new Client({
    host: process.env.DATABASE_HOST,
    port: 5432,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
  });
  await client.connect();

  const seedFile = path.join(
    __dirname,
    '..',
    'src',
    'modules',
    'database',
    'seeds',
    'initial-data.sql',
  );
  const seedSql = fs.readFileSync(seedFile, { encoding: 'utf-8' });

  await client.query(seedSql);
  await client.end();
}

async function main() {
  try {
    await createDatabase();
    await seedDatabase();
    console.log('Database seeded with initial data.');
  } catch (error) {
    console.error('An error occurred:', error);
    process.exit(1);
  }
}

main();
