import * as React from "react"
import { Input } from "./input"
import { cn } from "@/lib/utils"
import { Search as SearchIcon } from "lucide-react"

interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative">
        <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          ref={ref}
          className={cn(
            "pl-8 bg-background border-input",
            className
          )}
          {...props}
        />
      </div>
    )
  }
)
Search.displayName = "Search"

export { Search } 