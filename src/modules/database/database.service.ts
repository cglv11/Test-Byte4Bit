import { Injectable, OnModuleInit } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(private readonly entityManager: EntityManager) {}

  async onModuleInit(): Promise<void> {
    try {
      await this.seedDatabase();
    } catch (error) {
      console.error('Error during database seeding', error);
      throw error;
    }
  }

  private async seedDatabase(): Promise<void> {
    const filePath = path.join(__dirname, 'seeds', 'initial-data.sql');
    if (fs.existsSync(filePath)) {
      const sql = fs.readFileSync(filePath, 'utf-8');
      await this.entityManager.query(sql);
    } else {
      console.error(`The SQL file at ${filePath} does not exist.`);
    }
  }
}
