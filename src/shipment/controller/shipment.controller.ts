import { Public } from '@/modules/auth/decorators/public.decorator';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Query,
  Param,
} from '@nestjs/common';
import { ShipmentService } from '../services/shipment.service';

@Controller('shipment')
export class ShipmentController {
  constructor(private readonly shipmentService: ShipmentService) {}

  @Get('calculate/:zipCode')
  calculateShipment(@Param('zipCode') zipCode: string) {
    return this.shipmentService.calculateShipment(zipCode);
  }

  @Get('consult/:zipCode')
  consultZipCode(@Param('zipCode') zipCode: string) {
    return this.shipmentService.consultZipCode(zipCode);
  }

  @Get('track/:trackingCode')
  trackOrder(@Param('trackingCode') trackingCode: string) {
    return this.shipmentService.trackOrder(trackingCode);
  }
}
