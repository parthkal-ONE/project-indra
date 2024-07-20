import { z, infer } from 'zod';
import {
  z_users_email,
  z_users_fullName,
  z_users_googleId,
  z_users_imageUrl,
} from '../entities/user.entity';
import { createZodDto } from '@anatine/zod-nestjs';

export const z_CreateUserDto = z.object({
  fullName: z_users_fullName,
  email: z_users_email,
  googleId: z_users_googleId,
  imageUrl: z_users_imageUrl,
});

export class CreateUserDto extends createZodDto(z_CreateUserDto) {}

// export const CreateUserDto = z.infer<typeof z_CreateUserDto>;
