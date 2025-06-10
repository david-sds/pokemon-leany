import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { PokeApiModule } from './api/poke-api/poke-api.module';
import { AuthModule } from './modules/auth/auth.module';
import { TeamPokemonModule } from './modules/team-pokemon/team-pokemon.module';
import { TeamModule } from './modules/team/team.module';
import { TrainerModule } from './modules/trainer/trainer.module';
import { AuthGuard } from './utils/guards/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TrainerModule,
    TeamModule,
    TeamPokemonModule,
    PokeApiModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
