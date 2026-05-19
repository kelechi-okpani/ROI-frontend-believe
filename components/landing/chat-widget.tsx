"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Headphones } from "lucide-react";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg"
        size="icon"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-50 w-80 md:w-96 shadow-2xl animate-in slide-in-from-bottom-5">
          <CardHeader className="bg-primary text-primary-foreground rounded-t-lg pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-base">Live Support</CardTitle>
                <p className="text-xs text-primary-foreground/80">
                  We typically reply within minutes
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-64 bg-muted/50 rounded-lg mb-4 p-4 overflow-y-auto">
              {/* Sample messages */}
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Headphones className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-card rounded-lg rounded-tl-none p-3 border border-border">
                    <p className="text-sm text-foreground">
                      Hi there! Welcome to VestFlow. How can I help you today?
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
              />
              <Button size="icon" className="shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
