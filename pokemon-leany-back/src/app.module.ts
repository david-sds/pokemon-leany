import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '@nestjs/config';
import { TrainerModule } from './modules/trainer/trainer.module';
import { TeamModule } from './modules/team/team.module';
import { TeamPokemonModule } from './modules/team-pokemon/team-pokemon.module';
import { PokeApiModule } from './api/poke-api/poke-api.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
