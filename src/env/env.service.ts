import { Injectable } from '@nestjs/common';
import { Env } from './env.z';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class EnvService {
  constructor(private configService: ConfigService<Env, true>) {}
  get<T extends keyof Env>(key: T) {
    return this.configService.get(key, { infer: true });
  }

  getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.get('POSTGRES_HOST'),
      port: this.get('POSTGRES_PORT'),
      username: this.get('POSTGRES_USER'),
      password: this.get('POSTGRES_PASSWORD'),
      database: this.get('POSTGRES_DB'),
      // entities: ['**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: this.get('NODE_ENV') === 'dev',
      migrations: ['src/migrations/*{.ts,.js}'],
      ssl: this.get('NODE_ENV') === 'prod',
    };
  }
}
