import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Env Manager API')
    .setDescription(
      [
        'Ortam degiskeni yonetimi backend API.',
        '',
        '- **Auth**: Kayit ve giris; basarili cevapta `accessToken` (JWT) doner.',
        '- **Projects**: Ornek CRUD akisi; ileride korunan rotalar icin **Authorize** ile JWT kullanilabilir.',
        '',
        'Timestamps: ISO 8601 onerilir.',
      ].join('\n'),
    )
    .setVersion('1.0.0')
    .addServer('http://localhost:3000', 'Yerel gelistirme')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description:
          'Login veya register yanitindaki `accessToken`. Swagger\'da ustten Authorize → `Bearer <token>` veya sadece token yapistir.',
      },
      'JWT-auth',
    )
    .addTag('App', 'Saglik / kok endpoint')
    .addTag('Auth', 'Kayit, giris, JWT')
    .addTag('Projects', 'Proje listeleme ve olusturma')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig, {
    operationIdFactory: (controllerKey: string, methodKey: string) =>
      methodKey,
  });
  SwaggerModule.setup('docs', app, swaggerDocument, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
    customSiteTitle: 'Env Manager API Docs',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
