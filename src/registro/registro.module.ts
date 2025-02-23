import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registro } from './entity/registro.entity';
import { UnidadAprendizaje } from './entity/unidad-aprendizaje.entity';
import { RegistroService } from './registro.service';
import { RegistroController } from './registro.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Registro, UnidadAprendizaje])],
  providers: [RegistroService],
  controllers: [RegistroController],
})
export class RegistroModule {}
