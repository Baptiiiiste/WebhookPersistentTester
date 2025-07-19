import type { FieldValues, UseFormReturn } from 'react-hook-form'
import { useCallback } from 'react'
import type { FormActionCallback } from '@/types/form'

export function useFormAction<
  TInputData,
  TFieldValues extends FieldValues,
  TOutputData = undefined,
>(
  form: UseFormReturn<TFieldValues>,
  action: FormActionCallback<TInputData, TOutputData>,
): (values: TInputData) => Promise<void> {
  return useCallback(
    async function onSubmit(values: TInputData) {
      const result = await action(values)
      if (result && typeof result === 'object' && 'message' in result) {
        form.setError('root', { message: result.message })
      }
    },
    [form, action],
  )
}
