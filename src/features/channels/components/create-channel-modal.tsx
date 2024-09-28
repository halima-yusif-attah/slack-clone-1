import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCreateChannelModal } from "../store/use-create-channel-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useCreateChannel } from "../api/use-create-channel";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


function CreateChannelModal() {
    const workspaceId = useWorkspaceId();
    const router = useRouter();

    const [open, setOpen] = useCreateChannelModal();
    const [name, setName] = useState("");

    const { mutate, isPending } = useCreateChannel();

     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
       e.preventDefault();

       try {
            await mutate(
           { name, workspaceId },
           {
              onSuccess(id) {
               //Redirect to that workspace id
                toast.success("New channel has been created.");
                router.push(`/workspace/${workspaceId}/channel/${id}`);
                handleClose();
              },
             onError: () => {
               // show toast error
               toast.error("Failed to create channel.");
             },
             onSettled() {
               //Reset the form
             },
           }
         );
       } catch (error) {}
     };

    const handleClose = () => {
        setName("");
        setOpen(false);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\s+/g, "-").toLowerCase();
        setName(value);
    }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a channel</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            value={name}
            disabled={isPending}
            onChange={handleChange}
            required
            autoFocus
            minLength={3}
            maxLength={80}
            placeholder="e.g. plan-budget "
          />

          <div className="flex justify-end">
            <Button disabled={isPending}>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateChannelModal;
