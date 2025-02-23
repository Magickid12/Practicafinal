import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carrera } from './entity/carrera.entity';
import { CreateCarreraDto } from './dto/create-carrera.dto';

@Injectable()
export class CarreraService {
  constructor(
    @InjectRepository(Carrera)
    private readonly carreraRepository: Repository<Carrera>,
  ) {}

  async create(dto: CreateCarreraDto): Promise<Carrera> {
    const carrera = this.carreraRepository.create(dto);
    return this.carreraRepository.save(carrera);
  }

  async findAll(): Promise<Carrera[]> {
    return this.carreraRepository.find();
  }

  async findOne(id: number): Promise<Carrera> {
    const carrera = await this.carreraRepository.findOne({ where: { id } });
    if (!carrera) {
      throw new NotFoundException(`Carrera con id ${id} no encontrada`);
    }
    return carrera;
  }



}
