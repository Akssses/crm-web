import ChatDetail from "@/modules/operator/chat/components/ChatDetail";
import { CHAT_ROLES } from "@/modules/operator/chat/constants/roleConfigs";

export default function SupervisorChatDetailPage() {
  return <ChatDetail role={CHAT_ROLES.SUPERVISOR} />;
}


