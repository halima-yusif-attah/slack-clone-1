import UserButton from '@/features/auth/user-button';
import WorkspaceSwitcher from './workspace-switcher';
import SidebarButton from './sidebar-button';
import { MessageSquare, Bell, Home, MoreHorizontal } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useWorkspaceId } from '@/hooks/use-workspace-id';


function Sidebar() {
  const workspaceId = useWorkspaceId();
  

  const pathname = usePathname();
  
  const isWorkspaceActive = pathname.includes(`/workspace/${workspaceId}/channel`)
  const isMemberActive = pathname.startsWith(`/workspace/${workspaceId}/member`);
  


  return (
    <aside className="w-[70px] bg-[#481349] h-full flex flex-col gap-y-4 items-center pt-[9px] pb-4 ">
      <WorkspaceSwitcher />
      <SidebarButton icon={Home} label="Home" isActive={isWorkspaceActive} />
      <SidebarButton
        icon={MessageSquare}
        label="DMs"
        isActive={isMemberActive}
      />

      <SidebarButton icon={Bell} label="Activity" />
      <SidebarButton icon={MoreHorizontal} label="More" />
      <div className="mt-auto flex flex-col items-center justify-center gap-y-1">
        <UserButton />
      </div>
    </aside>
  );
}

export default Sidebar