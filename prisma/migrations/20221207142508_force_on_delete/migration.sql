-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_addressId_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_couponId_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_subscriptionId_fkey";

-- DropForeignKey
ALTER TABLE "subscription" DROP CONSTRAINT "subscription_planId_fkey";

-- DropForeignKey
ALTER TABLE "subscription" DROP CONSTRAINT "subscription_userId_fkey";

-- DropForeignKey
ALTER TABLE "userstoken" DROP CONSTRAINT "userstoken_users_id_fkey";

-- AddForeignKey
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_planId_fkey" FOREIGN KEY ("planId") REFERENCES "plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "coupon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "subscription"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userstoken" ADD CONSTRAINT "userstoken_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
