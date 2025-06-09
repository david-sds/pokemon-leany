import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { Trainer } from '../trainer/trainer.entity';
import { TeamDto } from './dto/team.dto';
import { Team } from './team.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
    @InjectRepository(Trainer)
    private trainerRepository: Repository<Trainer>,
  ) {}

  async findAll(): Promise<TeamDto[]> {
    const entities = await this.teamRepository.find();

    return entities.map((e) => plainToInstance(TeamDto, e));
  }

  async findById(id: number): Promise<TeamDto> {
    const team = await this.teamRepository.findOneBy({ id });

    if (!team) {
      throw new NotFoundException('Time not found.');
    }

    return plainToInstance(TeamDto, team);
  }

  async findByTrainerId(trainerId: number) {
    const entities = await this.teamRepository.find({
      where: {
        treinador: {
          id: trainerId,
        },
      },
    });

    return entities.map((e) => plainToInstance(TeamDto, e));
  }

  async create(payload: TeamDto) {
    const trainer = await this.trainerRepository.findOne({
      where: { id: payload.treinadorId },
    });
    if (!trainer) {
      throw new NotFoundException('Trainer not found.');
    }

    const entity = this.teamRepository.create({
      nomeDoTime: payload.nomeDoTime,
      treinador: trainer,
    });
    return await this.teamRepository.save(entity);
  }

  async update(id: number, payload: Partial<TeamDto>) {
    const response = await this.teamRepository.findOneBy({ id });

    if (!response) {
      throw new NotFoundException('Time not found.');
    }

    return this.teamRepository.update(id, payload);
  }

  async delete(id: number) {
    const response = await this.teamRepository.findOneBy({ id });

    if (!response) {
      throw new NotFoundException('Time not found.');
    }

    return this.teamRepository.delete(id);
  }
}
