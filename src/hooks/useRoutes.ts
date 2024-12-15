import { usePathname } from "next/navigation"
import useConversation from "./useConversation";
import { useMemo } from "react";
import { signOut } from "next-auth/react";
import { PiChat } from "react-icons/pi";
import { LiaSearchSolid } from "react-icons/lia";
import { CiLogout } from "react-icons/ci";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(() => [
    {
      label: "Chat",
      href: "/chat",
      active: pathname === '/chat' || !!conversationId,
      icon: PiChat
    },
    {
      label: "Search",
      href: "/search",
      active: pathname === '/search',
      icon: LiaSearchSolid
    },
    {
      label: "logout",
      href: "#",
      onClick: () => signOut(),
      icon: CiLogout
    }
  ], [pathname, conversationId]);

  return routes;
}

export default useRoutes;
