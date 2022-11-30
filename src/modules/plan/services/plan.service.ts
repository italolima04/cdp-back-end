import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma';
import { CreatePlanDto } from '../dtos/create-plan.dto';
import { UpdatePlanDto } from '../dtos/update-plan.dto';
import { PlanEntity } from '../entities/plan.entity';

@Injectable()
export class PlanService {
  constructor(private prismaService: PrismaService) {}
  async createProduct(
    createPlanDto: CreatePlanDto,
    image: string,
  ): Promise<CreatePlanDto> {
    const newPlan = await this.prismaService.plan.create({
      data: {
        ...createPlanDto,
        price: Number(createPlanDto.price),
        image: image,
      },
    });

    return new PlanEntity(newPlan);
  }

  async findAll(): Promise<PlanEntity[]> {
    const verifyPlans = await this.prismaService.plan.findMany();

    verifyPlans.forEach(
      (verifyPlan) =>
        (verifyPlan.image = `${process.env.URL_FILES_AVATAR}${verifyPlan.image}`),
    );

    return verifyPlans.map((plan) => new PlanEntity(plan));
  }

  async findOne(id: string): Promise<PlanEntity> {
    const verifyPlan = await this.prismaService.plan.findUnique({
      where: { id },
    });

    if (!verifyPlan)
      throw new BadRequestException(
        'Plano não encontrado, favor tente outro id',
      );

    verifyPlan.image = `${process.env.URL_FILES_AVATAR}${verifyPlan.image}`;

    return new PlanEntity(verifyPlan);
  }

  async update(id: string, updatePlanDto: UpdatePlanDto): Promise<PlanEntity> {
    const verifyPlan = await this.prismaService.plan.findFirst({
      where: { id },
    });

    if (!verifyPlan)
      throw new BadRequestException(
        'Plano não encontrado, favor infome outro id ',
      );

    const updatedPlan = await this.prismaService.plan.update({
      where: { id: verifyPlan.id },
      data: { ...updatePlanDto },
    });

    return new PlanEntity({ ...updatedPlan });
  }

  async remove(id: string) {
    const verifyPlan = await this.prismaService.plan.findFirst({
      where: { id },
    });

    if (!verifyPlan)
      throw new BadRequestException(
        'Plano não encontrado, favor informe outro id',
      );

    const removedPlan = await this.prismaService.plan.delete({
      where: { id: verifyPlan.id },
    });

    const planRemoved = new PlanEntity({ ...removedPlan });

    return {
      message: 'Plano removido com sucesso',
      planRemoved,
    };
  }
}
