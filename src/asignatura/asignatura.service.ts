import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignatura } from './entity/asignatura.entity';
import { CreateAsignaturaDto } from './dto/create-asignatura.dto';
import { Profesor } from 'src/profesor/entity/profesor.entity';

@Injectable()
export class AsignaturaService {
  constructor(
    @InjectRepository(Asignatura)
    private readonly asignaturaRepository: Repository<Asignatura>,
  ) {}

  async create(dto: CreateAsignaturaDto) {
    // Relacionar con profesor
    const asignatura = this.asignaturaRepository.create({
      nombre: dto.nombre,
      duracionHoras: dto.duracionHoras,
      profesor: { id: dto.profesorId }, // Solo referenciamos el ID
    });
    return this.asignaturaRepository.save(asignatura);
  }

  findAll() {
    return this.asignaturaRepository.find({
      relations: { profesor: true },
    });
  }

  async findOne(id: number) {
    const asignatura = await this.asignaturaRepository.findOne({
      where: { id },
      relations: { profesor: true },
    });
    if (!asignatura) {
      throw new NotFoundException(`Asignatura con id ${id} no encontrada`);
    }
    return asignatura;
  }
  async updateOne(id: number, updateAsignaturaDto: Partial<Asignatura>) {
    const asignatura = await this.asignaturaRepository.update(
      id,
      updateAsignaturaDto
    );
    return this.findOne(id);
  }

}
