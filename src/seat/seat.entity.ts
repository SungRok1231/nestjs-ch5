import { Concert } from 'src/concerts/concert.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Seat extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  seatNumber: number;

  @ManyToOne(() => Concert, concert => concert.seats, { onDelete: 'CASCADE' })
  concert: Concert;
}
