import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConcertStatus } from './concert.status.enum';
import { v1 as uuid } from 'uuid';
import { CreateConcertDto } from './dto/create-concert.dto';
import { InjectRepository } from '@nestjs/typeorm';
// import { ConcertRepository } from './concert.repository';
import { Concert } from './concert.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { Seat } from 'src/seat/seat.entity';

@Injectable() //인젝터블:다른컨트롤러에서도 해당 서비스파일을 사용할 수 있게 해줌
export class ConcertService {
  constructor(
    @InjectRepository(Concert)
    private concertRepository: Repository<Concert>,
    @InjectRepository(Seat)
    private seatRepository: Repository<Seat>
  ) {}

  /** 콘서트 모두 조회 */
  async getAllConcerts(): Promise<Concert[]> {
    return this.concertRepository.find();
  }

  /** 콘서트 등록하기 */
  async createConcert(
    CreateConcertDto: CreateConcertDto,
    user: User
  ): Promise<Concert> {
    const { title, data, concertTime, price, genre, description, status } =
      CreateConcertDto;

    const found = await this.concertRepository.findOne({ where: { title } });

    if (found) {
      throw new NotFoundException(
        `해당 제목(${title})의 공연이 이미 존재합니다.`
      );
    }

    if (user.admin === 'false') {
      throw new UnauthorizedException(
        '어드민 회원만 콘서트를 등록할 수 있습니다.'
      );
    }

    const concert = this.concertRepository.create({
      title,
      data,
      concertTime,
      price,
      genre,
      description,
      status,
      user,
    });

    await this.concertRepository.save(concert);

    // 콘서트 생성 시 Seat 테이블에 좌석 30개 자동 생성
    const seats = Array.from({ length: 30 }, (_, i) => {
      const seat = new Seat();
      seat.seatNumber = i + 1;
      seat.concert = concert;
      return seat;
    });

    // 저장된 좌석들을 DB에 삽입
    await this.seatRepository.save(seats);

    return concert;
  }

  /** 콘서트 조회 */
  async getConcertById(id: number): Promise<Concert> {
    const found = await this.concertRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`해당 ID(${id})의 공연이 존재하지 않습니다.`); //NotFoundException는 @nestjs/common에서 제공
    }

    return found;
  }

  async deleteConcert(id: number, user: User): Promise<void> {
    const concert = await this.concertRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!concert) {
      throw new NotFoundException(`해당 ID(${id})의 공연이 존재하지 않습니다.`);
    }

    if (concert.user.id !== user.id) {
      throw new ForbiddenException('이 공연을 삭제할 권한이 없습니다.');
    }

    await this.concertRepository.delete(id);
  }

  // /** 콘서트 업데이트 */
  async updateConcertStatus(
    id: number,
    status: ConcertStatus
  ): Promise<Concert> {
    const concert = await this.getConcertById(id);

    concert.status = status;
    await this.concertRepository.save(concert);

    return concert;
  }
}
