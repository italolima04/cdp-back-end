import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import CreateWaitlistDTO from '../dtos/create-waitlist.dto';
import { WaitlistService } from '../services/waitlist.service';

@Controller('waitlist')
export class WaitlistController {
  constructor(private readonly waitlistService: WaitlistService) {}

  @Post()
  create(@Body() createWaitlistDTO: CreateWaitlistDTO) {
    return this.waitlistService.create(createWaitlistDTO);
  }

  // @Get()
  // findAll() {
  //   return this.waitlistService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.waitlistService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateWaitlistDto: UpdateWaitlistDto,
  // ) {
  //   return this.waitlistService.update(+id, updateWaitlistDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.waitlistService.remove(+id);
  // }
}
