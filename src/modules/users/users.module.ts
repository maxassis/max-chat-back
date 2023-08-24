import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { IStorage } from 'src/storage/storage';
import { SupabaseStorage } from 'src/storage/supabase-storage';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: IStorage,
      useClass: SupabaseStorage,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
