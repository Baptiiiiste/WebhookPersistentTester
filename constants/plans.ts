import type { Role } from '@prisma/client'
import type { Plan } from '@/types/plan'

export const PLANS: Record<Role, Plan> = {
  FREE: {
    maxWebhooks: 1,
    // maxRequests: 50,
    maxRequests: 250,
    autoDeleteRequestsAfterDays: 3,
    priceMonthly: 0,
    priceAnnualyBilledMonthly: 0,
    canReplayRequests: false,
  },
  PRO: {
    maxWebhooks: 10,
    maxRequests: 1000,
    autoDeleteRequestsAfterDays: 30,
    priceMonthly: 5,
    priceAnnualyBilledMonthly: 3,
    canReplayRequests: true,
  },
  ADMIN: {
    maxWebhooks: 100,
    maxRequests: 10000,
    autoDeleteRequestsAfterDays: null,
    priceMonthly: 0,
    priceAnnualyBilledMonthly: 0,
    canReplayRequests: true,
  },
}
