import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const CreateUserDto = z.object({
  name: z.string({ required_error: 'Name is required' }).nonempty(),
  email: z.string({ required_error: 'Email is required' }).email(),
  password: z.string({ required_error: 'Password is required' }).nonempty(),
});

export class CreateUserSchemaDto extends createZodDto(CreateUserDto) {}

export const CreateUserResponseDto = CreateUserDto.omit({ password: true });

export type CreateUserResponseDto = z.infer<typeof CreateUserResponseDto>;
