import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h2 className="text-5xl font-bold text-primary">Aucun résultat trouvé</h2>
      <span>La page que vous demandez n'existe pas</span>
      <Link href={`/${ROUTES.DASHBOARD}`}>
        <Button variant="outline">Revenir à l'accueil</Button>
      </Link>
    </div>
  )
}
