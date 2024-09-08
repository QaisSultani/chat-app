"use client";

import ConversationFallback from "@/components/shared/conversation/ConversationFallback";
import Error from "next/error";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
  error: Error;
};

const error = ({ error }: Props) => {
  const router = useRouter();

  useEffect(() => {
    router.push("/conversations");
  }, [error, router]);

  return <ConversationFallback />;
};

export default error;
