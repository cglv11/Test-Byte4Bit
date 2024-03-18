import { config } from 'dotenv';
config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import passport from 'passport';
import { ValidationPipe } from '@nestjs/common';
import serverlessExpress from '@codegenie/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';

let server: Handler;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(passport.initialize());
  app.useGlobalPipes(new ValidationPipe());
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};