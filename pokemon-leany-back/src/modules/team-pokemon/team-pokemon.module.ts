import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokeApiModule } from '../../api/poke-api/poke-api.module';
import { Team } from '../team/team.entity';
import { TeamPokemonController } from './team-pokemon.controller';
import { TeamPokemon } from './team-pokemon.entity';
import { TeamPokemonService } from './team-pokemon.service';

@Module({
  imports: [TypeOrmModule.forFeature([TeamPokemon, Team]), PokeApiModule],
  controllers: [TeamPokemonController],
  providers: [TeamPokemonService],
})
export class TeamPokemonModule {}
