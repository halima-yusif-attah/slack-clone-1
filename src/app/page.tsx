"use client";

import UserButton from "@/features/auth/user-button";
import { useCreateWorkSpaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

function Home() {
  const router = useRouter();

  const [open, setOpen] = useCreateWorkSpaceModal();

  const { data, isLoading } = useGetWorkspaces();

  const workspaceId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) return;

    if (workspaceId) {
      // navigate to workspace page, the replce method prevents the user from manually returning to the previous page
      router.replace(`/workspace/${workspaceId}`);
    } else if (!open) {
      setOpen(true);
    }
  }, [workspaceId, isLoading, open, setOpen, router]);

  return (
    <div className=" size-full">
      <UserButton />
      <p>hello</p>
    </div>
  );
}

export default Home;
