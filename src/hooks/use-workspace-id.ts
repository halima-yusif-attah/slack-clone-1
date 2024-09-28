'use client'

import { useParams } from "next/navigation"
import { Id } from "../../convex/_generated/dataModel";


export const useWorkspaceId = () => {
    const params = useParams();
    return params.workspaceId as Id<"workspaces">;
}


//to ensure type safety for all ids in the dynamic routes for the workspaces