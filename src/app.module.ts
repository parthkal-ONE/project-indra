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
