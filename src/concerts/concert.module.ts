import { Module } from '@nestjs/common';
import { ConcertController } from './concert.controller';
import { ConcertService } from './concert.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Concert } from './concert.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Seat } from 'src/seat/seat.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Concert, Seat]),
    AuthModule
  ],
  controllers: [ConcertController], 
  providers: [ConcertService]
})
export class ConcertModule {}
