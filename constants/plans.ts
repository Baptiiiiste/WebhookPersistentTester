import type { Role } from '@prisma/client'
import type { Plan } from '@/types/plan'

export const PLANS: Record<Role, Plan> = {
  FREE: {
    maxWebhooks: 1,
    maxRequests: 50,
    autoDeleteRequestsAfterDays: 3,
    price: 0,
  },
  PRO: {
    maxWebhooks: 10,
    maxRequests: 1000,
    autoDeleteRequestsAfterDays: 30,
    price: 29,
  },
  ADMIN: {
    maxWebhooks: 100,
    maxRequests: 10000,
    autoDeleteRequestsAfterDays: null,
    price: 99,
  },
}
