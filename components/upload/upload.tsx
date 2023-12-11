import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check, ChevronsUpDown } from "lucide-react"
 
import { cn } from "@/lib/utils"

import { InputForm } from "../actual-form/forms";

const Upload = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger>Post your book</DialogTrigger>
        <DialogContent className="font-display2">
          <DialogHeader>
            <DialogTitle className="tracking-wide">Spread the knowledge with human being</DialogTitle>
            <DialogDescription>
               <InputForm />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default Upload;
