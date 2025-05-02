import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthTokenGuard } from '../auth/guards/auth-token.guard';
import { Request } from 'express';
import { REQUEST_TOKEN_PAYLOAD_NAME } from 'src/auth/common/auth.constants';
import { Role } from './dto/role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthTokenGuard)
  findAll(@Req() req: Request) {
    console.log(req[REQUEST_TOKEN_PAYLOAD_NAME]?.name);
    return this.usersService.listAll();
  }

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':role')
  findUserByRole(@Param('role') role: string) {
    return this.usersService.listUsersByRole(role as Role);
  }
}
