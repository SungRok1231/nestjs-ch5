import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/auth/user.entity';

@Entity()
export class PointHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  points: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  usedAt: Date;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @ManyToOne(type => User, user => user.pointHistories)
  user: User;
}
