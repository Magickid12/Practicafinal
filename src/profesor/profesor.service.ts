import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profesor } from './entity/profesor.entity';
import { CreateProfesorDto } from './dto/create-profesor.dto';

@Injectable()
export class ProfesorService {
  constructor(
    @InjectRepository(Profesor)
    private readonly profesorRepository: Repository<Profesor>,
  ) {}

  async create(dto: CreateProfesorDto) {
    const profesor = this.profesorRepository.create(dto);
    return this.profesorRepository.save(profesor);
  }

  findAll() {
    return this.profesorRepository.find();
  }

  async findOne(id: number) {
    const profesor = await this.profesorRepository.findOneBy({ id });
    if (!profesor) {
      throw new NotFoundException(`Profesor con id ${id} no encontrado`);
    }
    return profesor;
  }
}
