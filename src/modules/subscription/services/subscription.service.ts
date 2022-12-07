import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma';
import { SearchSubscriptionDTO } from '../dtos/search-subscriptions.dto';

@Injectable()
export class SubscriptionService {
  constructor(private prisma: PrismaService) {}
  async getMySubscriptions(
    userId: string,
    searchSubscriptionDTO: SearchSubscriptionDTO,
  ) {
    const { isActive, planActive } = searchSubscriptionDTO;

    const mySubscriptions = await this.prisma.subscription.findMany({
      where: {
        userId,
        isActive: isActive,
        plan: {
          status: planActive,
        },
      },
      select: {
        id: true,
        isActive: true,
        plan: {
          select: {
            title: true,
            description: true,
            price: true,
            status: true,
            Subscription: {
              select: {
                isActive: true,
              },
            },
          },
        },
      },
    });

    return {
      data: mySubscriptions,
      status: HttpStatus.OK,
      message: 'Subscriptions returned successfully',
    };
  }

  async disableMySubscription(id: string) {
    const existsSubscription = await this.prisma.subscription.findFirst({
      where: { id },
    });

    if (!existsSubscription) {
      throw new NotFoundException('Subscription does not found');
    }

    if (!existsSubscription.isActive) {
      throw new ConflictException(`This subscription it's already desable`);
    }

    const disabledSubscription = await this.prisma.subscription.update({
      where: { id },
      data: { isActive: false },
    });

    return {
      data: disabledSubscription,
      status: HttpStatus.OK,
      message: 'Subscription disabled successfully',
    };
  }
}
