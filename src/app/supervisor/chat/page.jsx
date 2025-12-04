import Chat from "@/modules/operator/chat/components/Chat";
import { CHAT_ROLES } from "@/modules/operator/chat/constants/roleConfigs";

export default function SupervisorChatPage() {
  return <Chat role={CHAT_ROLES.SUPERVISOR} />;
}


