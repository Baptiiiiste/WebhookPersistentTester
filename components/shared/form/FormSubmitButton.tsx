import type { SubmitButtonProps } from '@/components/shared/form/SubmitButton'
import { SubmitButton } from '@/components/shared/form/SubmitButton'

interface FormSubmitButtonProps extends SubmitButtonProps {
  isSubmitting: boolean
  isEditing: boolean
}

export function FormSubmitButton({
  isSubmitting,
  isEditing,
  ...rest
}: FormSubmitButtonProps) {
  return (
    <SubmitButton isSubmitting={isSubmitting} {...rest}>
      {isEditing ? 'Modifier' : 'Créer'}
    </SubmitButton>
  )
}
