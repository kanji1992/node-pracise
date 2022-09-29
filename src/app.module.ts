import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from './middleware/auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeormConfig from 'config/typeorm.config';
import { UserModule } from './features/users/user.module';
import { RandomJokeModule } from './features/randomJoke/randomJoke.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: typeormConfig,
    }),
    UserModule,
    RandomJokeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthMiddleware)
      .exclude(`api/users/signup`, `api/users/login`, `api/random-joke`)
      .forRoutes('*');
  }
}
