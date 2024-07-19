import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvModule } from './env/env.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { z_env } from './env/env.z';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvService } from './env/env.service';
import { DataSource } from 'typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => z_env.parse(env),
      isGlobal: true,
    }),
    EnvModule,
    TypeOrmModule.forRoot(
      new EnvService(new ConfigService()).getTypeOrmConfig(),
    ),
    // TypeOrmModule.forRootAsync({
    //   imports: [EnvModule],
    //   useFactory: (envService: EnvService) => ({
    //     type: 'postgres',
    //     host: envService.get('POSTGRES_HOST'),
    //     port: envService.get('POSTGRES_PORT'),
    //     username: envService.get('POSTGRES_USER'),
    //     database: envService.get('POSTGRES_DB'),
    //     password: envService.get('POSTGRES_PASSWORD'),
    //     entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    //     synchronize: envService.get('NODE_ENV') === 'dev',
    //     migrations: [__dirname + '/migrations/*{.ts,.js}'],

    //   }),
    //   inject: [EnvService],
    // }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {
    console.log(dataSource.driver.database);
  }
}
