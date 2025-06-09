import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Team } from '../team/team.entity';

@Entity()
@Unique(['time', 'nomePokemon'])
export class TeamPokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nomePokemon: string;

  @ManyToOne(() => Team, (team) => team.timePokemons, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'timeId' })
  time: Team;
}
