import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from 'src/users/users.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { SchoolModule } from 'src/school/school.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, SchoolModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
