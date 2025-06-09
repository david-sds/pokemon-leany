import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainerController } from './trainer.controller';
import { Trainer } from './trainer.entity';
import { TrainerService } from './trainer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Trainer])],
  controllers: [TrainerController],
  providers: [TrainerService],
})
export class TrainerModule {}
