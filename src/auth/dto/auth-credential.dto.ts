import {
  IsEnum,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { AdminStatus } from '../admin.status.enum';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  username: string;

  @IsString()
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: '올바른 이메일 형식이 아닙니다',
  })
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: '비밀번호는 영어 대소문자와 숫자만 입력할 수 있습니다',
  })
  password: string;

  @IsEnum(AdminStatus)
  admin: AdminStatus;
}

export class AuthLoginDto {
  @IsString()
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: '올바른 이메일 형식이 아닙니다',
  })
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: '비밀번호는 영어 대소문자와 숫자만 입력할 수 있습니다',
  }) //영어,숫자만 가능한 유효성 체크
  password: string;
}
