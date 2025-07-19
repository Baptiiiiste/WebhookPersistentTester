import { Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type Props = {
  href: string
}

export function EditButton({ href }: Props) {
  return (
    <Button variant="outline" asChild>
      <Link href={href}>
        <Pencil className="mr-2 size-4" />
        Modifier
      </Link>
    </Button>
  )
}
