import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Asignatura } from '../../asignatura/entity/asignatura.entity';
import { Carrera } from '../../carrera/entity/carrera.entity';
import { UnidadAprendizaje } from './unidad-aprendizaje.entity';

@Entity()
export class Registro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cuatrimestre: string;

  // Se usa “competencia” para almacenar el nivel o descripción de la competencia
  @Column('text')
  competencia: string;

  @Column('text')
  objetivoGeneral: string;

  @ManyToOne(() => Asignatura, asignatura => asignatura.registros, { eager: true })
  asignatura: Asignatura;

  @ManyToOne(() => Carrera, carrera => carrera.registros, { eager: true })
  carrera: Carrera;

  @OneToMany(() => UnidadAprendizaje, unidad => unidad.registro, { cascade: true, eager: true })
  unidades: UnidadAprendizaje[];
}
