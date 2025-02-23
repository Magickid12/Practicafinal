import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Asignatura } from '../../asignatura/entity/asignatura.entity';

@Entity()
export class Profesor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  // Puedes agregar otros campos, por ejemplo, email o especialidad

  @OneToMany(() => Asignatura, asignatura => asignatura.profesor)
  asignaturas: Asignatura[];
}
