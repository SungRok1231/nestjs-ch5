import { Module } from '@nestjs/common';
import { ConcertModule } from './concerts/concert.module';
import { typeORMConfig } from './configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { PointHistoryModule } from './point-history/point-history.module';
import { ConcertTicketsModule } from './concert-tickets/concert-tickets.module';
import { SeatModule } from './seat/seat.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    ConcertModule,
    AuthModule,
    PointHistoryModule,
    ConcertTicketsModule,
    SeatModule
  ],
})
export class AppModule {}
