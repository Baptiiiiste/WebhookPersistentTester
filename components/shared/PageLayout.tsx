import type { FC, ReactElement, ReactNode } from 'react'
import { Children, isValidElement } from 'react'
import type { LucideIcon } from 'lucide-react'

export type PageLayoutProps = {
  children: ReactNode
}

const Root: FC<PageLayoutProps> = ({ children }) => {
  const childrenArray = Children.toArray(children) as ReactElement[]

  const getChildByDisplayName = (name: string) =>
    childrenArray.find(
      (child) =>
        isValidElement(child) && (child.type as FC)?.displayName === name,
    )

  const icon = getChildByDisplayName('Icon')
  const actions = getChildByDisplayName('Actions')
  const title = getChildByDisplayName('Title')
  const description = getChildByDisplayName('Description')
  const content = getChildByDisplayName('Content')

  return (
    <div className="flex flex-col">
      <div className="border-b bg-background px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon}
            <div className="flex flex-col">
              {title}
              {description}
            </div>
          </div>
          {actions}
        </div>
      </div>
      <div className="flex-1">{content}</div>
    </div>
  )
}

const Actions: FC<PageLayoutProps> = ({ children }) => (
  <div className="flex items-center gap-2">{children}</div>
)
Actions.displayName = 'Actions'

const Icon: FC<{ icon: LucideIcon; color: string }> = ({
  icon: IconComponent,
  color,
}) => (
  <div
    className="flex h-12 w-12 items-center justify-center rounded-lg"
    style={{ backgroundColor: `${color}1A` }}
  >
    <IconComponent className="h-6 w-6" style={{ color }} />
  </div>
)
Icon.displayName = 'Icon'

Icon.displayName = 'Icon'

const Title: FC<PageLayoutProps> = ({ children }) => (
  <h1 className="text-2xl font-semibold tracking-tight">{children}</h1>
)
Title.displayName = 'Title'

const Description: FC<PageLayoutProps> = ({ children }) => (
  <p className="text-sm text-muted-foreground">{children}</p>
)
Description.displayName = 'Description'

const Content: FC<PageLayoutProps> = ({ children }) => (
  <div className="p-6">{children}</div>
)
Content.displayName = 'Content'

export const PageLayout = {
  Root,
  Actions,
  Title,
  Description,
  Content,
  Icon,
}
