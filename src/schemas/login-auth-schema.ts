import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const LoginAuthDto = z.object({
  email: z.string({ required_error: 'Email is required' }).email(),
  password: z.string({ required_error: 'Password is required' }).nonempty(),
});

export class LoginAuthSchemaDto extends createZodDto(LoginAuthDto) {}
