'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import { cn } from '@/lib/utils'

const PageTabs = TabsPrimitive.Root

const PageTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex h-9 items-stretch text-muted-foreground w-full border-b border-sidebar-border',
      className,
    )}
    {...props}
  />
))
PageTabsList.displayName = TabsPrimitive.List.displayName

const PageTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center whitespace-nowrap px-6 py-3 text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-primary border-b-2 border-b-transparent data-[state=active]:border-b-primary',
      className,
    )}
    {...props}
  />
))
PageTabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const PageTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className,
    )}
    {...props}
  >
    <div className="flex flex-col gap-4 p-4">{props.children}</div>
  </TabsPrimitive.Content>
))
PageTabsContent.displayName = TabsPrimitive.Content.displayName

export { PageTabs, PageTabsList, PageTabsTrigger, PageTabsContent }
