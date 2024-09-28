/*eslint-disable @next/next/no-img-element*/

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

import { XIcon } from "lucide-react";




interface ThumbnailProps {
  url: string | undefined | null;
}

function Thumbnail({ url }: ThumbnailProps) {
  if (!url) return null;
  
    return (
      <div className="relative overflow-hidden max-w-[360px] border rounded-lg my-2 cursor-zoom-in">
        <img
          src={url}
          alt="Message image"
          className="rounded-md object-cover size-full "
        />
      </div>
    );
}

export default Thumbnail;
