import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function DeleteButton() {
  return (
    <Button variant="destructive">
      <Trash2 className="mr-2 size-4" />
      Supprimer
    </Button>
  )
}
