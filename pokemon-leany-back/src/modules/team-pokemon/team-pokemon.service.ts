import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { PokeApiService } from '../../api/poke-api/poke-api.service';
import { Team } from '../team/team.entity';
import { EnrichedPokemonDto } from './dto/enriched-pokemon.dto';
import { PokemonDto } from './dto/pokemon.dto';
import { TeamPokemon } from './team-pokemon.entity';

@Injectable()
export class TeamPokemonService {
  constructor(
    @InjectRepository(TeamPokemon)
    private readonly teamPokemonRepository: Repository<TeamPokemon>,
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    private readonly pokeApiService: PokeApiService,
  ) {}

  async findById(teamId: number): Promise<PokemonDto[]> {
    const time = await this.teamRepository.findOneBy({ id: teamId });

    if (!time) {
      throw new NotFoundException('Team not found.');
    }

    const pokemonsTime = await this.teamPokemonRepository.find({
      where: { time: time },
    });

    return pokemonsTime.map((e) => plainToInstance(PokemonDto, e));
  }

  async findEnrichedById(teamId: number): Promise<EnrichedPokemonDto[]> {
    const pokemonsTime = await this.findById(teamId);
    const pokemonsPokeApiData = await Promise.all(
      pokemonsTime.map((e) => this.pokeApiService.getPokemon(e.nomePokemon)),
    );
    return pokemonsPokeApiData.map((e) =>
      plainToInstance(EnrichedPokemonDto, <EnrichedPokemonDto>{
        nome: e.name,
        species: e.species?.name,
        height: e.height,
        weight: e.weight,
        sprite: e.sprites?.front_default,
        cry: e.cries?.legacy,
      }),
    );
  }

  async addPokemonToTeam(teamId: number, payload: PokemonDto) {
    const time = await this.teamRepository.findOneBy({ id: teamId });

    if (!time) {
      throw new NotFoundException('Team not found.');
    }

    const pokemonsTeam = await this.findById(teamId);

    if (pokemonsTeam.length === 6) {
      throw new BadRequestException('Your team is full');
    }

    if (pokemonsTeam.some((e) => e.nomePokemon === payload.nomePokemon)) {
      throw new BadRequestException('This pokemon already is on the team.');
    }

    const pokemon = await this.pokeApiService.getPokemon(payload.nomePokemon);

    if (!pokemon) {
      throw new NotFoundException('Pokemon not found.');
    }

    const entity = this.teamPokemonRepository.create({
      time: time,
      nomePokemon: payload.nomePokemon,
    });

    const response = await this.teamPokemonRepository.save(entity);

    return response;
  }

  async removePokemonFromTeam(teamId: number, payload: PokemonDto) {
    const time = await this.teamRepository.findOneBy({ id: teamId });

    if (!time) {
      throw new NotFoundException('Team not found.');
    }

    const pokemonsTeam = await this.findById(teamId);

    if (pokemonsTeam.length === 0) {
      throw new BadRequestException('Your team is empty');
    }

    if (!pokemonsTeam.some((e) => e.nomePokemon === payload.nomePokemon)) {
      throw new BadRequestException('This pokemon is not on the team.');
    }

    const pokemon = await this.pokeApiService.getPokemon(payload.nomePokemon);

    if (!pokemon) {
      throw new NotFoundException('Pokemon not found.');
    }

    const pokemonTeam = pokemonsTeam.find(
      (e) => e.nomePokemon === payload.nomePokemon,
    );

    await this.teamPokemonRepository.delete(pokemonTeam);
  }
}
