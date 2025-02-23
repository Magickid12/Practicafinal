import { IsString, IsNotEmpty, IsInt, IsNumber, isString, isNotEmpty } from 'class-validator';

export class CreateUnidadAprendizajeDto {

  @IsString()
  @IsNotEmpty()
  nombre : string;
 
  @IsString()
  @IsNotEmpty()
  competenciaEspecifica: string;

  @IsInt()
  numeroSemanas: number;

  @IsString()
  @IsNotEmpty()
  resultadoAprendizaje: string;

  @IsNumber()
  porcentajeSaber: number;

  @IsNumber()
  porcentajeHacerSer: number;
}
