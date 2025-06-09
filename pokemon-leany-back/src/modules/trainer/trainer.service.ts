import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import {
  paginate,
  PaginateOutput,
  paginateOutput,
} from 'src/utils/pagination/pagination.utils';
import { QueryPaginationDto } from 'src/utils/pagination/query-pagination.dto';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { TrainerDto } from './dto/trainer.dto';
import { Trainer } from './trainer.entity';

@Injectable()
export class TrainerService {
  constructor(
    @InjectRepository(Trainer)
    private trainerRepository: Repository<Trainer>,
  ) {}

  async findAll(
    query: QueryPaginationDto,
  ): Promise<PaginateOutput<TrainerDto>> {
    const where: FindOptionsWhere<Trainer>[] = [];

    if (query.search) {
      where.push({ nome: Like('%' + query.search + '%') });
      where.push({ cidadeDeOrigem: Like('%' + query.search + '%') });
    }

    const [entities, count] = await Promise.all([
      this.trainerRepository.find({
        ...paginate(query),
        where,
      }),
      this.trainerRepository.count({ where }),
    ]);

    return paginateOutput<TrainerDto>(
      entities.map((e) => plainToInstance(TrainerDto, e)),
      count,
      query,
    );
  }

  async findById(id: number): Promise<TrainerDto> {
    const response = await this.trainerRepository.findOneBy({ id });

    if (!response) {
      throw new NotFoundException('Trainer not found.');
    }

    return plainToInstance(TrainerDto, response);
  }

  async create(payload: TrainerDto) {
    const entity = this.trainerRepository.create({
      nome: payload.nome,
      cidadeDeOrigem: payload.cidadeDeOrigem,
    });

    return await this.trainerRepository.save(entity);
  }

  async update(id: number, payload: Partial<TrainerDto>) {
    const response = await this.trainerRepository.findOneBy({ id });

    if (!response) {
      throw new NotFoundException('Trainer not found.');
    }

    return this.trainerRepository.update(id, payload);
  }

  async delete(id: number) {
    const response = await this.trainerRepository.findOneBy({ id });

    if (!response) {
      throw new NotFoundException('Trainer not found.');
    }

    return this.trainerRepository.delete(id);
  }
}
