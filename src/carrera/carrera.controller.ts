import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CarreraService } from './carrera.service';
import { CreateCarreraDto } from './dto/create-carrera.dto';

@Controller('carreras')
export class CarreraController {
  constructor(private readonly carreraService: CarreraService) {}

  @Post()
  async create(@Body() dto: CreateCarreraDto) {
    return this.carreraService.create(dto);
  }

  @Get()
  async findAll() {
    return this.carreraService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.carreraService.findOne(+id);
  }
}
