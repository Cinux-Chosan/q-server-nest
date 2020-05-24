import './lib/args';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './guards/auth.guard';
import session from 'express-session';

const random = Math.random();
async function bootstrap() {
  const args = global.argv;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(session({ secret: random.toString() }));
  app.useGlobalGuards(new AuthGuard());
  await app.listen(args.port);
}
bootstrap();
