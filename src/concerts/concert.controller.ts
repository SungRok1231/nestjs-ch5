import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ConcertService } from './concert.service';
import { ConcertStatus } from './concert.status.enum';
import { CreateConcertDto } from './dto/create-concert.dto';
import { Concert } from './concert.entity';
import { ConcertStatusValidationPipe } from './pipes/concert-status-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-admin.decorator';

@Controller('api/concert')
export class ConcertController {
  constructor(private concertService: ConcertService) {}

  @Get('/')
  getAllConcerts(): Promise<Concert[]> {
    return this.concertService.getAllConcerts();
  }

  @Post('/create')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  createConcert(
    @Body() CreateConcertDto: CreateConcertDto,
    @GetUser() user: User ): Promise<Concert> {
    return this.concertService.createConcert(CreateConcertDto, user);
  }

  @Get('/:id')
  getConcertById(@Param('id') id: number): Promise<Concert> {
    return this.concertService.getConcertById(id);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteConcert(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User
  ): Promise<void> {
    return this.concertService.deleteConcert(id, user);
  }

  @Patch('/:id/status')
  @UseGuards(AuthGuard())
  updateConcertStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', ConcertStatusValidationPipe) status: ConcertStatus
  ) {
    return this.concertService.updateConcertStatus(id, status);
  }
}
