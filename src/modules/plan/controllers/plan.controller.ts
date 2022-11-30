import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { PlanService } from '../services/plan.service';
import { CreatePlanDto } from '../dtos/create-plan.dto';
import { UpdatePlanDto } from '../dtos/update-plan.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import uploadConfig from '@/config/upload.config';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags('plans')
@Controller('plans')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(FileInterceptor('image', uploadConfig))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
        },
        status: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        price: {
          type: 'string',
        },
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  create(
    @Body() createPlanDto: CreatePlanDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.planService.createProduct(createPlanDto, image.filename);
  }

  @Get()
  findAll() {
    return this.planService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanDto: UpdatePlanDto) {
    return this.planService.update(id, updatePlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planService.remove(id);
  }
}
