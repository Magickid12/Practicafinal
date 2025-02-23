import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { RegistroService } from './registro.service';
import { CreateRegistroDto } from './dto/create-registro.dto';

@Controller('registros')
export class RegistroController {
  constructor(private readonly registroService: RegistroService) {}

  @Post()
  async create(@Body() dto: CreateRegistroDto) {
    return this.registroService.create(dto);
  }

  @Get()
  async findAll() {
    return this.registroService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.registroService.findOne(+id);
  }
}
