"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Env Manager API')
        .setDescription([
        'Ortam degiskeni yonetimi backend API.',
        '',
        '- **Auth**: Kayit ve giris; basarili cevapta `accessToken` (JWT) doner.',
        '- **Projects**: Ornek CRUD akisi; ileride korunan rotalar icin **Authorize** ile JWT kullanilabilir.',
        '',
        'Timestamps: ISO 8601 onerilir.',
    ].join('\n'))
        .setVersion('1.0.0')
        .addServer('http://localhost:3000', 'Yerel gelistirme')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Login veya register yanitindaki `accessToken`. Swagger\'da ustten Authorize → `Bearer <token>` veya sadece token yapistir.',
    }, 'JWT-auth')
        .addTag('App', 'Saglik / kok endpoint')
        .addTag('Auth', 'Kayit, giris, JWT')
        .addTag('Projects', 'Proje listeleme ve olusturma')
        .build();
    const swaggerDocument = swagger_1.SwaggerModule.createDocument(app, swaggerConfig, {
        operationIdFactory: (controllerKey, methodKey) => methodKey,
    });
    swagger_1.SwaggerModule.setup('docs', app, swaggerDocument, {
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
//# sourceMappingURL=main.js.map