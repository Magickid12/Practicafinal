import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarreraModule } from './carrera/carrera.module';
import { RegistroModule } from './registro/registro.module';
import { Profesor } from './profesor/entity/profesor.entity';
import { Asignatura } from './asignatura/entity/asignatura.entity';
import { Carrera } from './carrera/entity/carrera.entity';
import { Registro } from './registro/entity/registro.entity';
import { UnidadAprendizaje } from './registro/entity/unidad-aprendizaje.entity';
import { AsignaturaModule } from './asignatura/asignatura.module';
import { ProfesorModule } from './profesor/profesor.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Profesor, Asignatura, Carrera, Registro, UnidadAprendizaje],
      synchronize: true,
    }),
    CarreraModule,
    RegistroModule,
    AsignaturaModule,
    ProfesorModule,

  ],
})
export class AppModule {}
