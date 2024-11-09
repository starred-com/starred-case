import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface JobCardProps {
  title: string
  description: string
  company: string
  isFavorite?: boolean
  isSelected?: boolean
  onFavorite?: () => void
  onApply?: () => void
  onClick?: () => void
  isDetailed?: boolean
}

export function JobCard({
  title,
  description,
  company,
  isFavorite,
  isSelected,
  onFavorite,
  onApply,
  onClick,
  isDetailed = false
}: JobCardProps) {
  return (
    <Card 
      className={cn(
        "transition-shadow hover:shadow-md cursor-pointer",
        isDetailed ? "lg:min-h-[600px]" : "",
        isSelected ? "ring-2 ring-primary" : ""
      )}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          <p className="text-sm text-muted-foreground">{company}</p>
        </div>
        <div className="flex gap-2">
          {onApply && (
            <Button variant="default" onClick={(e) => {
              e.stopPropagation();
              onApply();
            }}>
              Apply
            </Button>
          )}
          {onFavorite && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onFavorite();
              }}
              className={cn(isFavorite && "text-yellow-500")}
            >
              <Star className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
} 