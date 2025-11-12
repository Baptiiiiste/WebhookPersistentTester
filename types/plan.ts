export type Plan = {
  maxWebhooks: number
  maxRequests: number
  autoDeleteRequestsAfterDays: number | null
  priceMonthly: number
  priceAnnualyBilledMonthly: number
  canReplayRequests: boolean
}
