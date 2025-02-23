import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carrera } from './entity/carrera.entity';
import { CarreraService } from './carrera.service';
import { CarreraController } from './carrera.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Carrera])],
  providers: [CarreraService],
  controllers: [CarreraController],
  exports: [CarreraService],
})
export class CarreraModule {}
