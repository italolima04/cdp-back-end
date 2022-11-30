import { HttpStatus, Injectable } from '@nestjs/common';
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
        isActive: isActive ? isActive : undefined,
        plan: {
          status: planActive ? planActive : undefined,
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
  // create(createSubscriptionDto: CreateSubscriptionDto) {}

  // findAll() {
  //   return `This action returns all subscription`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} subscription`;
  // }

  // update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
  //   return `This action updates a #${id} subscription`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} subscription`;
  // }
}
