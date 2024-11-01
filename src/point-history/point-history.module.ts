import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointHistory } from './point-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PointHistory])],
  providers: [],
  controllers: [],
})
export class PointHistoryModule {}
