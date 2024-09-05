"use client";

import ConversationContainer from "@/components/shared/conversation/ConversationContainer";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import React from "react";
import Header from "./_components/Header";
import Body from "./_components/body/Body";
import ChatInput from "./_components/input/ChatInput";

type Props = {
  params: {
    conversationId: Id<"conversations">;
  };
};

const ConversationPage = ({ params: { conversationId } }: Props) => {
  const conversation = useQuery(api.conversation.get, {
    id: conversationId,
  });
  return conversation === undefined ? (
    <div className="h-full w-full flex justify-center items-center">
      <Loader2 />
    </div>
  ) : conversation === null ? (
    <p className="w-full h-full flex justify-center items-center">
      Start the Conversation Now
    </p>
  ) : (
    <ConversationContainer>
      <Header
        name={conversation.name || conversation.otherMember.username || ""}
        imageUrl={
          conversation.isGroup ? undefined : conversation.otherMember.imageUrl
        }
      />
      <Body/>
      <ChatInput />
    </ConversationContainer>
  );
};

export default ConversationPage;
