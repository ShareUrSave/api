import { SignInDto, SignUpDto } from '@auth/auth.dtos';
import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
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
  constructor() {}

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  signIn(@Body() body: SignInDto, @Req() req: Request, @Res() res: Response) {
    req.login(req.user!, (error) => {
      if (error) {
        throw new InternalServerErrorException('Failed to sign in');
      }

      if (body.rememberMe) req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 30;

      return res.send(req.user);
    });
  }

  @Post('sign-in/google')
  signInWithGoogle() {
    throw new NotImplementedException('Google OAuth2 is not implemented yet');
  }

  @Post('sign-in/steam')
  signInWithSteam() {
    throw new NotImplementedException('Steam OpenID is not implemented yet');
  }

  @Post('sign-in/discord')
  signInWithDiscord() {
    throw new NotImplementedException('Discord OAuth2 is not implemented yet');
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() body: SignUpDto) {
    throw new NotImplementedException('Sign up is not implemented yet');
  }

  @Delete('sign-out')
  @HttpCode(HttpStatus.NO_CONTENT)
  signOut(@Req() req: Request, @Res() res: Response) {
    req.logout((error) => {
      if (error) {
        throw new InternalServerErrorException('Failed to sign out');
      }

      req.session.destroy((error) => {
        if (error) {
          throw new InternalServerErrorException('Failed to destroy session');
        }

        res.clearCookie('connect.sid');
        return res.send();
      });
    });
  }
}
