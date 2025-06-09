import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TeamDto } from './dto/team.dto';
import { Team } from './team.entity';
import { TeamService } from './team.service';

@ApiTags('times')
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os times' })
  @ApiResponse({
    status: 200,
    description: 'Lista de times retornada',
    type: [Team],
  })
  findAll(): Promise<TeamDto[]> {
    return this.teamService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar time pelo ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do time' })
  @ApiResponse({ status: 200, description: 'Time encontrado', type: Team })
  @ApiResponse({ status: 404, description: 'Time não encontrado' })
  findById(@Param('id', ParseIntPipe) id: number): Promise<TeamDto> {
    return this.teamService.findById(id);
  }

  @Get('trainer/:id')
  @ApiOperation({ summary: 'Listar times pelo ID do treinador' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do treinador' })
  @ApiResponse({
    status: 200,
    description: 'Lista de times do treinador',
    type: [Team],
  })
  findAllByTrainer(
    @Param('id', ParseIntPipe) trainerId: number,
  ): Promise<TeamDto[]> {
    return this.teamService.findByTrainerId(trainerId);
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo time' })
  @ApiBody({ type: TeamDto, description: 'Dados do time a ser criado' })
  @ApiResponse({
    status: 201,
    description: 'Time criado com sucesso',
    type: Team,
  })
  create(@Body() payload: TeamDto) {
    return this.teamService.create(payload);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um time existente' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do time' })
  @ApiBody({
    type: TeamDto,
    description: 'Campos para atualização',
    required: false,
  })
  @ApiResponse({ status: 200, description: 'Time atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Time não encontrado' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: Partial<TeamDto>,
  ) {
    return this.teamService.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um time' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do time' })
  @ApiResponse({ status: 204, description: 'Time deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Time não encontrado' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.teamService.delete(id);
  }
}
