import { IsString, IsNotEmpty, IsInt, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUnidadAprendizajeDto } from './create-unidad-aprendizaje.dto';

export class CreateRegistroDto {
  @IsString()
  @IsNotEmpty()
  cuatrimestre: string;

  @IsString()
  @IsNotEmpty()
  competencia: string;

  @IsString()
  @IsNotEmpty()
  objetivoGeneral: string;

  @IsInt()
  asignaturaId: number;

  @IsInt()
  carreraId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateUnidadAprendizajeDto)
  unidades: CreateUnidadAprendizajeDto[];
}
