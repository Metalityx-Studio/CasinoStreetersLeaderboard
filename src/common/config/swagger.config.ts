import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { AuthModule } from '../../auth/auth.module';
import { AppModule } from '../../app.module';

export function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Streeters Casino API')
    .setDescription('The Streeters Casino API documentation')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addServer('http://localhost:3000', 'Local Development')
    .addServer('https://api.streeters-casino.com', 'Production')
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    include: [
      AppModule, // Include app endpoints
      AuthModule, // Include auth endpoints
    ],
  });

  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      showRequestDuration: true,
    },
  });
}
