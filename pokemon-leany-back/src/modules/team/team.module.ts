import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trainer } from '../trainer/trainer.entity';
import { TeamController } from './team.controller';
import { Team } from './team.entity';
import { TeamService } from './team.service';

@Module({
  imports: [TypeOrmModule.forFeature([Team, Trainer])],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
