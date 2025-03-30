import {
  Controller,
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
  signIn(@Req() req: Request, @Res() res: Response) {
    return req.login(req.user!, (error) => {
      if (error) {
        throw new InternalServerErrorException();
      }

      return res.send(req.user);
    });
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  signUp() {
    throw new NotImplementedException();
  }

  @Post('sign-out')
  @HttpCode(HttpStatus.NO_CONTENT)
  signOut() {
    throw new NotImplementedException();
  }
}
