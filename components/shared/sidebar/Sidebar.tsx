'use client'

import * as React from 'react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar'
import { NavGroup } from '@/components/shared/sidebar/NavGroup'
import { NavUser } from '@/components/shared/sidebar/NavUser'
import { SIDEBAR_LINKS } from '@/constants/routes'
import type { Session } from 'next-auth'
import type { SidebarLinkGroupType } from '@/types/sidebar'
import { Role } from '@prisma/client'
import { UpgradePlanButton } from '@/components/shared/button/UpgradePlanButton'
import { IMAGES } from '@/constants/images'
import Image from 'next/image'
import { SITENAME } from '@/constants/globals'

export function CustomSidebar({
  session,
  ...props
}: React.ComponentProps<typeof Sidebar> & { session: Session }) {
  const { state } = useSidebar()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex flex-row items-center font-medium">
        <Image src={IMAGES.LOGO} alt="Logo" width={48} height={48} />
        {SITENAME}
      </SidebarHeader>
      <SidebarContent>
        {SIDEBAR_LINKS.map((group: SidebarLinkGroupType) => (
          <NavGroup
            pages={group.links}
            title={group.name}
            session={session}
            key={group.name + Math.random().toString(36).substring(7)}
          />
        ))}
      </SidebarContent>
      <SidebarFooter className="space-y-4">
        {session.user.role === Role.FREE &&
          (state === 'expanded' ? (
            <UpgradePlanButton size="default" />
          ) : (
            <UpgradePlanButton size="icon" />
          ))}

        <NavUser session={session} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
