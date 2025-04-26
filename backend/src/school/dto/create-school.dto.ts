// src/school/dto/create-school.dto.ts
import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateSchoolDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsInt()
  classId?: number;

  @IsOptional()
  @IsInt()
  schoolId?: number;
}
