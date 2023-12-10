'use client'
import { useState } from "react"
import { ChevronDownIcon } from "@radix-ui/react-icons"
import {
    ArrowUpCircle,
    CheckCircle2,
    Circle,
    HelpCircle,
    LucideIcon,
    XCircle,
  } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils";
type Status = {
    value: string;
    label: string;
    icon: LucideIcon;
  };
  
const statuses: Status[] = [
    {
      value: "backlog",
      label: "Backlog",
      icon: HelpCircle,
    },
    {
      value: "todo",
      label: "Todo",
      icon: Circle,
    },
    {
      value: "in progress",
      label: "In Progress",
      icon: ArrowUpCircle,
    },
    {
      value: "done",
      label: "Done",
      icon: CheckCircle2,
    },
    {
      value: "canceled",
      label: "Canceled",
      icon: XCircle,
    },
  ];
  
export function CardPost() {
    const [selected , setSelected] = useState('Incompleted')
    const [open, setOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);
  
  return (
    <Card className="font-display2">
      <CardHeader>
        <CardTitle>Book Name</CardTitle>
        <CardDescription>
          Book Description goes here
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/avatars/01.png" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">Sofia Davis</p>
              <p className="text-sm text-muted-foreground">m@example.com</p>
            
            </div>
          </div>
          <div className="flex flex-end justify-end items-end">

         
          {/* <p className="text-sm text-muted-foreground">Status</p> */}
          
          <Popover open={open} onOpenChange={setOpen}  >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="w-[150px] justify-start"
              >
                {selectedStatus ? (
                  <>
                    <selectedStatus.icon className="mr-2 h-4 w-4 shrink-0" />
                    {selectedStatus.label}
                  </>
                ) : (
                  <> + {' '} Set status</>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="p-0 font-display2"
              side="right"
              align="start"
            >
              <Command>
                <CommandInput placeholder="Change status..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {statuses.map((status) => (
                      <CommandItem
                        key={status.value}
                        value={status.value}
                        onSelect={(value) => {
                          setSelectedStatus(
                            statuses.find(
                              (priority) => priority.value === value
                            ) || null
                          );
                          setOpen(false);
                        }}
                      >
                        <status.icon
                          className={cn(
                            "mr-2 h-4 w-4",
                            status.value === selectedStatus?.value
                              ? "opacity-100"
                              : "opacity-40"
                          )}
                        />
                        <span>{status.label}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          </div>
        </div>
       
      </CardContent>
    </Card>
  )
}