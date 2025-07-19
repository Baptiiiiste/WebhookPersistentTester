'use client'
import type { ComponentProps, HTMLInputTypeAttribute } from 'react'
import React from 'react'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

interface CustomInputProps<T extends FieldValues> {
  control: Control<T>
  name: FieldPath<T>
  label: string
  placeholder: string
  type?: HTMLInputTypeAttribute
  accept?: string
  disabled?: boolean
  required?: boolean
  description?: string
  className?: string
  inputProps?: Omit<
    ComponentProps<typeof Input>,
    | 'placeholder'
    | 'type'
    | 'accept'
    | 'name'
    | 'onChange'
    | 'onBlur'
    | 'disabled'
  >
}

export function CustomInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = 'text',
  accept,
  disabled,
  required,
  description,
  className,
  inputProps,
}: CustomInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>
            {label}
            {required && <span className="text-red-500"> *</span>}
          </FormLabel>
          <FormControl>
            <Input
              {...inputProps}
              placeholder={placeholder}
              type={type}
              accept={accept}
              {...field}
              disabled={disabled ?? field.disabled}
              autoComplete="off"
            />
          </FormControl>
          <FormMessage />
          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  )
}
