import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSchoolDto } from './dto/create-school.dto';

@Injectable()
export class SchoolService {
  constructor(private prisma: PrismaService) {}

  async listAll() {
    return this.prisma.school.findMany();
  }

  async create(createSchoolDto: CreateSchoolDto) {
    const newSchool = await this.prisma.school.create({
      data: createSchoolDto,
    });
    return newSchool;
  }
}
