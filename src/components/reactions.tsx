import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Doc, Id } from "../../convex/_generated/dataModel"
import { useCurrentMember } from "@/features/members/api/use-current-member";
import { cn } from "@/lib/utils";
import Hints from "./hints";
import { MdOutlineAddReaction } from "react-icons/md";
import EmojiPopover from "./emoji-popover";


interface ReactionProps {
    data: Array<Omit<Doc<"reactions">, "memberId"> & {
    count: number;
    memberIds: Id<"members">[]
}>,
    onChange: (value: string) => void;
}



function Reactions({
    data,
    onChange,
}: ReactionProps) {

    const workspaceId = useWorkspaceId();
    const { data: currentMember} = useCurrentMember({ workspaceId});

    const currentMemberId = currentMember?._id;

    if (data.length === 0 || !currentMemberId) { 
        return null;
    }
  return (
    <div className="flex items-center gao-1 mt-1 mb-1">
      {data.map((reaction) => (
        <Hints
          key={reaction._id}
          label={`${reaction.count} ${reaction.count === 1 ? "person" : "people"} reacted with ${reaction.value}`}
        >
          <button
            onClick={() => onChange(reaction.value)}
            className={cn(
              "h-6 px-2 rounded-full bg-slate-200/70 border border-transparent text-slate-800 flex items-center gap-x-1",
              reaction.memberIds.includes(currentMemberId) &&
                "bg-blue-100/70 border-blue-500 text-white"
            )}
          >
            {reaction.value}
            <span
              className={cn(
                "text-xs font-semibold text-muted-foreground",
                reaction.memberIds.includes(currentMemberId) && "text-blue-500"
              )}
            >
              {reaction.count}
            </span>
          </button>
        </Hints>
      ))}

      <EmojiPopover
        hint="Add reaction"
        onEmojiSelect={(emoji) => onChange(emoji)}
      >
        <button className="h-6 px-3 rounded-full bg-slate-200/70 border border-transparent hover:border-slate-500 text-slate-800 flex items-center gap-x-1">
          <MdOutlineAddReaction />
        </button>
      </EmojiPopover>
    </div>
  );
}

export default Reactions