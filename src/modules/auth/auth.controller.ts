import { SignInBodyDto, SignUpBodyDto } from '@auth/auth.dtos';
import { AuthService } from '@auth/auth.service';
import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  NotImplementedException,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  signIn(
    @Body() body: SignInBodyDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return this.authService.signIn(req, res, body.rememberMe);
  }

  @Post('sign-in/google')
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.CREATED)
  signInWithGoogle() {
    throw new NotImplementedException('Google OAuth2 is not implemented yet');
  }

  @Post('sign-in/steam')
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.CREATED)
  signInWithSteam() {
    throw new NotImplementedException('Steam OpenID is not implemented yet');
  }

  @Post('sign-in/discord')
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.CREATED)
  signInWithDiscord() {
    throw new NotImplementedException('Discord OAuth2 is not implemented yet');
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  signUp(
    @Body() body: SignUpBodyDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return this.authService.signUp(body, req, res);
  }

  @Delete('sign-out')
  @HttpCode(HttpStatus.NO_CONTENT)
  signOut(@Req() req: Request, @Res() res: Response) {
    return this.authService.signOut(req, res);
  }
}
