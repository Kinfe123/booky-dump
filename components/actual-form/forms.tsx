"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  ArrowUpCircle,
  CheckCircle2,
  Circle,
  HelpCircle,
  LucideIcon,
  Loader2Icon,
  XCircle,
} from "lucide-react";
import { DialogClose } from "../ui/dialog";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { spawn } from "child_process";
import { useClerk, useUser } from "@clerk/nextjs";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  status: z.boolean(),
});

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
    value: "completed",
    label: "Completed",
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

export function InputForm() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);
  const user = useUser();
  const clerk = useClerk();
  if (!user.isSignedIn) {
    clerk.openSignUp();
    clerk.redirectToSignIn();
  }
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("The selected values : ", data, " and ", selectedStatus?.value);
  }
  const createBooks = async () => {
    const fetcher = await fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: name,
        status: selectedStatus?.value,
        user_id: user.user?.id,
      }),
    });
    const resp = await fetcher.json();

    return resp;
  };

  async function handleClicks(e) {
    setLoading(true);

    const res = await createBooks();

    setLoading(false);
    if (res[0].id) {
      return toast({
        title: "You submitted the following values:",
        description: "You have successfully created a book called something ",
        variant: "default",
      });
    } else {
      return toast({
        title: "Failed Posting The Book:",
        description: "You have failed request on creating the book ",
        variant: "destructive",
      });
    }
  }

  return (
    <form>
      <div className="w-2/3 space-y-6">
        <Input
          placeholder="De javu"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div>
          <p className="text-sm text-muted-foreground">Status</p>
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
                  <>+- Set status</>
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
        {/* <DialogClose asChild> */}

        <Button onClick={handleClicks} type="submit">
          {loading ? (
            <span className="flex gap-2">
              {" "}
              <Loader2Icon className="animate-spin w-5 h-5" />
              Submitting{" "}
            </span>
          ) : (
            <span>Submit</span>
          )}
        </Button>
        {/* </DialogClose> */}
      </div>
    </form>
  );
}
