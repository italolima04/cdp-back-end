import { Controller, Post, Body } from '@nestjs/common';
import CreateWaitlistDTO from '../dtos/create-waitlist.dto';
import { WaitlistService } from '../services/waitlist.service';

@Controller('waitlist')
export class WaitlistController {
  constructor(private readonly waitlistService: WaitlistService) {}

  @Post()
  create(@Body() createWaitlistDTO: CreateWaitlistDTO) {
    return this.waitlistService.create(createWaitlistDTO);
  }
}
