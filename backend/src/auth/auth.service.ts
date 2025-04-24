import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HashingServiceProtocol } from './hash/hashing.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly hash: HashingServiceProtocol,
  ) {}

  async authenticateUser(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const passwordIsValid = await this.hash.compare(
      loginDto.password,
      user.password,
    );

    if (!passwordIsValid) {
      throw new HttpException(
        'Invalid credentials. Please check your email and password.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
