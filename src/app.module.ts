import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app/app.gateway';
import { UsersModule } from './users/users.module';
import { ZodValidationPipe } from 'nestjs-zod';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [
    {
      provide: 'APP_PIPE',
      useClass: ZodValidationPipe,
    },
    AppService,
    AppGateway,
  ],
})
export class AppModule {}
