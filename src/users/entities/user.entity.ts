import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { z } from 'zod';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  fullName: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @Column({ type: 'uuid', nullable: false, unique: true })
  googleId: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  imageUrl: string;

  @Column({ type: 'uuid', nullable: true })
  teamId: string;

  @Column({
    type: 'enum',
    enum: ['dark', 'light'],
    default: 'dark',
    nullable: false,
  })
  theme: string;

  @Column({
    type: 'json',
    nullable: false,
    default: JSON.stringify({ topbar: [], sidemenu: [] }),
  })
  optionsLayout: {};

  @Column({ type: 'varchar', length: 3, nullable: false, default: 'EST' })
  timezone: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    default: 'YYYY-MM-DD',
  })
  dateFormat: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    default: 'YYYY-MM-DD HH:mm:ss',
  })
  dateTimeFormat: string;

  @Column({
    type: 'timestamp',
    nullable: false,
    update: false,
    default: 'now()',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    nullable: false,
    update: true,
    default: 'now()',
  })
  lastSignIn: Date;
}

// Zod Validations fot Primary columns
export const z_users_id = z.string().uuid();

export const z_users_fullName = z
  .string()
  .min(3, 'Name cannot be less than 3 characters long')
  .max(255, 'Name cannot be more than 255 characters long');

export const z_users_email = z
  .string()
  .email()
  .refine(
    (email) => {
      return email.endsWith('@one-line.com');
    },
    {
      message: "Email must be from the domain '@one-line.com'",
    },
  );

export const z_users_googleId = z
  .string()
  .uuid({ message: 'Google ID must be a UUID' });

export const z_users_imageUrl = z
  .string()
  .max(255, 'Image URL cannot be more than 255 characters long');

export const z_users_theme = z
  .string()
  .min(1)
  .refine((value) => value === 'dark' || value === 'light', {
    message: "Theme must be either 'dark' or 'light'",
  });

export const z_users_optionsLayout = z.object({
  topbar: z
    .number()
    .int()
    .min(1)
    .optional()
    .array()
    .refine((items) => new Set(items).size === items.length, {
      message: 'Must be an array of unique positive integers',
    }),
  sidemenu: z
    .number()
    .int()
    .min(0)
    .optional()
    .array()
    .refine(
      (items) => {
        const allUnique = new Set(items).size === items.length;
        const noOfZeroes = items.filter((item) => item === 0).length;
        if (noOfZeroes <= 1 && !allUnique) return false;
        else return true;
      },
      {
        message:
          'Must be an array of unique positive integers (non-unique 0s allowed)',
      },
    ),
});

export const z_users_timezone = z.string().regex(/^[A-Z]{3}$/);

export const z_users_dateFormat = z
  .string()
  .max(50, 'Date format cannot be more than 50 characters long');

export const z_users_dateTimeFormat = z
  .string()
  .max(75, 'DateTime format cannot be more than 75 characters long');

export const z_users_createdAt = z.date();

export const z_users_lastSignInAt = z.date();
