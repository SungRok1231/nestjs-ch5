import { IsInt } from "class-validator";

export class ConcertTicketsDto {
    @IsInt()
    concertId: number;

    @IsInt()
    seatNumber: number;
}