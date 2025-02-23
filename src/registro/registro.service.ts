import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Registro } from './entity/registro.entity';
import { CreateRegistroDto } from './dto/create-registro.dto';
import { UnidadAprendizaje } from './entity/unidad-aprendizaje.entity';

@Injectable()
export class RegistroService {
  constructor(
    @InjectRepository(Registro)
    private readonly registroRepository: Repository<Registro>,
    @InjectRepository(UnidadAprendizaje)
    private readonly unidadRepository: Repository<UnidadAprendizaje>,
  ) {}

  async create(dto: CreateRegistroDto): Promise<Registro> {
    // Crea el registro utilizando el DTO. Con cascade, las unidades se crean automáticamente.
    const registro = this.registroRepository.create({
      cuatrimestre: dto.cuatrimestre,
      competencia: dto.competencia,
      objetivoGeneral: dto.objetivoGeneral,
      asignatura: { id: dto.asignaturaId }, // Referencia al id de la asignatura
      carrera: { id: dto.carreraId }, // Referencia al id de la carrera
      unidades: dto.unidades,
    });
    return this.registroRepository.save(registro);
  }

  async findAll(): Promise<Registro[]> {
    return this.registroRepository.find({
      relations: {
        unidades: true,
        carrera: true,
        asignatura: true,
      },
    });
  }

  async findOne(id: number): Promise<Registro> {
    const registro = await this.registroRepository.findOne({
      where: { id },
      relations: {
        unidades: true,
        carrera: true,
        asignatura: true,
      },
    });
    if (!registro) {
      throw new NotFoundException(`Registro con id ${id} no encontrado`);
    }
    return registro;
  }
}
