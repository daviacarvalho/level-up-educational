import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from 'src/users/users.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { SchoolModule } from 'src/school/school.module';
import { HelperModule } from 'src/helper/helper.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, SchoolModule, HelperModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
