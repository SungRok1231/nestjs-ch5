import { IsNotEmpty } from 'class-validator';
import { ConcertStatus } from '../concert.status.enum';

export class CreateConcertDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  data: string;

  @IsNotEmpty()
  concertTime: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  genre: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  status: ConcertStatus;
}
