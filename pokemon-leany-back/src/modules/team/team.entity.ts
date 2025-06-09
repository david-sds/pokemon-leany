import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TeamPokemon } from '../team-pokemon/team-pokemon.entity';
import { Trainer } from '../trainer/trainer.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nomeDoTime: string;

  @ManyToOne(() => Trainer, (treinador) => treinador.times, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'treinadorId' })
  treinador: Trainer;

  @OneToMany(() => TeamPokemon, (tp) => tp.time, { cascade: true })
  timePokemons: TeamPokemon[];
}
