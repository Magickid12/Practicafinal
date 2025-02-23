import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Registro } from '../../registro/entity/registro.entity';

@Entity()
export class Carrera {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => Registro, registro => registro.carrera)
  registros: Registro[];
}
