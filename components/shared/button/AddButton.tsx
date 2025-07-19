import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function AddButton() {
  return (
    <Button variant="default">
      <Plus className="mr-2 size-4" />
      Nouveau
    </Button>
  )
}
