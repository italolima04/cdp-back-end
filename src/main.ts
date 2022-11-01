import { HttpAdapterHost, NestFactory } from '@nestjs/core';

import setupSwagger from '@/swagger';
import { AppModule } from '@App/app.module';
import ExceptionFilter from '@Erros/exceptions.filter';

(async () => {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ExceptionFilter(httpAdapter));

  await app.listen(process.env.PORT || 3333);
})();
