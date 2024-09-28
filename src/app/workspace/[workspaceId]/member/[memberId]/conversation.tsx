import { useMemberId } from "@/hooks/use-member-id";
import { Id } from "../../../../../../convex/_generated/dataModel"
import { useGetMember } from "@/features/members/api/use-get-member";
import { useGetMessages } from "@/features/messages/api/use-get-messages";
import { AlertTriangle, Loader } from "lucide-react";
import Header from "./header";
import ChatInput from "./chat-input";
import MessageList from "@/components/message-list";
import { usePanel } from "@/hooks/use-panel";


interface ConversationProps {
    id: Id<"conversations">
}

function Conversation({ id }: ConversationProps) {
  const memberId = useMemberId();

  const { onOpenProfile } = usePanel();

  const { data: member, isLoading: memberLoading } = useGetMember({ id: memberId });
  const { results, status, loadMore } = useGetMessages({
    conversationId: id
  })


  if (memberLoading || status === "LoadingFirstPage") {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!member) {
    return (
      <div className="h-full flex flex-col gap-y-2 items-center justify-center">
        <AlertTriangle className="size-6 text-muted-foreground" />
        <span className="test-sm text-muted-foreground">
          Conversation not found
        </span>
      </div>
    );
  }

    
    return (
      <div className="flex flex-col h-full">
        <Header
          memberName={member?.user.name}
          memberImage={member?.user.image}
          onClick={() => onOpenProfile(member._id)}
        />

        <MessageList
          memberName={member?.user.name}
          memberImage={member?.user.image}
          loadMore={loadMore}
          isLoadingMore={status === "LoadingMore"}
          canLoadMore={status === "CanLoadMore"}
          data={results}
          variant="conversation"
        />

        <ChatInput
          placeholder={`Message ${member?.user.name}`}
          conversationId={id}
        />
      </div>
    );
}
 
export default Conversation