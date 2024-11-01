import { Concert } from 'src/concerts/concert.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { AdminStatus } from './admin.status.enum';
import { PointHistory } from 'src/point-history/point-history.entity';
import { ConcertTickets } from 'src/concert-tickets/concert-tickets.entity';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  cratedAt: Date;

  @Column({ type: 'enum', enum: AdminStatus, default: AdminStatus.FALSE })
  admin: AdminStatus;

  @Column({ type: 'int', default: 1000000 })
  point: number;

  @OneToMany((type) => Concert, (concert) => concert.user, { eager: true })
  concerts: Concert[];

  @OneToMany(() => ConcertTickets, (concertTickets) => concertTickets.user)
  concertTickets: ConcertTickets[];

  @OneToMany((type) => PointHistory, (pointHistory) => pointHistory.user, {
    eager: true,
  })
  pointHistories: PointHistory[];
}
