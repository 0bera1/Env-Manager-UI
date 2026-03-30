import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'API durumu',
    description: 'Sunucunun ayakta oldugunu dogrulamak icin basit metin yaniti.',
  })
  @ApiOkResponse({
    description: 'Ornek: Hello World!',
    schema: { type: 'string', example: 'Hello World!' },
  })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
