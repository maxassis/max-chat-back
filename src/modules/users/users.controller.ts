import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
  Param,
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
  constructor(private readonly usersService: UsersService) { }

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

  @Post('/upload/:id')
  // @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@Param() {id}, @UploadedFile() file: Express.Multer.File) {
    console.log(id);

    return this.usersService.avatar({ id, file });
  }

  @Get("/me") 
  @UseGuards(AuthGuard)
  async myData(@Request() req) {
   
    
  return this.usersService.myData({id: req.user.sub})
  }
  
}
