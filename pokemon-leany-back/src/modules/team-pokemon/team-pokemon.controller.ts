import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EnrichedPokemonDto } from './dto/enriched-pokemon.dto';
import { PokemonDto } from './dto/pokemon.dto';
import { TeamPokemonService } from './team-pokemon.service';

@ApiTags('team-pokemon')
@Controller('team-pokemon')
export class TeamPokemonController {
  constructor(private readonly teamPokemonService: TeamPokemonService) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Listar todos os Pokémon de um time pelo ID do time',
  })
  @ApiParam({ name: 'id', type: Number, description: 'ID do time' })
  @ApiResponse({ status: 200, description: 'Lista de Pokémon retornada' })
  @ApiResponse({ status: 404, description: 'Time não encontrado' })
  async findAll(
    @Param('id', ParseIntPipe) teamId: number,
  ): Promise<EnrichedPokemonDto[]> {
    return await this.teamPokemonService.findEnrichedById(teamId);
  }

  @Patch('add/:id')
  @ApiOperation({ summary: 'Adicionar um Pokémon ao time' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do time' })
  @ApiBody({
    type: PokemonDto,
    description: 'Dados do Pokémon para adicionar',
  })
  @ApiResponse({
    status: 200,
    description: 'Pokémon adicionado ao time com sucesso',
  })
  @ApiResponse({
    status: 400,
    description:
      'Erro na adição do Pokémon (ex: time cheio ou Pokémon já existente)',
  })
  @ApiResponse({ status: 404, description: 'Time ou Pokémon não encontrado' })
  async addPokemonToTeam(
    @Param('id', ParseIntPipe) teamId: number,
    @Body() payload: PokemonDto,
  ) {
    await this.teamPokemonService.addPokemonToTeam(teamId, payload);
  }

  @Patch('remove/:id')
  @ApiOperation({ summary: 'Remover um Pokémon do time' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do time' })
  @ApiBody({
    type: PokemonDto,
    description: 'Dados do Pokémon para remover',
  })
  @ApiResponse({
    status: 200,
    description: 'Pokémon removido do time com sucesso',
  })
  @ApiResponse({
    status: 400,
    description:
      'Erro na remoção do Pokémon (ex: time vazio ou Pokémon não está no time)',
  })
  @ApiResponse({ status: 404, description: 'Time ou Pokémon não encontrado' })
  async removePokemonFromTeam(
    @Param('id', ParseIntPipe) teamId: number,
    @Body() payload: PokemonDto,
  ) {
    await this.teamPokemonService.removePokemonFromTeam(teamId, payload);
  }
}
