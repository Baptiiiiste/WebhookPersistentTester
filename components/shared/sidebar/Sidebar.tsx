'use client'

import * as React from 'react'
import { AudioWaveform, Command, GalleryVerticalEnd } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { NavGroup } from '@/components/shared/sidebar/NavGroup'
import { NavUser } from '@/components/shared/sidebar/NavUser'
import { TeamSwitcher } from '@/components/shared/sidebar/TeamSwitcher'
import { SIDEBAR_LINKS } from '@/constants/routes'
import type { Session } from 'next-auth'
import type { SidebarLinkGroupType } from '@/types/sidebar'

const data = {
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
}

export function CustomSidebar({
  session,
  ...props
}: React.ComponentProps<typeof Sidebar> & { session: Session }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
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
      <SidebarFooter>
        <NavUser session={session} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
