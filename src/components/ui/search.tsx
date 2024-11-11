import * as React from "react"
import { Input } from "./input"
import { cn } from "@/lib/utils"
import { Search as SearchIcon, X } from "lucide-react"
import { Button } from "./button"

interface SearchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange: (value: string) => void;
  onClear?: () => void;
}

const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  ({ className, value, onChange, onClear, ...props }, ref) => {
    const showHelper = typeof value === 'string' && value.length > 0 && value.length < 2;

    return (
      <div className="relative">
        <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          ref={ref}
          className={cn(
            "pl-8 pr-8 bg-background border-input",
            className
          )}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          {...props}
        />
        {value && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1 h-7 w-7"
            onClick={onClear}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        {showHelper && (
          <p className="absolute -bottom-6 left-0 text-sm text-muted-foreground">
            Please enter at least 2 characters to search
          </p>
        )}
      </div>
    )
  }
)
Search.displayName = "Search"

export { Search } 