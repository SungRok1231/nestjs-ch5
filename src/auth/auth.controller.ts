import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto, AuthLoginDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-admin.decorator';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) AuthCredentialsDto: AuthCredentialsDto
  ): Promise<User> {
    return this.authService.adminSignUp(AuthCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) AuthLoginDto: AuthLoginDto
  ): Promise<{ accessToken: string }> {
    return this.authService.adminSignIn(AuthLoginDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    console.log('user', user);
  }

  @Get('/:id') //파라미터에 id를 받아서 공연 조회
  @UseGuards(AuthGuard())
  getConcertById(
    @Param('id') id: number,
    @GetUser() user: User
  ): Promise<User> {
    return this.authService.getUserById(id, user);
  }
}
