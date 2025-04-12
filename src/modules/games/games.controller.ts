import { Controller, Get, NotImplementedException } from '@nestjs/common';

@Controller('games')
export class GamesController {
  @Get(':uuid')
  getGame() {
    throw new NotImplementedException();
  }

  @Get()
  getGames() {
    throw new NotImplementedException();
  }
}
