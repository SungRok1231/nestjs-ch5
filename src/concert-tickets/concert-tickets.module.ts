import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConcertTicketsService } from './concert-tickets.service';
import { ConcertTickets } from './concert-tickets.entity';
import { ConcertTicketsController } from './concert-tickets.controller';
import { Seat } from 'src/seat/seat.entity';
import { User } from 'src/auth/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Concert } from 'src/concerts/concert.entity';
import { PointHistory } from 'src/point-history/point-history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConcertTickets, Seat, User, Concert, PointHistory]),
    AuthModule,
  ],
  providers: [ConcertTicketsService],
  controllers: [ConcertTicketsController],
  exports: [ConcertTicketsService]
})
export class ConcertTicketsModule {}