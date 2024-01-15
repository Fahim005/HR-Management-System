import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cors = require('cors');
  //const app = await NestFactory.create<NestExpressApplication>(AppModule,{cors: true,});
  // app.enableCors({
  //   origin: 'http://localhost:3000', // or specify your frontend URL
  //   credentials: true,
  // });
  const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
  }
  app.use(cookieParser());
  //app.useGlobalPipes(new ValidationPipe());
  // app.enableCors();
  app.use(cors(corsOptions));
  await app.listen(3001);
}
bootstrap();
