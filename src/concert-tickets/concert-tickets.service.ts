import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConcertTickets } from './concert-tickets.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConcertTicketsDto } from './dto/concert-tickets.dto';
import { Seat } from 'src/seat/seat.entity';
import { User } from 'src/auth/user.entity';
import { Concert } from 'src/concerts/concert.entity';
import { PointHistory } from 'src/point-history/point-history.entity';

@Injectable()
export class ConcertTicketsService {
  constructor(
    @InjectRepository(ConcertTickets)
    private ticketRepository: Repository<ConcertTickets>,
    @InjectRepository(Seat)
    private seatRepository: Repository<Seat>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Concert)
    private concertRepository: Repository<Concert>,
    @InjectRepository(PointHistory)
    private historyRepository: Repository<PointHistory>
  ) {}

  /** 티켓 예매하기 */
  //0.좌석 지정예매
  //    ㄴ Seat테이블에 예매하고자 하는 concertId를 찾기
  //    ㄴ 찾은 concertId에 해당 하는 seatNumber와 req.seatNumber가 일치하지 않으면 에러 반환
  //    ㄴ 예매 성공시 Seat테이블에 해당 seatNumber는 삭제
  //1.예매 성공시 User테이블의 point 차감
  //2.User테이블의 포인트가 Concert의 금액보다 작을 시 에러 반환
  //3.예매 성공시 차감내역 pointHistory테이블에 추가
  //4.Concert의 좌석이 없을시 에러 반환
  async createTicket(
    ConcertTicketsDto: ConcertTicketsDto,
    user: User
  ): Promise<ConcertTickets> {
    const { concertId, seatNumber } = ConcertTicketsDto;

    const seat = await this.seatRepository.findOne({
      where: { seatNumber, concert: { id: concertId } },
      relations: ['concert'],
    });

    if (!seat) {
      throw new NotFoundException(`${seatNumber}번 좌석은 예매할 수 없습니다.`);
    }

    const seatConcertId = seat.concert.id;

    if (seatConcertId !== concertId) {
      throw new BadRequestException(
        `공연{ id: ${concertId} }에 선택하신 좌석{ ${seatNumber} }이 없습니다`
      );
    }

    await this.seatRepository.remove(seat);

    const concert = await this.concertRepository.findOne({
      where: { id: concertId },
    });

    if (!concert) {
      throw new NotFoundException(
        `ID가 ${concertId}인 공연을 찾을 수 없습니다`
      );
    }

    const concertPrice = concert.price;

    if (user.point < concertPrice) {
      throw new BadRequestException(`포인트가 부족합니다`);
    }

    const pointsUsed = (user.point -= concertPrice);
    await this.userRepository.save(user);

    const concertTitle = concert.title;

    const history = await this.historyRepository.create({
      points: concertPrice,
      description: concertTitle,
    });
    await this.historyRepository.save(history);

    const ticket = this.ticketRepository.create({
      user,
      concert,
      seatNumber,
    });
    return await this.ticketRepository.save(ticket);
  }
}
