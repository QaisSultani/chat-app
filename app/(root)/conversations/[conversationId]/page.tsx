"use client";

import ConversationContainer from "@/components/shared/conversation/ConversationContainer";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import Header from "./_components/Header";
import Body from "./_components/body/Body";
import ChatInput from "./_components/input/ChatInput";
import RemoveFriendDialog from "./_components/dialogs/RemoveFriendDialog";
import DeleteGroupDialog from "./_components/dialogs/DeleteGroupDialog";
import LeaveGroupDialog from "./_components/dialogs/LeaveGroupDialog";

type Props = {
  params: {
    conversationId: Id<"conversations">;
  };
};

const ConversationPage = ({ params: { conversationId } }: Props) => {
  const conversation = useQuery(api.conversation.get, {
    id: conversationId,
  });

  const [removeFriendDialogOpen, setRemoveFriendDialogOpen] = useState(false);
  const [deleteGroupDialogOpen, setDeleteGroupDialogOpen] = useState(false);
  const [leaveGroupDialogOpen, setLeaveGroupDialogOpen] = useState(false);
  const [callType, setCallType] = useState<"audio" | "video" | null>(null);

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
      <RemoveFriendDialog
        conversationId={conversationId}
        open={removeFriendDialogOpen}
        setOpen={setRemoveFriendDialogOpen}
      />
      <DeleteGroupDialog
        conversationId={conversationId}
        open={deleteGroupDialogOpen}
        setOpen={setDeleteGroupDialogOpen}
      />
      <LeaveGroupDialog
        conversationId={conversationId}
        open={leaveGroupDialogOpen}
        setOpen={setLeaveGroupDialogOpen}
      />
      <Header
        name={conversation.name || conversation.otherMember?.username || ""}
        imageUrl={
          conversation.isGroup ? undefined : conversation.otherMember?.imageUrl
        }
        options={
          conversation.isGroup
            ? [
                {
                  label: "Leave group",
                  destructive: false,
                  onClick: () => {
                    setLeaveGroupDialogOpen(true);
                  },
                },
                {
                  label: "Delete group",
                  destructive: true,
                  onClick: () => {
                    setDeleteGroupDialogOpen(true);
                  },
                },
              ]
            : [
                {
                  label: "Remove Friend",
                  destructive: true,
                  onClick: () => {
                    setRemoveFriendDialogOpen(true);
                  },
                },
              ]
        }
      />
      <Body
        members={
          conversation.isGroup
            ? conversation.otherMembers
              ? conversation.otherMembers
              : []
            : conversation.otherMember
              ? [conversation.otherMember]
              : []
        }
      />
      <ChatInput />
    </ConversationContainer>
  );
};

export default ConversationPage;
