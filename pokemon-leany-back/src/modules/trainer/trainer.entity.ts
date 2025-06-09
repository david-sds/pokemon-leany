import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Team } from '../team/team.entity';

@Entity()
export class Trainer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ nullable: true })
  cidadeDeOrigem?: string;

  @OneToMany(() => Team, (time) => time.treinador)
  times: Team[];
}
