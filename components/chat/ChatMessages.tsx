"use client";

import { Member } from "@prisma/client";
import { FC } from "react";
import ChatWelcome from "./ChatWelcome";

interface ChatMessagesProps {
  name: string;
  member: Member;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
  type: "channel" | "conversation";
}

const ChatMessages: FC<ChatMessagesProps> = ({
  name,
  apiUrl,
  member,
  chatId,
  type,
  paramKey,
  paramValue,
  socketUrl,
  socketQuery,
}) => {
  return (
    <div className="flex flex-1 flex-col overflow-y-auto py-4">
      <div className="flex-1" />
      <ChatWelcome type={type} name={name} />
    </div>
  );
};

export default ChatMessages;
