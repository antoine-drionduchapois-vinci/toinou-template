import { Exclude, instanceToPlain } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export default abstract class BaseEntity<T> {
  @PrimaryGeneratedColumn({
    type: 'int',
    primaryKeyConstraintName: 'PK_id',
  })
  id: number;

  @CreateDateColumn({
    type: 'datetime',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  createdAt: Date;

  @Column({ type: 'int', nullable: true })
  @Exclude({ toPlainOnly: true })
  createdBy: number;

  @UpdateDateColumn({
    type: 'datetime',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
    onUpdate: 'CURRENT_TIMESTAMP(3)',
  })
  updatedAt: Date;

  @Column({ type: 'int', nullable: true })
  @Exclude({ toPlainOnly: true })
  updatedBy?: number;

  @DeleteDateColumn({ type: 'datetime', precision: 3, nullable: true })
  @Exclude({ toPlainOnly: true })
  @Index('IDX_deletedAt')
  deletedAt?: Date;

  @Column({ type: 'int', nullable: true })
  @Exclude({ toPlainOnly: true })
  deletedBy?: number;

  constructor(model?: Partial<T>) {
    Object.assign(this, model);
  }

  toJSON(): any {
    return instanceToPlain(this);
  }
}
