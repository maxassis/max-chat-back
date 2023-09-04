import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserResponseDto,
  CreateUserSchemaDto,
} from 'src/schemas/create-user-schema';
import { AuthGuard } from 'src/guards/auth-guard.provider';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() body: CreateUserSchemaDto) {
    const user = await this.usersService.create(body);
    return CreateUserResponseDto.parse(user);
  }

  @Get('/profile')
  @UseGuards(AuthGuard)
  async profile(@Request() req) {
    return req.user;
  }

  @Post('/upload')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@Request() req, @UploadedFile() file: Express.Multer.File) {
   // console.log(file);
    
    return this.usersService.avatar({ id: req.user.sub, file });
  }
}
