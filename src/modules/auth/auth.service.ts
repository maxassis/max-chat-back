import { Injectable, UnauthorizedException } from '@nestjs/common';
//import { CreateAuthDto } from './dto/create-auth.dto';
//import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}
  async createToken(user: Users) {
    return this.jwtService.sign(
      {
        sub: user.id,
        name: user.name,
      },
      {
        expiresIn: '1y',
      },
    );
  }

  async login(name: string, password: string) {
    const user = await this.prisma.users.findFirst({
      where: {
        name,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Password is incorrect');
    }

    return this.createToken(user);
  }
}
