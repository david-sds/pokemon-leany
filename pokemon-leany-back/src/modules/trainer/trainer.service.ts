import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { TrainerDto } from './dto/trainer.dto';
import { Trainer } from './trainer.entity';

@Injectable()
export class TrainerService {
  constructor(
    @InjectRepository(Trainer)
    private trainerRepository: Repository<Trainer>,
  ) {}

  async findAll(): Promise<TrainerDto[]> {
    const entities = await this.trainerRepository.find();

    return entities.map((e) => plainToInstance(TrainerDto, e));
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
