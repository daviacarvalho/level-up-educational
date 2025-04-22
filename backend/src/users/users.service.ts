import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async listAll() {
    const users = await this.prisma.user.findMany();
    console.log('Users: ', users);
    return users;
  }
}
