import { NestFactory } from '@nestjs/core';

import setupSwagger from '@/swagger';
import { AppModule } from '@App/app.module';

(async () => {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  await app.listen(process.env.PORT || 3333);
})();
