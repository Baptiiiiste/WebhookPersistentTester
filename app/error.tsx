'use client'

import { Button } from '@/components/ui/button'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h2 className="text-5xl font-bold text-primary">
        Une erreur est survenue
      </h2>
      <span>{error.message}</span>
      <Button variant="outline" onClick={() => reset()}>
        Recharger la page
      </Button>
    </div>
  )
}
