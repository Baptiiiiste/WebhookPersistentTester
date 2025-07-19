import { auth } from '@/lib/auth/handlers'
import type { PropsWithChildren } from 'react'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { CustomSidebar } from '@/components/shared/sidebar/Sidebar'
import { redirect } from 'next/navigation'
import { ROUTES } from '@/constants/routes'

export default async function RootLayout({ children }: PropsWithChildren) {
  const session = await auth()
  if (!session) {
    redirect(ROUTES.SIGN_IN)
  }

  return (
    <SidebarProvider>
      <CustomSidebar session={session} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
