import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Team } from '../team/team.entity';

@Entity()
@Unique(['username'])
export class Trainer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  nome: string;

  @Column({ nullable: true })
  cidadeDeOrigem?: string;

  @OneToMany(() => Team, (time) => time.treinador)
  times: Team[];
}
