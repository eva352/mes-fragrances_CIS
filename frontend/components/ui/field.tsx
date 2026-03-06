'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

const FieldGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('grid gap-6', className)} {...props} />
  )
)
FieldGroup.displayName = 'FieldGroup'

const Field = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-slot="field" className={cn('grid gap-2', className)} {...props} />
  )
)
Field.displayName = 'Field'

const FieldLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn('text-sm font-medium leading-none text-foreground', className)}
    {...props}
  />
))
FieldLabel.displayName = 'FieldLabel'

const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
FieldDescription.displayName = 'FieldDescription'

type FieldErrorItem = { message?: string } | string | undefined | null

const FieldError = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & { errors?: FieldErrorItem[] }
>(({ className, errors = [], ...props }, ref) => {
  const message =
    errors.find((err) => (typeof err === 'string' ? err : err?.message)) ??
    undefined
  const content = typeof message === 'string' ? message : message?.message
  if (!content) return null
  return (
    <p
      ref={ref}
      className={cn('text-sm text-destructive', className)}
      {...props}
    >
      {content}
    </p>
  )
})
FieldError.displayName = 'FieldError'

const FieldTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-sm font-semibold leading-none text-foreground', className)}
    {...props}
  />
))
FieldTitle.displayName = 'FieldTitle'

const FieldSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center gap-3 text-xs uppercase tracking-wide text-muted-foreground', className)} {...props}>
      <div aria-hidden="true" className="h-px flex-1 bg-border" />
      <span data-slot="field-separator-content" className="rounded-full bg-card px-3 py-1 text-[0.7rem] font-medium">
        {children}
      </span>
      <div aria-hidden="true" className="h-px flex-1 bg-border" />
    </div>
  )
)
FieldSeparator.displayName = 'FieldSeparator'

export { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator, FieldTitle }
