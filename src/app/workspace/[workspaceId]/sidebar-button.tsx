import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";


interface SidebarButtonProps {
    icon: LucideIcon | IconType;
    label: string;
    isActive?: boolean;
}

//icon props is mapped to Icon so as to render it as a component
function SidebarButton({ icon: Icon, label, isActive }: SidebarButtonProps) {
  return (
    <div className="cursor-pointer flex flex-col items-center gap-y-0.5 group">
      <Button variant="transparent" className={cn("size-9 p-2 group-hover:bg-accent/20", isActive && "bg-accent/20")}>
        <Icon className="size-5 text-white group-hover:scale-110 transition-all" />
      </Button>
      <span className="text-[11px] text-white group-hover:text-accent">
        {label}
      </span>
    </div>
  );
}

export default SidebarButton;



// in using shadcn, the first value in the bracket is the default css styles