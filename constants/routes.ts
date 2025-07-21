import type { SidebarLinkGroupType } from '@/types/sidebar'
import { ICONS } from '@/constants/icons'
import { PAGE_NAMES } from '@/constants/pages'
import { Role } from '@prisma/client'

export const ROUTES: Record<string, string> = {
  SIGN_IN: 'sign-in',
  SIGN_UP: 'sign-up',
  ROOT: '',
  DASHBOARD: 'dashboard',
  ADMIN: 'admin',
}

export const ACTIONS_ROUTES: Record<string, string> = {
  UPDATE: 'edit',
  CREATE: 'new',
}

export const PUBLIC_ROUTES: string[] = [ROUTES.SIGN_IN, ROUTES.ROOT]

export const SIDEBAR_LINKS: SidebarLinkGroupType[] = [
  {
    name: undefined,
    links: [
      {
        name: PAGE_NAMES.ADMIN,
        url: ROUTES.ADMIN,
        icon: ICONS.ADMIN,
        roles: [Role.ADMIN],
      },
    ],
  },
  {
    name: 'Feedbacks',
    links: [
      {
        name: PAGE_NAMES.DASHBOARD,
        url: ROUTES.DASHBOARD,
        icon: ICONS.DASHBOARD,
        roles: [Role.FREE, Role.PRO, Role.ADMIN],
      },
    ],
  },
]
