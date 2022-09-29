import { registerAs, ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotEnv from 'dotenv';
import { User } from 'src/entities/user.entity';
dotEnv.config();

export default registerAs('typeorm.config', (): TypeOrmModuleOptions => {
  const config: TypeOrmModuleOptions = {
    type: 'mysql',
    host: <string>process.env.HOST,
    port: Number(process.env.PORT),
    username: <string>process.env.USER_NAME,
    password: <string>process.env.PASSWORD,
    database: <string>process.env.DB_NAME,
    entities: [__dirname + '/**/*.entity{.ts,.js}', User],
    autoLoadEntities: true,
    synchronize: true,
    keepConnectionAlive: true,
    logging: false,
  };
  return config;
});
