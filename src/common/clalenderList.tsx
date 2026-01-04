"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { Label } from "../components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover"
import { Button } from "../components/ui/button"
import { Calendar } from "../components/ui/calendar"
import { cn } from "../utils/utils"

interface props {
    date: Date | undefined
    setDate: React.Dispatch<React.SetStateAction<Date | undefined>>
    className?: string
}
export function CalenderList({date , setDate , className} : props) {
  const [open, setOpen] = React.useState(false)

  return (
      <div className="flex flex-col gap-3">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              className={cn(
                'w-32 justify-between font-normal',
                className
              )}
            >
              {date ? date.toLocaleDateString() : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className={cn(
            "w-auto overflow-hidden p-0",
            className
          )} align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={(date) => {
                setDate(date)
                setOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
  )
}
