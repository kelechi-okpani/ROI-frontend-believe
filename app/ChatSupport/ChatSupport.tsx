"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, User, Headset, Loader2, Sparkles, CheckCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useGetChatQuery, useSendMessageMutation } from "@/store/api/chatApiSlice";
import { format } from "date-fns";



export function ChatSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // 1. Fetch Chat Data Stream
  const { data: chatData, isLoading: isChatLoading } = useGetChatQuery(undefined, {
    skip: !isOpen,
    pollingInterval: 5000, 
  });

  const chatMessages = chatData?.messages || [];
  const chatOwnerId = chatData?.userId?._id;

  const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();

  // Scroll smoothly down viewport frame when chat stack mutations fire
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
      console.error("Failed to send message execution pipeline:", error);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="mb-4 w-[360px] sm:w-[400px]"
          >
            <Card className="shadow-2xl border border-border/80 overflow-hidden flex flex-col h-[600px] rounded-2xl bg-gradient-to-b from-background to-background/95 backdrop-blur-md">
              
              {/* Dynamic Header Layout Block */}
              <CardHeader className="bg-gradient-to-r mt-[-25] from-indigo-600 to-indigo-700 p-4 flex flex-row items-center justify-between shrink-0 shadow-md">
                <div className="flex items-center gap-3 text-white">
                  <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-sm border border-white/5 shadow-inner">
                    <Headset className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold tracking-tight">Concierge Support</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                      <p className="text-[11px] font-medium opacity-90 tracking-wide">Desk Online</p>
                    </div>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white/80 hover:text-white hover:bg-white/10 h-9 w-9 rounded-xl transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </CardHeader>

              {/* Chat Thread Viewport Feed Canvas */}
              <CardContent 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/[0.2] dark:bg-zinc-950/[0.15]"
              >
                {isChatLoading ? (
                  <div className="flex flex-col items-center justify-center h-full gap-2 text-muted-foreground/70">
                    <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
                    <p className="text-xs font-medium">Syncing secure ticket line...</p>
                  </div>
                ) : chatMessages.length > 0 ? (
                  chatMessages.map((msg: any, index: number) => {
                 
                    // const isUser = msg.sender?._id === chatOwnerId;
                    const isUser = msg.senderType === "ADMIN";

                    return (
                      <React.Fragment key={msg._id || index}>
                        <div className={`flex w-full gap-3 items-start ${isUser ? "justify-end" : "justify-start"}`}>
                          
                          {/* Left Avatar Attachment (Only handles Admin incoming payloads) */}
                          {!isUser && (
                            <div className="w-8 h-8 rounded-xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/10 font-bold shadow-sm">
                              <Headset className="w-4 h-4" />
                            </div>
                          )}

                          {/* Chat Message Text Bubble Context Box */}
                          <div className={`flex flex-col max-w-[75%] ${isUser ? "items-end" : "items-start"}`}>
                            <div className={`px-4 py-3 rounded-2xl text-xs leading-relaxed shadow-sm tracking-wide ${
                              isUser 
                                ? "bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-tr-none shadow-indigo-600/10 font-normal" 
                                : "bg-background border border-border/80 text-foreground rounded-tl-none"
                            }`}>
                              <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                            </div>
                            
                            {/* Dynamic Micro Metadata Layer Mapping */}
                            <div className="flex items-center gap-1 mt-1 px-1 text-[10px] font-medium text-muted-foreground/70">
                              <span>
                                {msg.createdAt ? format(new Date(msg.createdAt), "HH:mm") : ""}
                              </span>
                              {isUser && <CheckCheck size={12} className="text-indigo-500 dark:text-indigo-400 ml-0.5" />}
                            </div>
                          </div>

                          {/* Right Avatar Attachment (Only handles Client user native messaging nodes) */}
                          {isUser && (
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-zinc-800 dark:to-zinc-900 border border-border/60 text-slate-600 dark:text-zinc-300 flex items-center justify-center shrink-0 font-bold shadow-sm">
                              <User className="w-4 h-4" />
                            </div>
                          )}

                        </div>
                      </React.Fragment>
                    );
                  })
                ) : (
                  <div className="text-center py-20 flex flex-col items-center justify-center gap-2 text-muted-foreground/60">
                    <div className="p-3 rounded-full bg-muted/60 opacity-80">
                      <MessageCircle className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-bold text-foreground">No Messages Yet</p>
                    <p className="text-xs max-w-[200px] text-muted-foreground/80 leading-normal">Have a question? Drop a message below to coordinate with support teams instantly.</p>
                  </div>
                )}
              </CardContent>

              {/* Action Form Footer Interface Matrix */}
              <CardFooter className="p-3 border-t border-border/50 bg-background/80 backdrop-blur-md shrink-0">
                <form className="flex w-full items-center gap-2" onSubmit={handleSendMessage}>
                  <div className="relative flex-1 flex items-center">
                    <Input 
                      placeholder="Type a support request query..." 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={isSending}
                      className="w-full h-11 pr-10 text-xs bg-muted/40 border-border/60 focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 transition-all rounded-xl"
                    />
                    <div className="absolute right-3 text-muted-foreground/30 pointer-events-none hidden sm:block">
                      <Sparkles size={14} />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    size="icon" 
                    className="h-11 w-11 shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md shadow-indigo-600/10 transition-all active:scale-95 disabled:opacity-40"
                    disabled={!message.trim() || isSending}
                  >
                    {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating System Core Triage Hub Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className={`h-14 w-14 rounded-2xl shadow-xl shadow-indigo-600/10 transition-all duration-300 transform hover:scale-105 active:scale-95 border ${
          isOpen 
            ? "bg-rose-500 hover:bg-rose-600 border-rose-600 text-white shadow-rose-500/10" 
            : "bg-indigo-600 hover:bg-indigo-700 border-indigo-700 text-white"
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </Button>
    </div>
  );
}