import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSchoolDto } from './dto/create-school.dto';

@Injectable()
export class SchoolService {
  constructor(private prisma: PrismaService) {}

  async listAll() {
    const schools = await this.prisma.school.findMany();
    console.log(schools);
    return schools;
  }

  async create(createSchoolDto: CreateSchoolDto) {
    const newSchool = await this.prisma.school.create({
      data: createSchoolDto,
    });
    return newSchool;
  }
}
