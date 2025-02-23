import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Profesor } from '../../profesor/entity/profesor.entity';
import { Registro } from '../../registro/entity/registro.entity';

@Entity()
export class Asignatura {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column('int')
  duracionHoras: number;

  @ManyToOne(() => Profesor, profesor => profesor.asignaturas, { eager: true })
  profesor: Profesor;

  @OneToMany(() => Registro, registro => registro.asignatura)
  registros: Registro[];
}
