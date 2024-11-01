import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto, AuthLoginDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AdminStatus } from './admin.status.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  /**회원가입 */
  async adminSignUp(AuthCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { username, email, password, admin } = AuthCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
      admin,
    });

    try {
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('중복된 이메일 입니다.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  /**로그인 */
  async adminSignIn(
    AuthLoginDto: AuthLoginDto
  ): Promise<{ accessToken: string }> {
    const { email, password } = AuthLoginDto;
    const user = await this.userRepository.findOne({ where: { email } });
    const id = user.id;

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { id };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('이메일 또는 비밀번호를 확인하세요.');
    }
  }

  /**프로필 조회 */
  async getUserById(id: number, user: User): Promise<User> {
    const found = await this.userRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`해당 ID(${id})의 공연이 존재하지 않습니다.`);
    }

    if (found.id !== user.id) {
      throw new ForbiddenException(
        `로그인정보와 id { ${id} } 가 일치하지 않습니다.`
      );
    }

    return found;
  }
}
