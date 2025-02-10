import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('order')
export class OrderController {
  @UseGuards(JwtAuthGuard)
  @Get()
  async data() {
    return 'hi bro youre in';
  }
}
