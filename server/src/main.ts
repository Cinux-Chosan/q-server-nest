import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import './lib/args'



async function bootstrap() {
  const args = global.argv
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(args.port);
}
bootstrap();
