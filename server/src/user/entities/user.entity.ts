import { Entity, Column, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';
import BaseEntity from 'src/common/entities/base.entity';

export enum UserRole {
  Admin = 'admin',
  User = 'user',
}

@Entity()
export class User extends BaseEntity<User> {
  @Column({ type: 'varchar', length: 50 })
  firstName: string;

  @Column({ type: 'varchar', length: 50 })
  lastName: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'varchar', length: 250, select: false })
  password: string;

  @Column({ default: true })
  isActive?: boolean;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.User })
  role?: UserRole;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
