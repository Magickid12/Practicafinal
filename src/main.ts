import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // *** AÑADE ESTO ***
  app.enableCors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:3001'], // O '*' para permitir todos los orígenes (menos seguro)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Opcional: Especifica los métodos permitidos
    allowedHeaders: ['Content-Type'], // Opcional: Especifica las cabeceras permitidas
  });
  // *** FIN DE LO QUE AÑADISTE ***

  await app.listen(3000);
  console.log(`App running at http://localhost:3000`);
}
bootstrap();