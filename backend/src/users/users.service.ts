import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { HashingServiceProtocol } from 'src/auth/hash/hashing.service';
import { Role } from './dto/role.enum';
@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private hashingService: HashingServiceProtocol,
  ) {}

  async listAll() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        classId: true,
      },
    });
    return users;
  }

  async listUsersByRole(role: Role) {
    return this.prisma.user.findMany({
      where: { role },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        classId: true,
        schoolId: true,
        school: {
          select: { name: true },
        },
      },
    });
  }

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    if (createUserDto.role === Role.principal) {
      if (!createUserDto.schoolId) {
        throw new HttpException(
          'schoolId is required for directors',
          HttpStatus.BAD_REQUEST,
        );
      }

      const school = await this.prisma.school.findUnique({
        where: { id: createUserDto.schoolId },
      });
      if (!school) {
        throw new HttpException('School not found', HttpStatus.BAD_REQUEST);
      }
    }

    const hashedPassword = await this.hashingService.hash(
      createUserDto.password,
    );

    const newUser = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: hashedPassword,
        role: createUserDto.role,
        classId: createUserDto.classId,
        schoolId: createUserDto.schoolId,
      },
    });
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }
}
