import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule,DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  if(process.env.NODE_ENV=="development"){
    const documentConfig= new DocumentBuilder()
    .setTitle('Video Streaming and encoding(VSE)')
    .setDescription('VSE the streaming via HTTP REST API')
    .setVersion('1.0')
    .build();

    const documentFactory=()=>SwaggerModule.createDocument(app,documentConfig);
    SwaggerModule.setup("swaggerapi",app,documentFactory);

  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
