import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const LoginAuthDto = z.object({
  name: z.string({ required_error: 'Name is required' }).nonempty(),
  password: z.string({ required_error: 'Password is required' }).nonempty(),
});

export class LoginAuthSchemaDto extends createZodDto(LoginAuthDto) {}
