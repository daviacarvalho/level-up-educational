import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HashingServiceProtocol } from './hash/hashing.service';
import jwtConfig from './config/jwt.config';
import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ResetPasswordDto } from './dto/resetPasswor.dto';
import * as crypto from 'crypto';
import { HelperService } from 'src/helper/helper.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly hash: HashingServiceProtocol,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
    private readonly helperService: HelperService,
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

    const token = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
        name: user.name,
      },
      {
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.jwtTtl,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      },
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: token,
    };
  }

  async forgotPassword(email: string) {
    // Logic to generate token, save on DB and send email
    // Generate token
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    console.log(`Password reset initiated for email: ${email}`);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    console.log(resetToken);

    // Logic to expire token

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: resetToken,
      },
    });

    // Logic to send email
    const sentMail = await this.helperService.sendResetPasswordEmail(
      email,
      user.name,
      resetToken,
    );

    return sentMail;
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        resetPasswordToken: resetPasswordDto.token,
      },
    });

    if (!user) {
      throw new HttpException(
        'Unable to reset password. Invalid or expired token.',
        HttpStatus.BAD_REQUEST,
      );
    }
    // Verify if the token expires
    // ...

    const hasedPassword = await this.hash.hash(resetPasswordDto.newPassword);

    const updatedPassword = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hasedPassword,
        resetPasswordToken: null,
      },
    });

    return updatedPassword;
  }
}
