import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { setupSwagger } from './common/config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security measures
  app.use(helmet()); // Adds various HTTP headers for security
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // Trust proxy
  app.getHttpAdapter().getInstance().set('trust proxy', 1);

  // Set global prefix first
  app.setGlobalPrefix('api');

  // Enable versioning after prefix
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that don't have decorators
      forbidNonWhitelisted: true, // Throw errors if non-whitelisted properties are present
      transform: true, // Transform payloads to DTO instances
    }),
  );

  // Global interceptor
  app.useGlobalInterceptors(new TransformInterceptor());

  // Setup Swagger
  setupSwagger(app);

  const port = process.env.PORT;
  await app.listen(port);
  console.log(`Streeters Casino API is running on: ${process.env.BASE_URL}`);
  console.log(
    `Swagger documentation is available at: ${process.env.BASE_URL}/api/docs`,
  );
}
bootstrap();
