'use client'

import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface CustomFileInputProps<T extends FieldValues> {
  control: Control<T>
  name: FieldPath<T>
  label: string
  accept?: string
  required?: boolean
  description?: string
}

export function CustomFileInput<T extends FieldValues>({
  control,
  name,
  label,
  accept,
  required,
  description,
}: CustomFileInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            {required && <span className="text-red-500"> *</span>}
          </FormLabel>
          <FormControl>
            <Input
              type="file"
              accept={accept}
              onChange={(e) => {
                const file = e.target.files?.[0]
                field.onChange(file)
              }}
            />
          </FormControl>
          <FormMessage />
          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  )
}
