'use client'

import { useGetChannels } from "@/features/channels/api/use-get-channels";
import { useCreateChannelModal } from "@/features/channels/store/use-create-channel-modal";
import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Loader, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useEffect } from "react";


function WorkspaceIdPage() {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const [open, setOpen] = useCreateChannelModal ();

  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({ id: workspaceId});
  const { data: channels, isLoading: channelsLoading } = useGetChannels({
      workspaceId,
  });
  const { data: member, isLoading: memberLoading } = useCurrentMember({ workspaceId });

const isAdmin = useMemo(() => member?.role === "admin", [member?.role])
const channelId = useMemo(() => channels?.[0]?._id, [channels]);

    useEffect(() => {
      if (workspaceLoading || channelsLoading || memberLoading || !member || !workspace) return;

      if (channelId) {
        router.push(`/workspace/${workspaceId}/channel/${channelId}`)
      } else if (!open && isAdmin) {
        setOpen(true)
      }
    }, [
      member,
      memberLoading,
      isAdmin,
      channelId, 
      workspaceLoading, 
      channelsLoading, 
      workspace,
      workspaceId,
      router,
      open,
      setOpen
    ])


    if (workspaceLoading || channelsLoading) {
      return (
        <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
          <Loader className="animate-spin size-6 text-muted-foreground" />
        </div>
      )
    }

    if (!workspace || !member) {
      return (
        <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
          <TriangleAlert className="size-6 text-muted-foreground" />
          <span className="text-sm text-muted-foreground" >Workspace not found</span>
        </div>
      )
    }



  return(
    <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
      <TriangleAlert className="size-6 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">No channel found</span>
    </div>
  );
}

export default WorkspaceIdPage;