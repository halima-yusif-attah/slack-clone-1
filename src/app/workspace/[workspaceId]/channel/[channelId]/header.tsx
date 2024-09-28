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


import { Button } from '@/components/ui/button';
import React, { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa';
import { TrashIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useChannelId } from "@/hooks/use-channel-id";
import { useUpdateChannel } from "@/features/channels/api/use-update-channel";
import { toast } from "sonner";
import { useRemoveChannel } from "@/features/channels/api/use-remove-channel";
import UseConfirm from "@/hooks/use-confirm";
import { useRouter } from "next/navigation";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useCurrentMember } from "@/features/members/api/use-current-member";

interface HeaderProps {
    title: string;
}

function Header({ title } : HeaderProps) {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const channelId = useChannelId();
  const [ConfirmDialog, confirm] = UseConfirm(
    "Delete this channel?",
    "You are about to delete this channel. This action is irrevisible"
  );

  const [value, setValue] = useState(title);
  const [editOpen, setEditOpen] = useState(false);
  
  const {data: member } = useCurrentMember({ workspaceId });
  const { mutate: updateChannel, isPending: isupdatingChannel } = useUpdateChannel();
  const { mutate: removeChannel, isPending: isRemovingChannel } = useRemoveChannel();

  
  const handleEditOpen = (value: boolean) => {
    if (member?.role !== "admin") return;

    setEditOpen(value)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, "-").toLowerCase();
    setValue(value);
  };

  const handleClose = () => {
    setValue("");
    setEditOpen(false);
  }

  const handleDelete = async () => {
    const ok = await confirm();

    if (!ok) return;

    removeChannel({ id: channelId }, {
        onSuccess: () => {
            toast.success("Channel deleted successfully");
            router.push(`/workspace/${workspaceId}`);
        },
        onError: () => {
            toast.error("Failed to delete channel")
        }
    })

  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await updateChannel(
        { name: value, id: channelId },
        {
          onSuccess(id) {
            //Redirect to that workspace id
            toast.success("Channel name renamed");
            // router.push(`/workspace/${workspaceId}/channel/${id}`);
            handleClose();
          },
          onError: () => {
            // show toast error
            toast.error("Failed to rename channel.");
          },
          onSettled() {
            //Reset the form
          },
        }
      );
    } catch (error) {}
  };



    return (
      <div className="bg-white border-b h-[49px] flex items-center px-4 overflow-hidden">
        <ConfirmDialog />
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="text-lg font-semibold px-2 overflow-hidden w-auto"
            >
              <span className="truncate"># {title} </span>
              <FaChevronDown className="size-2.5 ml-2" />
            </Button>
          </DialogTrigger>

          <DialogContent className="p-0 bg-gray-50 overflow-hidden">
            <DialogHeader className="p-4 border-b bg-white">
              <DialogTitle># {title}</DialogTitle>
            </DialogHeader>

            <div className="px-4 pb-4 flex flex-col gap-y-2">
              <Dialog open={editOpen} onOpenChange={handleEditOpen}>
                <DialogTrigger asChild>
                  <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">Channel name</p>
                      {member?.role === "admin" && (
                      <p className="text-sm text-[#1264a3] hover:underline fint-semibold">
                        Edit
                      </p>
                      )}
                    </div>
                    <p className="text-sm"># {title}</p>
                  </div>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Rename this channel</DialogTitle>
                  </DialogHeader>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      value={value}
                      disabled={isupdatingChannel}
                      onChange={handleChange}
                      required
                      autoFocus
                      minLength={3}
                      maxLength={80}
                      placeholder="e.g. plan-budget"
                    />
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline" disabled={isupdatingChannel}>
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button disabled={isupdatingChannel}>Save</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              {member?.role === "admin" && (
              <button
                onClick={handleDelete}
                disabled={isRemovingChannel}
                className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg cursor-pointer border hover:bg-gray-50 text-rose-600"
              >
                <TrashIcon className="size-4" />
                <p className="text-sm font-semibold">Delete channel</p>
              </button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
}

export default Header