// app/components/ProjectCard.tsx
import { FC } from 'react'
import { Card, CardContent, CardHeader } from  './card'
import { FileText } from 'lucide-react'
import { Avatar, AvatarFallback } from './avatar'
import { Badge } from './badge'

interface ProjectCardProps {
  title: string
  description: string
}

const ProjectCard: FC<ProjectCardProps> = ({ title, description }) => {
  return (
    <Card className="group hover:border-primary/50 transition-colors">
      <CardHeader>
        <div className="flex items-start gap-2">
          <FileText className="h-6 w-6 text-primary shrink-0" />
          <div className="space-y-1 min-w-0">
            <div className="font-medium">{title}</div>
            <div className="text-sm text-muted-foreground line-clamp-2">{description}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Avatar className="h-5 w-5">
              <AvatarFallback className="text-xs">O</AvatarFallback>
            </Avatar>
            <span>Owner</span>
            <Badge variant="secondary" className="font-normal">
              私有
            </Badge>
          </div>
          <Badge variant="outline" className="font-normal">
            text-embedding-v3
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProjectCard