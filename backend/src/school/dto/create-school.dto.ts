// src/school/dto/create-school.dto.ts
import { IsString, IsOptional } from 'class-validator';

export class CreateSchoolDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  city?: string;
}
