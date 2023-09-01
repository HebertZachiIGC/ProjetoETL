import { Body, Controller, Get, Query } from '@nestjs/common';
import { TargetService } from './target.service';
import { Target } from './target.entity';

@Controller('auth')
export class TargetController {
  constructor(private targetService: TargetService) {

  }

  @Get('/target')
  async findAll() {
    return await this.targetService.findAll();
  }

  @Get('/target2')
  async findAllSub(@Query('ClientSubSector') ClientSubSector: string)  {
    return await this.targetService.findAllByQuery(ClientSubSector); //
  }
}


