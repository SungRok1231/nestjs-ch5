import { BaseEntity, Check, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ConcertStatus } from './concert.status.enum';
import { User } from 'src/auth/user.entity';
import { ConcertTickets } from 'src/concert-tickets/concert-tickets.entity';
import { Seat } from 'src/seat/seat.entity';

@Entity()
export class Concert extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  title: string;

  @Column({ type: 'date', nullable: true })
  data: string;

  @Column({ type: 'varchar', nullable: true })
  concertTime: string;

  @Column({ type: 'int', nullable: true })
  @Check(`"price" >= 0 AND "price" <= 50000`)
  price: number

  @Column({ type: 'varchar', length: 50, nullable: true })
  genre: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: ConcertStatus,
    default: ConcertStatus.POSSIBLE,
    nullable: true,
  })
  status: ConcertStatus;

  @ManyToOne(type => User, user => user.concerts, { eager: false })
  user: User;

  @OneToMany(() => Seat, seat => seat.concert, { cascade: true })
  seats: Seat[];

  @OneToMany(() => ConcertTickets, concertTickets => concertTickets.concert)
  concertTickets: ConcertTickets[];
}
