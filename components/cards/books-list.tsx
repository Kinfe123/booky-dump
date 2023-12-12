"use client";
import { useState } from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
  ArrowUpCircle,
  CheckCircle2,
  Circle,
  HelpCircle,
  Loader2Icon,
  LucideIcon,
  XCircle,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
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
    value: "inprogress",
    label: "InProgress",
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

function getIcons(value: any) {
  if (value === "done") {
    return CheckCircle2;
  }
  if (value === "inprogress") {
    return ArrowUpCircle;
  } else {
    return HelpCircle;
  }
}

export function CardPost({ book  , fetcher}: any) {
  // console.log("Books; " , book)
  const [selected, setSelected] = useState("Incompleted");
  const [open, setOpen] = useState(false);
  const [deleteLoading , setDeleteLoading] = useState(false)
  // console.log("TH book status: " , book)
  const [selectedStatus, setSelectedStatus] = useState<Status | null>({
    icon: getIcons(book.status),
    label: book.status,
    value: book.status,
  });
  const user = useUser();
  const updateBook = async (bookID , values) => {
    console.log('ttHE values: ' , values)

    const req = await fetch("/api/books", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        // id: book
        id: bookID,
        name: book.name,
        status:values,
        user_id: user.user?.id,
      }),
    });
    const res = await req.json();
    console.log('The result is: ' , res)
    fetcher()

  };
  const deleteBook = async (bookID: any) => {
    setDeleteLoading(true)
    const req = await fetch("/api/books", {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        // id: book
        id: bookID,
        name: book.name,
        status: selectedStatus?.value,
        user_id: user.user?.id,
      }),
    });
    const res = await req.json();
    fetcher()
    setDeleteLoading(false)
  
  }; 
  return (
    <Card className="font-display2 relative bg-gradient-to-br from-emerald-50/5 to-purple-100/10">
      <CardHeader>
        <CardTitle>{book.name}</CardTitle>
        <CardDescription>Book Description goes here</CardDescription>
        <div className="absolute top-[-10px] right-[10px]">
          <button onClick={() => {
            deleteBook(book.id)
          }}className="group mx-auto mt-6 flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black">
            {deleteLoading ? (
          <span className="flex gap-2">
            {" "}
            <Loader2Icon className="animate-spin w-5 h-5" />
            Deleting...{" "}
          </span>
        ) : (
          <span>Delete</span>
        )}
          </button>
        </div>
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

            <Popover open={open} onOpenChange={setOpen}>
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
                    <> + Set status</>
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
                            updateBook(book.id , value);
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
  );
}
