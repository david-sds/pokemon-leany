import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/utils/decorators/public.decorators';
import { PaginateOutput } from 'src/utils/pagination/pagination.utils';
import { QueryPaginationDto } from 'src/utils/pagination/query-pagination.dto';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { TrainerDto } from './dto/trainer.dto';
import { TrainerService } from './trainer.service';

@ApiTags('trainer')
@Controller('trainer')
export class TrainerController {
  constructor(private readonly trainerService: TrainerService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todos os treinadores' })
  @ApiResponse({
    status: 200,
    description: 'Lista de treinadores retornada com sucesso.',
  })
  findAll(
    @Query() query: QueryPaginationDto,
  ): Promise<PaginateOutput<TrainerDto>> {
    return this.trainerService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca treinador por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do treinador' })
  @ApiResponse({ status: 200, description: 'Treinador encontrado.' })
  @ApiResponse({ status: 404, description: 'Treinador não encontrado.' })
  findById(@Param('id', ParseIntPipe) id: number): Promise<TrainerDto> {
    return this.trainerService.findById(id);
  }

  @Public()
  @Post()
  @ApiOperation({ summary: 'Cria um novo treinador' })
  @ApiBody({ type: CreateTrainerDto })
  @ApiResponse({ status: 201, description: 'Treinador criado com sucesso.' })
  create(@Body() payload: CreateTrainerDto) {
    return this.trainerService.create(payload);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza dados do treinador' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do treinador' })
  @ApiBody({
    type: TrainerDto,
    description: 'Campos para atualização (parciais permitidas)',
  })
  @ApiResponse({
    status: 200,
    description: 'Treinador atualizado com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Treinador não encontrado.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: Partial<TrainerDto>,
  ) {
    return this.trainerService.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um treinador pelo ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do treinador' })
  @ApiResponse({ status: 200, description: 'Treinador removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Treinador não encontrado.' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.trainerService.delete(id);
  }
}
