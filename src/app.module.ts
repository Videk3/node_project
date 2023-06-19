import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { LunchModule } from './lunch/lunch.module';
import { VoteModule } from './vote/vote.module';
import { DatabaseModule } from './database/database.module';
import { configValidationSchema } from './config/schema.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env`],
      validationSchema: configValidationSchema,
    }),
    DatabaseModule,
    LunchModule,
    UserModule,
    VoteModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
