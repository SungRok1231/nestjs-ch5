import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { Concert } from 'src/concerts/concert.entity';

@Entity()
export class ConcertTickets {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.concertTickets, { eager: false })
  user: User;

  @ManyToOne(() => Concert, (concert) => concert.concertTickets, {
    eager: false,
  })
  concert: Concert;

  @Column({ type: 'int', nullable: false })
  seatNumber: number;
}
