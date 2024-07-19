import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ type: 'json', nullable: false })
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

  @Column({ type: 'timestamp', nullable: false, update: false })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: false })
  lastSignIn: Date;
}
