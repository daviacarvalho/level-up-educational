import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { Role } from '../../generated/prisma';

@Injectable()
export class SchoolService {
  constructor(private prisma: PrismaService) {}

  async listAll() {
    const schools = await this.prisma.school.findMany({
      include: {
        users: {
          where: {
            role: Role.principal,
          },
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    return schools.map((school) => ({
      id: String(school.id),
      name: school.name,
      city: school.city || '',
      principalName: school.users[0]?.name || '',
      principal: school.users[0]
        ? {
            id: school.users[0].id,
            name: school.users[0].name,
            email: school.users[0].email,
            role: school.users[0].role,
          }
        : undefined,
    }));
  }

  async create(createSchoolDto: CreateSchoolDto) {
    const newSchool = await this.prisma.school.create({
      data: createSchoolDto,
    });
    return newSchool;
  }

  async delete(id: number) {
    const findSchool = await this.prisma.school.findUnique({
      where: { id: Number(id) },
    });

    if (!findSchool) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    const deletedSchool = await this.prisma.school.delete({
      where: { id: findSchool.id },
    });

    return deletedSchool;
  }
}
