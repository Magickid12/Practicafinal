import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Registro } from './registro.entity';

@Entity()
export class UnidadAprendizaje {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  nombre: string;

  @Column('text')
  competenciaEspecifica: string;

  @Column('int')
  numeroSemanas: number;

  @Column('text')
  resultadoAprendizaje: string;

  @Column('float')
  porcentajeSaber: number;

  @Column('float')
  porcentajeHacerSer: number;

  @ManyToOne(() => Registro, registro => registro.unidades)
  registro: Registro;
}
