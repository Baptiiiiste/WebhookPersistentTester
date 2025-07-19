'use client'

import Link from 'next/link'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { usePathname } from 'next/navigation'
import React from 'react'
import { BREADCRUMBS } from '@/constants/breadcrumbs'
import { BreadcrumbHeader } from '@/components/shared/breadcrumb/BreadcrumbHeader'

export function BreadCrumb() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)
  const filteredSegments = segments.filter((segment) => isNaN(Number(segment)))

  return (
    <BreadcrumbHeader>
      <Breadcrumb>
        <BreadcrumbList>
          {filteredSegments.map((segment, index) => {
            const href =
              '/' + segments.slice(0, segments.indexOf(segment) + 1).join('/')
            const isLast = index === filteredSegments.length - 1

            const label =
              BREADCRUMBS[`/${segment}`] ??
              BREADCRUMBS[segment] ??
              segment.charAt(0).toUpperCase() + segment.slice(1)

            return (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={href}>{label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </React.Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </BreadcrumbHeader>
  )
}
