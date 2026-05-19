"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MessageSquare,
  Send,
  Headphones,
  FileText,
  Plus,
  Clock,
  CheckCircle2,
} from "lucide-react";

const tickets = [
  {
    id: "TKT001",
    subject: "Withdrawal delay",
    status: "open",
    priority: "high",
    lastUpdate: "2 hours ago",
    messages: 3,
  },
  {
    id: "TKT002",
    subject: "Account verification issue",
    status: "resolved",
    priority: "medium",
    lastUpdate: "2 days ago",
    messages: 5,
  },
  {
    id: "TKT003",
    subject: "Investment plan question",
    status: "resolved",
    priority: "low",
    lastUpdate: "1 week ago",
    messages: 2,
  },
];

const chatMessages = [
  {
    id: 1,
    sender: "support",
    name: "Support Agent",
    message: "Hello! Welcome to VestFlow support. How can I help you today?",
    time: "10:00 AM",
  },
  {
    id: 2,
    sender: "user",
    name: "You",
    message: "Hi, I have a question about my withdrawal request. It's been pending for 3 days.",
    time: "10:02 AM",
  },
  {
    id: 3,
    sender: "support",
    name: "Support Agent",
    message: "I apologize for the delay. Let me check your withdrawal request. Can you please provide your withdrawal ID?",
    time: "10:03 AM",
  },
  {
    id: 4,
    sender: "user",
    name: "You",
    message: "The withdrawal ID is WD-123456",
    time: "10:05 AM",
  },
  {
    id: 5,
    sender: "support",
    name: "Support Agent",
    message: "Thank you! I found your request. It's currently being processed by our finance team. Due to high volume, there's been a slight delay. It should be completed within the next 24 hours.",
    time: "10:08 AM",
  },
];

export default function SupportPage() {
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"chat" | "tickets">("chat");

  return (
    <>
      <DashboardHeader
        title="Support"
        description="Get help from our support team"
      />

      <div className="p-6 space-y-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-border h-[calc(100vh-220px)]">
              <CardHeader className="border-b border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button
                      variant={activeTab === "chat" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setActiveTab("chat")}
                      className="gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Live Chat
                    </Button>
                    <Button
                      variant={activeTab === "tickets" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setActiveTab("tickets")}
                      className="gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      Tickets
                    </Button>
                  </div>
                  {activeTab === "tickets" && (
                    <Button size="sm" className="gap-2">
                      <Plus className="w-4 h-4" />
                      New Ticket
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-0 flex flex-col h-[calc(100%-80px)]">
                {activeTab === "chat" ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-4 border-b border-border">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-accent/10 text-accent">
                            <Headphones className="w-5 h-5" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">
                            Support Agent
                          </p>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-accent" />
                            <span className="text-xs text-muted-foreground">
                              Online
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-4">
                        {chatMessages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex gap-3 ${
                              msg.sender === "user"
                                ? "flex-row-reverse"
                                : ""
                            }`}
                          >
                            <Avatar className="w-8 h-8 shrink-0">
                              <AvatarFallback
                                className={
                                  msg.sender === "support"
                                    ? "bg-accent/10 text-accent"
                                    : "bg-primary/10 text-primary"
                                }
                              >
                                {msg.sender === "support" ? (
                                  <Headphones className="w-4 h-4" />
                                ) : (
                                  "JD"
                                )}
                              </AvatarFallback>
                            </Avatar>
                            <div
                              className={`max-w-[70%] ${
                                msg.sender === "user" ? "text-right" : ""
                              }`}
                            >
                              <div
                                className={`p-3 rounded-xl ${
                                  msg.sender === "user"
                                    ? "bg-primary text-primary-foreground rounded-tr-none"
                                    : "bg-muted text-foreground rounded-tl-none"
                                }`}
                              >
                                <p className="text-sm">{msg.message}</p>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                {msg.time}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>

                    {/* Chat Input */}
                    <div className="p-4 border-t border-border">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Type your message..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="flex-1"
                        />
                        <Button className="shrink-0">
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-4 space-y-4">
                    {tickets.map((ticket) => (
                      <div
                        key={ticket.id}
                        className="p-4 rounded-xl bg-muted/50 border border-border hover:border-primary/30 transition-colors cursor-pointer"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-medium text-foreground">
                              {ticket.subject}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {ticket.id}
                            </p>
                          </div>
                          <Badge
                            variant={
                              ticket.status === "open"
                                ? "default"
                                : "secondary"
                            }
                            className={
                              ticket.status === "open"
                                ? "bg-warning text-warning-foreground"
                                : "text-accent"
                            }
                          >
                            {ticket.status === "open" ? (
                              <Clock className="w-3 h-3 mr-1" />
                            ) : (
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                            )}
                            {ticket.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>
                            Priority:{" "}
                            <span className="capitalize">{ticket.priority}</span>
                          </span>
                          <span>{ticket.messages} messages</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Last update: {ticket.lastUpdate}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* New Ticket Form */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-base">Submit a Ticket</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Enter subject" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="deposit">Deposits</SelectItem>
                        <SelectItem value="withdrawal">Withdrawals</SelectItem>
                        <SelectItem value="investment">Investments</SelectItem>
                        <SelectItem value="account">Account</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Describe your issue..."
                      rows={4}
                    />
                  </div>
                  <Button className="w-full">Submit Ticket</Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Help */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-base">Quick Help</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-muted-foreground hover:text-foreground"
                  >
                    How do I make a deposit?
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-muted-foreground hover:text-foreground"
                  >
                    Withdrawal processing times
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-muted-foreground hover:text-foreground"
                  >
                    Understanding investment plans
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-muted-foreground hover:text-foreground"
                  >
                    Referral program guide
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
