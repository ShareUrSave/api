import { Controller, Get, NotImplementedException } from '@nestjs/common';

@Controller('saves')
export class SavesController {
  @Get(':uuid')
  getSave() {
    throw new NotImplementedException();
  }

  @Get()
  getSaves() {
    throw new NotImplementedException();
  }
}
