import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { static as expressStatic } from 'express';

import setupSwagger from '@/swagger';
import { AppModule } from '@App/app.module';
import ExceptionFilter from '@Erros/exceptions.filter';
import uploadConfig from '@Config/upload.config';

(async () => {
  const app = (await NestFactory.create(AppModule)).setGlobalPrefix('api/v1');
  setupSwagger(app);
  app.enableCors();

  app.use('/files', expressStatic(uploadConfig.directory));

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ExceptionFilter(httpAdapter));

  await app.listen(4000);
})();
