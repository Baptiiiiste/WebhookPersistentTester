'use client'

import { FormCancelButton } from '@/components/shared/form/FormCancelButton'
import { FormSubmitButton } from '@/components/shared/form/FormSubmitButton'
import { useFormState } from 'react-hook-form'

export interface FormActionsProps {
  isEditing: boolean
}

export function FormActions({ isEditing }: FormActionsProps) {
  const { isSubmitting } = useFormState()

  return (
    <div className="mt-4 flex items-center justify-end gap-4">
      <FormCancelButton isSubmitting={isSubmitting} />
      <FormSubmitButton isSubmitting={isSubmitting} isEditing={isEditing} />
    </div>
  )
}
