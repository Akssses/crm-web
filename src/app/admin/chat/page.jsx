import Chat from "@/modules/operator/chat/components/Chat";
import { CHAT_ROLES } from "@/modules/operator/chat/constants/roleConfigs";

export default function AdminChatPage() {
  return <Chat role={CHAT_ROLES.ADMIN} />;
}


