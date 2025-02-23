import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateAsignaturaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsInt()
  duracionHoras: number;

  // Relación con profesor mediante su ID
  @IsInt()
  profesorId: number;
}
