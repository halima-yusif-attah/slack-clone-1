import { useCreateMessage } from "@/features/messages/api/use-create-message";
import { useGenerateUploadUrl } from "@/features/uploads/api/use-generate-upload-url";
import { useChannelId } from "@/hooks/use-channel-id";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import dynamic from "next/dynamic";
import Quill from "quill";
import { lazy, useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Id } from "../../../../../../convex/_generated/dataModel";




const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

type CreateMessageValues = {
  channelId: Id<"channels">;
  workspaceId: Id<"workspaces">;
  body: string;
  image: Id<"_storage"> | undefined;
};


interface ChatInputProps {
  placeholder: string;
}

function ChatInput({ placeholder }: ChatInputProps) {
  const [editorKey, setEditorKey] = useState(0);
  const [isPending, setIsPending] = useState(false);

  const editorRef = useRef<Quill | null>(null);
  
  const { mutate: generateUploadUrl } = useGenerateUploadUrl();
  const { mutate: createMessage } = useCreateMessage();
  
  const channelId = useChannelId();
  const workspaceId = useWorkspaceId();
 
  //  const handleSubmit = async () => {
  //    try {
  //      await mutate(
  //        { text, id: channelId },
  //        {
  //          onSuccess(id) {
  //            let textArea = containerRef.current?.querySelector("ql-editor");
  //            console.log("textArea", textArea);
  //            toast.success("message sent");
  //          },
  //          onError: () => {
  //            toast.error("message failed to be sent");
  //          },
  //        }
  //      );
  //    } finally {
  //      setText("");
  //    }
  //  };

  const handleSubmit = async ({ body, image } : {body: string, image: File | null}) => {
    
    try {
      setIsPending(true);
      editorRef?.current?.enable(false);

      const values: CreateMessageValues = {
        channelId,
        workspaceId,
        body,
        image: undefined,
      };

      if (image) {
        const url = await generateUploadUrl({}, { throwError: true });

        if (!url) {
          throw new Error ("Url not found");
        }


        const result = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": image.type },
          body: image,
        });

        if (!result.ok) {
          throw new Error("Failed to upload image");
        }

        const { storageId } = await result.json();
         
        values.image = storageId;
      
      }


      await createMessage(
        values,
        { throwError: true }
      );
      setEditorKey((prev) => prev + 1);

    } catch (error) {
      toast.error("Failed to send message")
    } finally {
      setIsPending(false);
      editorRef?.current?.enable(true);
     }

    
  }

  return (
    <div className="px-5 w-full">
      <Editor
        key={editorKey} // force re-render on key change to update Quill instance
        placeholder={placeholder}
        onSubmit={handleSubmit}
        disabled={isPending}
        innerRef={editorRef}
      />
    </div>
  );
}

export default ChatInput