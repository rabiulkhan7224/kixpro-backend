import { Exclude } from 'class-transformer';
import { Role } from 'src/common/enums/roles.enum';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@Index(['email', 'id'], { unique: true })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 96, nullable: false })
  firstName: string;

  @Column({ type: 'varchar', length: 96, nullable: false })
  lastName: string;

  @Column({ type: 'varchar', length: 96, nullable: false, unique: true })
  email: string;

  @Column({ type: 'boolean', default: false, nullable: false })
  isEmailVerified: boolean;

  @Column({ type: 'varchar', length: 96, nullable: false })
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
    nullable: false,
  })
  role: Role;

  @Exclude()
  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  googleId?: string;
}
