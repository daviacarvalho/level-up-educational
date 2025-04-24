import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { HashingServiceProtocol } from './hash/hashing.service';
import { BcryptService } from './hash/bcrypt.service';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Global()
@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: HashingServiceProtocol,
      useClass: BcryptService,
    },
    BcryptService,
    AuthService,
  ],
  controllers: [AuthController],
  exports: [HashingServiceProtocol, BcryptService],
})
export class AuthModule {}
