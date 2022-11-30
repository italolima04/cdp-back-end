import { Module } from '@nestjs/common';
import { ShipmentController } from './controller/shipment.controller';
import { ShipmentService } from './services/shipment.service';

@Module({
  controllers: [ShipmentController],
  providers: [ShipmentService],
})
export class ShipmentModule {}
