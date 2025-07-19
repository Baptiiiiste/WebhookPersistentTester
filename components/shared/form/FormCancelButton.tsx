import { useRouter } from 'next/navigation'
import type { ButtonProps } from '@/components/ui/button'
import { Button } from '@/components/ui/button'

interface Props extends ButtonProps {
  isSubmitting: boolean
}

export function FormCancelButton({ isSubmitting, ...rest }: Props) {
  const router = useRouter()

  return (
    <Button
      onClick={() => router.back()}
      type="button"
      disabled={isSubmitting}
      variant="outline"
      {...rest}
    >
      Annuler
    </Button>
  )
}
