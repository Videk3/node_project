import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import process from 'process';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LunchController } from './lunch/lunch.controller';
import { LunchService } from './lunch/lunch.service';
import { UserModule } from './user/user.module';
import { LunchModule } from './lunch/lunch.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      entities: [],
      synchronize: true,
    }),
    LunchModule,
    UserModule,
  ],
  controllers: [AppController, LunchController],
  providers: [AppService, LunchService],
})
export class AppModule {}
