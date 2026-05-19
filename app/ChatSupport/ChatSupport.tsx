"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  User,
  Headset,
  Loader2,
  Sparkles,
  CheckCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  useGetChatQuery,
  useSendMessageMutation,
} from "@/store/api/chatApiSlice";
import { format } from "date-fns";

export function ChatSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: chatData, isLoading: isChatLoading } =
    useGetChatQuery(undefined, {
      skip: !isOpen,
      pollingInterval: 5000,
    });

  const chatMessages = chatData?.messages || [];
  const chatOwnerId = chatData?.userId?._id;

  const [sendMessage, { isLoading: isSending }] =
    useSendMessageMutation();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatMessages, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isSending) return;

    try {
      await sendMessage({ text: message }).unwrap();
      setMessage("");
    } catch (error) {
      console.error("Message send failed:", error);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">

      {/* CHAT WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="mb-4 w-[360px] sm:w-[400px]"
          >
            <Card className="flex flex-col h-[600px] rounded-2xl overflow-hidden border border-zinc-900 bg-black/50 backdrop-blur-xl shadow-2xl">

              {/* HEADER */}
              <CardHeader className="bg-black/50 mt-[-25] border-b border-zinc-900 p-4 flex flex-row items-center justify-between">
                <div className="flex items-center gap-3 text-white">
                  <div className="p-2.5 bg-white/5 rounded-xl border border-white/10">
                    <Headset className="w-5 h-5 text-white" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-white">
                      Tesla Concierge
                    </p>

                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 bg-[#E82127] rounded-full animate-pulse" />
                      <p className="text-[11px] text-zinc-400">
                        Online Support System
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white/80 hover:text-white hover:bg-white/10 h-9 w-9 rounded-xl"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </CardHeader>

              {/* CHAT BODY */}
              <CardContent
                ref={scrollRef}
                className="flex-1 mt-[-25] mb-[-25] overflow-y-auto p-5 space-y-6 bg-black/50"
              >
                {isChatLoading ? (
                  <div className="flex flex-col items-center justify-center h-full gap-2 text-zinc-400">
                    <Loader2 className="w-6 h-6 animate-spin text-[#E82127]" />
                    <p className="text-xs">
                      Syncing support system...
                    </p>
                  </div>
                ) : chatMessages.length > 0 ? (
                  chatMessages.map((msg: any, index: number) => {
                    const isUser =
                      msg.senderType === "ADMIN";

                    return (
                      <div
                        key={msg._id || index}
                        className={`flex w-full gap-3 ${
                          isUser
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >

                        {/* ADMIN AVATAR */}
                        {!isUser && (
                          <div className="w-8 h-8 rounded-xl bg-white/5 border border-zinc-800 flex items-center justify-center">
                            <Headset className="w-4 h-4 text-zinc-300" />
                          </div>
                        )}

                        {/* MESSAGE */}
                        <div className="flex flex-col max-w-[75%]">

                          <div
                            className={`px-4 py-3 rounded-2xl text-xs leading-relaxed ${
                              isUser
                                ? "bg-gradient-to-br from-[#E82127] to-[#b5161c] text-white rounded-tr-none shadow-red-500/20"
                                : "bg-black/60 border border-zinc-800 text-white rounded-tl-none"
                            }`}
                          >
                            <p className="whitespace-pre-wrap break-words">
                              {msg.text}
                            </p>
                          </div>

                          <div className="flex items-center gap-1 mt-1 text-[10px] text-zinc-500">
                            <span>
                              {msg.createdAt
                                ? format(
                                    new Date(msg.createdAt),
                                    "HH:mm"
                                  )
                                : ""}
                            </span>

                            {isUser && (
                              <CheckCheck
                                size={12}
                                className="text-[#E82127]"
                              />
                            )}
                          </div>
                        </div>

                        {/* USER AVATAR */}
                        {isUser && (
                          <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                            <User className="w-4 h-4 text-zinc-300" />
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-20 text-zinc-500">
                    <MessageCircle className="w-6 h-6 mx-auto mb-2" />
                    <p className="text-sm text-white">
                      No Messages Yet
                    </p>
                    <p className="text-xs">
                      Start a conversation with support
                    </p>
                  </div>
                )}
              </CardContent>

              {/* INPUT */}
              <CardFooter className="p-3 border-t mb-[-25] border-zinc-900 bg-black/80">
                <form
                  onSubmit={handleSendMessage}
                  className="flex w-full items-center gap-2"
                >
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) =>
                        setMessage(e.target.value)
                      }
                      disabled={isSending}
                      className="h-11 text-xs bg-black/40 border border-zinc-800 text-white focus-visible:ring-2 focus-visible:ring-[#E82127]/30 rounded-xl pr-10"
                    />

                    <Sparkles className="absolute right-3 top-3 w-4 h-4 text-zinc-600" />
                  </div>

                  <Button
                    type="submit"
                    size="icon"
                    disabled={!message.trim() || isSending}
                    className="h-11 w-11 bg-[#E82127] hover:bg-[#c81e1e] text-white rounded-xl shadow-red-500/20"
                  >
                    {isSending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOAT BUTTON */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className={`h-14 w-14 rounded-2xl border transition-all duration-300 transform hover:scale-105 active:scale-95 ${
          isOpen
            ? "bg-[#E82127] hover:bg-[#c81e1e] border-[#E82127] text-white shadow-red-500/30"
            : "bg-black hover:bg-zinc-900 border-zinc-800 text-white shadow-black/40"
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </Button>
    </div>
  );
}