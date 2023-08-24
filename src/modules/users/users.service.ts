import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserSchemaDto } from 'src/schemas/create-user-schema';
import { IStorage } from 'src/storage/storage';

type AvatarDTO = {
  id: string;
  file: Express.Multer.File;
};

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private storage: IStorage) {}

  async create(body: CreateUserSchemaDto): Promise<CreateUserSchemaDto | null> {
    const user = await this.prisma.users.findFirst({
      where: {
        OR: [
          {
            name: body.name,
          },
          {
            email: body.email,
          },
        ],
      },
    });

    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const passwordHash = await bcrypt.hash(body.password, 10);

    return this.prisma.users.create({
      data: {
        ...body,
        password: passwordHash,
      },
    });
  }

  async avatar(data: AvatarDTO) {
    const file = await this.storage.upload(data.file, 'avatars');
    //console.log(data);
    return file;
  }

  // findAll() {
  //   return this.prisma.users.findMany();
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
