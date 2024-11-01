// src/concert-tickets/concert-tickets.controller.ts
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ConcertTicketsService } from './concert-tickets.service';
import { ConcertTicketsDto } from './dto/concert-tickets.dto'; // DTO 경로
import { ConcertTickets } from './concert-tickets.entity'; // ConcertTickets 엔티티 경로
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-admin.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/tickets')
export class ConcertTicketsController {
  constructor(private readonly concertTicketsService: ConcertTicketsService) {}

  @Post('ticketing')
  @UseGuards(AuthGuard())
  async createTicket(
    @Body() ConcertTicketsDto: ConcertTicketsDto,
    @GetUser() user: User
  ): Promise<ConcertTickets> {
    return this.concertTicketsService.createTicket(ConcertTicketsDto, user);
  }
}
