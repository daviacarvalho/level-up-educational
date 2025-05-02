import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SchoolService } from './school.service';
import { AuthTokenGuard } from 'src/auth/guards/auth-token.guard';
import { CreateSchoolDto } from './dto/create-school.dto';
@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Get()
  @UseGuards(AuthTokenGuard)
  findAll() {
    return this.schoolService.listAll();
  }

  @Post()
  createSchool(@Body() createSchoolDto: CreateSchoolDto) {
    return this.schoolService.create(createSchoolDto);
  }
}
