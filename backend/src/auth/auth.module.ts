import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { HashingServiceProtocol } from './hash/hashing.service';
import { BcryptService } from './hash/bcrypt.service';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { AuthTokenGuard } from './guards/auth-token.guard';
import { HelperModule } from 'src/helper/helper.module';

@Global()
@Module({
  imports: [
    PrismaModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    HelperModule,
  ],
  providers: [
    {
      provide: HashingServiceProtocol,
      useClass: BcryptService,
    },
    BcryptService,
    AuthService,
    AuthTokenGuard,
  ],
  controllers: [AuthController],
  exports: [
    HashingServiceProtocol,
    BcryptService,
    AuthService,
    JwtModule,
    AuthTokenGuard,
    ConfigModule,
  ],
})
export class AuthModule {}
