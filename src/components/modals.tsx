'use client'

import CreateChannelModal from "@/features/channels/components/create-channel-modal";
import CreateWorkspaceModal from "@/features/workspaces/components/create-workspace-modal"
import { useState, useEffect } from "react";

function Modals() {
  //the mounted state is created to prevent potential hydration errors by ensuring that the modals are rendered only when clinet side rendering is done
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null;
  return (
    <>
      <CreateChannelModal />
      <CreateWorkspaceModal />
    </>
  );
}

export default Modals