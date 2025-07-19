import { PageLayout } from '@/components/shared/PageLayout'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Folder } from 'lucide-react'

export default async function DashboardPage() {
  return (
    <PageLayout.Root>
      <PageLayout.Icon icon={Folder} color="#3b82f6" />

      <PageLayout.Title>Dashboard Feedback</PageLayout.Title>

      <PageLayout.Description>
        Gérez et analysez tous les retours de vos utilisateurs
      </PageLayout.Description>

      <PageLayout.Content>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Feedbacks Récents</CardTitle>
              <CardDescription>
                Les derniers retours de vos utilisateurs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Contenu de votre dashboard ici...
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Statistiques</CardTitle>
              <CardDescription>Métriques et analyses</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Graphiques et données...
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions Rapides</CardTitle>
              <CardDescription>Raccourcis utiles</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Boutons d'actions...
              </p>
            </CardContent>
          </Card>
        </div>
      </PageLayout.Content>
    </PageLayout.Root>
  )
}
