// 'use client'

// import { useState, useRef, useEffect } from 'react'
// import { Card } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { 
//   Search, 
//   Send, 
//   Loader2, 
//   ArrowLeft, 
//   MessageSquare, 
//   Paperclip, 
//   Archive, 
//   ShieldAlert,
//   Inbox
// } from 'lucide-react'
// import { 
//   useGetAdminInboxQuery, 
//   useSendAdminReplyMutation, 
//   useGetAdminSingleChatQuery 
// } from '@/store/api/admin/chatListApiSlice'

// export default function AdminChatLayout() {
//   // Inbox Master Query Stream
//   const { data: inboxThreads = [], isLoading: isInboxLoading, isError: isInboxError } = useGetAdminInboxQuery()
  
//   // Interactivity States
//   const [activeThreadId, setActiveThreadId] = useState<string | null>(null)
//   const [searchTerm, setSearchTerm] = useState('')
//   const [typedMessage, setTypedMessage] = useState('')
//   const messagesEndRef = useRef<HTMLDivElement | null>(null)

//   // Polled Detail Query for active thread instance details
//   const { 
//     data: singleThread, 
//     isFetching: isThreadFetching, 
//     isError: isThreadError 
//   } = useGetAdminSingleChatQuery(activeThreadId!, {
//     skip: !activeThreadId,
//     pollingInterval: 8000 
//   })

//   // Mutation Handlers
//   const [sendReply, { isLoading: isSending }] = useSendAdminReplyMutation()

//   // Auto Scroll down frame on message mount variations
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
//   }, [singleThread?.messages?.length, isThreadFetching])

//   // Filter Inbox streams dynamically via name matching matrix arrays
//   const filteredThreads = inboxThreads?.filter(thread => {
//     if (!thread) return false
//     const fullName = `${thread.userId?.firstName || ''} ${thread.userId?.lastName || ''}`.toLowerCase()
//     const email = (thread.userId?.email || '').toLowerCase()
//     return fullName.includes(searchTerm.toLowerCase()) || email.includes(searchTerm.toLowerCase())
//   }) || []

//   // Send message processing pipeline
//   const handleMessageDispatch = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!activeThreadId || !typedMessage.trim() || isSending) return

//     const backupText = typedMessage
//     setTypedMessage('')

//     try {
//       await sendReply({
//         id: activeThreadId,
//         messageText: backupText.trim(),
//         attachments: [] 
//       }).unwrap()
//     } catch (err) {
//       console.error("Failed writing support communication line matrix:", err)
//       setTypedMessage(backupText) 
//     }
//   }

//   return (
//     <Card className="w-full h-[calc(100vh-140px)] min-h-[500px] block md:grid md:grid-cols-[320px_1fr] lg:grid-cols-[360px_1fr] overflow-hidden border shadow-sm bg-background">
      
//       {/* 1. Left Inbox Sidebar */}
//       <div className={`w-full h-full border-r flex flex-col bg-muted/10 min-w-0 ${
//         activeThreadId ? 'hidden md:flex' : 'flex'
//       }`}>
//         {/* Sidebar Search Bar Header */}
//         <div className="p-4 border-b bg-background space-y-3 shrink-0">
//           <div>
//             <h1 className="text-base font-bold tracking-tight text-foreground flex items-center gap-2">
//               <Inbox size={16} className="text-blue-600" /> Support Desk
//             </h1>
//             <p className="text-[11px] text-muted-foreground mt-0.5">Manage user incoming issues triage channels.</p>
//           </div>
//           <div className="relative">
//             <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
//             <Input 
//               placeholder="Filter by client name/email..." 
//               className="pl-9 h-9 text-xs bg-muted/30 focus-visible:ring-1"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Thread Stream Scroll Container */}
//         <div className="flex-1 overflow-y-auto divide-y divide-border/60 min-h-0 bg-background">
//           {isInboxLoading && (
//             <div className="p-8 text-center text-xs text-muted-foreground flex flex-col items-center justify-center gap-2">
//               <Loader2 className="animate-spin text-blue-600" size={16} />
//               <span>Syncing central support node desk...</span>
//             </div>
//           )}

//           {isInboxError && (
//             <div className="p-6 text-center text-xs text-destructive font-medium flex items-center gap-2 justify-center bg-red-500/5">
//               <ShieldAlert size={14} /> Failed loading inbox thread list.
//             </div>
//           )}

//           {!isInboxLoading && filteredThreads.length === 0 && (
//             <div className="p-8 text-center text-xs text-muted-foreground space-y-1">
//               <MessageSquare className="mx-auto text-muted-foreground/30 mb-1" size={20} />
//               <p className="font-medium text-foreground">No channels detected</p>
//               <p className="text-[10px]">Active parameters matching query buffer clean.</p>
//             </div>
//           )}

//           {filteredThreads.map((thread) => {
//             if (!thread?._id) return null
//             const isActive = thread._id === activeThreadId
//             const clientName = `${thread.userId?.firstName || 'Client'} ${thread.userId?.lastName || ''}`.trim()
            
//             return (
//               <button
//                 key={thread._id}
//                 type="button"
//                 onClick={() => setActiveThreadId(thread._id)}
//                 className={`w-full p-4 text-left transition-all flex gap-3 items-start relative select-none border-b border-border/40 dynamic-chat-row ${
//                   isActive ? 'bg-blue-600/5 dark:bg-blue-600/10 border-l-4 border-l-blue-600 pl-3' : 'hover:bg-muted/50 bg-background'
//                 }`}
//               >
//                 {/* Fallback Initial Avatar */}
//                 <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-xs text-slate-600 dark:text-slate-300 shrink-0 uppercase">
//                   {clientName.substring(0, 2)}
//                 </div>

//                 {/* Meta details preview layout */}
//                 <div className="flex-1 min-w-0 space-y-0.5">
//                   <div className="flex items-center justify-between gap-2">
//                     <span className="font-semibold text-xs text-foreground truncate">
//                       {clientName}
//                     </span>
//                     <span className="text-[10px] text-muted-foreground whitespace-nowrap">
//                       {thread.lastMessageAt ? new Date(thread.lastMessageAt).toLocaleDateString(undefined, {month: 'short', day: 'numeric'}) : ''}
//                     </span>
//                   </div>
//                   <p className="text-xs text-muted-foreground truncate">
//                     {thread.userId?.email || 'No email profile channel'}
//                   </p>
//                 </div>
//               </button>
//             )
//           })}
//         </div>
//       </div>

//       {/* 2. Right Chat Workspace Engine */}
//       <div className={`h-full flex flex-col bg-background min-w-0 ${
//         !activeThreadId ? 'hidden md:flex' : 'flex'
//       }`}>
//         {activeThreadId ? (
//           <div className="flex flex-col h-full w-full min-w-0">
//             {/* Active Thread Context Header layout */}
//             <div className="p-4 border-b flex items-center justify-between bg-background z-10 shrink-0">
//               <div className="flex items-center gap-3 min-w-0">
//                 <Button 
//                   variant="ghost" 
//                   size="icon" 
//                   className="md:hidden h-8 w-8 shrink-0" 
//                   onClick={() => setActiveThreadId(null)}
//                 >
//                   <ArrowLeft size={16} />
//                 </Button>
                
//                 <div className="min-w-0">
//                   <h2 className="font-bold text-sm text-foreground truncate">
//                     {singleThread?.userId ? `${singleThread.userId.firstName} ${singleThread.userId.lastName}` : 'Resolving User Profile...'}
//                   </h2>
//                   <p className="text-xs text-muted-foreground truncate">
//                     {singleThread?.userId?.email || 'Connecting secure payload infrastructure'}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-1.5">
//                 {isThreadFetching && <Loader2 size={14} className="animate-spin text-blue-600" />}
//                 <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" title="Archive Stream">
//                   <Archive size={15} />
//                 </Button>
//               </div>
//             </div>

//             {/* Core Message stream viewport container block */}
//             <div className="flex-1 overflow-y-auto p-4 bg-muted/10 space-y-3 flex flex-col min-h-0">
//               {isThreadError && (
//                 <div className="p-3 text-center text-xs bg-red-500/10 text-red-600 rounded-lg max-w-sm mx-auto font-semibold">
//                   Error parsing message payloads from target thread matrix.
//                 </div>
//               )}

//               {singleThread?.messages?.map((msg, index) => {
//                 const isAdmin = msg.senderType === 'ADMIN'
                
//                 return (
//                   <div key={msg._id || index} className={`flex w-full flex-col ${
//                     isAdmin ? 'items-end' : 'items-start'
//                   }`}>
//                     <div className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-2.5 text-xs font-medium shadow-sm leading-relaxed ${
//                       isAdmin 
//                         ? 'bg-blue-600 text-white rounded-tr-none' 
//                         : 'bg-background border text-foreground rounded-tl-none'
//                     }`}>
//                       <p className="whitespace-pre-wrap break-words">{msg.text}</p>
//                     </div>
//                     <span className="text-[9px] font-medium text-muted-foreground mt-1 px-1">
//                       {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString(undefined, {hour: '2-digit', minute:'2-digit'}) : ''}
//                     </span>
//                   </div>
//                 )
//               })}
              
//               <div ref={messagesEndRef} />
//             </div>

//             {/* Input Action Form Subtext Control segment layout */}
//             <div className="p-4 bg-background border-t shrink-0">
//               <form onSubmit={handleMessageDispatch} className="flex gap-2 items-center">
//                 <Button 
//                   type="button" 
//                   variant="outline" 
//                   size="icon" 
//                   className="h-10 w-10 rounded-full shrink-0 hover:bg-muted"
//                   title="Attach asset files matrix"
//                 >
//                   <Paperclip size={15} className="text-muted-foreground" />
//                 </Button>
                
//                 <Input 
//                   value={typedMessage}
//                   onChange={(e) => setTypedMessage(e.target.value)}
//                   placeholder="Type an official admin resolution reply..."
//                   className="flex-1 h-10 text-xs bg-muted/20 focus-visible:ring-1 focus-visible:ring-blue-600"
//                   disabled={isSending}
//                 />

//                 <Button 
//                   type="submit" 
//                   size="icon"
//                   disabled={!typedMessage.trim() || isSending}
//                   className="h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white shrink-0 flex items-center justify-center transition-all disabled:opacity-40 shadow-sm"
//                 >
//                   {isSending ? <Loader2 size={15} className="animate-spin" /> : <Send size={14} />}
//                 </Button>
//               </form>
//             </div>
//           </div>
//         ) : (
//           <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-muted/5 h-full">
//             <div className="h-14 w-14 rounded-full bg-blue-600/5 text-blue-600 flex items-center justify-center mb-3 border border-blue-600/10">
//               <MessageSquare size={24} />
//             </div>
//             <h3 className="font-bold text-base text-foreground">No Conversation Selected</h3>
//             <p className="text-xs text-muted-foreground max-w-xs mt-1">
//               Select an open client operational communication thread from the side ledger index to start resolving requests.
//             </p>
//           </div>
//         )}
//       </div>

//     </Card>
//   )
// }



'use client'

import { useState, useRef, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Search, 
  Send, 
  Loader2, 
  ArrowLeft, 
  MessageSquare, 
  Paperclip, 
  Archive, 
  ShieldAlert,
  Inbox,
  Sparkles,
  CheckCheck,
  User,
  MoreVertical
} from 'lucide-react'
import { 
  useGetAdminInboxQuery, 
  useSendAdminReplyMutation, 
  useGetAdminSingleChatQuery 
} from '@/store/api/admin/chatListApiSlice'

export default function AdminChatLayout() {
  // Inbox Master Query Stream
  const { data: inboxThreads = [], isLoading: isInboxLoading, isError: isInboxError } = useGetAdminInboxQuery()
  
  // Interactivity States
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [typedMessage, setTypedMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  // Polled Detail Query for active thread instance details
  const { 
    data: singleThread, 
    isFetching: isThreadFetching, 
    isError: isThreadError 
  } = useGetAdminSingleChatQuery(activeThreadId!, {
    skip: !activeThreadId,
    pollingInterval: 8000 
  })

  // Mutation Handlers
  const [sendReply, { isLoading: isSending }] = useSendAdminReplyMutation()

  // Auto Scroll down frame on message mount variations
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [singleThread?.messages?.length, isThreadFetching])

  // Filter Inbox streams dynamically via name matching matrix arrays
  const filteredThreads = inboxThreads?.filter(thread => {
    if (!thread) return false
    const fullName = `${thread.userId?.firstName || ''} ${thread.userId?.lastName || ''}`.toLowerCase()
    const email = (thread.userId?.email || '').toLowerCase()
    return fullName.includes(searchTerm.toLowerCase()) || email.includes(searchTerm.toLowerCase())
  }) || []

  // Send message processing pipeline
  const handleMessageDispatch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!activeThreadId || !typedMessage.trim() || isSending) return

    const backupText = typedMessage
    setTypedMessage('')

    try {
      await sendReply({
        id: activeThreadId,
        messageText: backupText.trim(),
        attachments: [] 
      }).unwrap()
    } catch (err) {
      console.error("Failed writing support communication line matrix:", err)
      setTypedMessage(backupText) 
    }
  }

  return (
    <Card className="w-full h-[calc(100vh-100px)] min-h-[600px] block md:grid md:grid-cols-[340px_1fr] lg:grid-cols-[380px_1fr] overflow-hidden border border-border/80 shadow-2xl bg-gradient-to-br from-background via-background to-indigo-50/10 dark:from-zinc-950 dark:via-zinc-950 dark:to-indigo-950/10 rounded-2xl transition-all duration-300">
      
      {/* 1. Left Inbox Sidebar */}
      <div className={`w-full h-full border-r border-border/60 flex flex-col bg-slate-50/50 dark:bg-zinc-950/40 backdrop-blur-md min-w-0 ${
        activeThreadId ? 'hidden md:flex' : 'flex'
      }`}>
        
        {/* Sidebar Search Bar Header */}
        <div className="p-5 border-b border-border/50 bg-background/80 space-y-4 shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-indigo-600/10 text-indigo-600 dark:text-indigo-400">
                  <Inbox size={18} />
                </span> 
                Support Desk
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5 font-medium">Triage incoming client channels</p>
            </div>
            <span className="px-2.5 py-1 text-[11px] font-semibold bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 rounded-full">
              {filteredThreads.length} Open
            </span>
          </div>
          
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/80" />
            <Input 
              placeholder="Search by client name or email..." 
              className="pl-9 h-10 text-xs bg-muted/40 border-border/60 focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 transition-all rounded-xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Thread Stream Scroll Container */}
        <div className="flex-1 overflow-y-auto min-h-0 divide-y divide-border/30 bg-background/40">
          {isInboxLoading && (
            <div className="p-12 text-center text-xs text-muted-foreground flex flex-col items-center justify-center gap-3">
              <div className="p-3 bg-indigo-600/5 rounded-full animate-pulse">
                <Loader2 className="animate-spin text-indigo-600" size={20} />
              </div>
              <span className="font-medium tracking-wide">Syncing support framework...</span>
            </div>
          )}

          {isInboxError && (
            <div className="m-4 p-4 rounded-xl text-center text-xs text-destructive font-semibold flex flex-col items-center gap-2 justify-center bg-red-500/5 border border-red-500/10">
              <ShieldAlert size={18} className="text-red-500" /> 
              <span>Failed to load inbox pipeline.</span>
            </div>
          )}

          {!isInboxLoading && filteredThreads.length === 0 && (
            <div className="p-12 text-center text-xs text-muted-foreground space-y-2">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-2 opacity-70">
                <MessageSquare className="text-muted-foreground/60" size={20} />
              </div>
              <p className="font-semibold text-foreground text-sm">No channels found</p>
              <p className="text-[11px] max-w-[200px] mx-auto text-muted-foreground/80">Active parameter matching parameters returned an empty stack.</p>
            </div>
          )}

          {filteredThreads.map((thread) => {
            if (!thread?._id) return null
            const isActive = thread._id === activeThreadId
            const clientName = `${thread.userId?.firstName || 'Client'} ${thread.userId?.lastName || ''}`.trim()
            
            return (
              <button
                key={thread._id}
                type="button"
                onClick={() => setActiveThreadId(thread._id)}
                className={`w-full p-4 text-left transition-all duration-200 flex gap-3.5 items-start relative select-none border-b border-border/30 ${
                  isActive 
                    ? 'bg-indigo-600/[0.04] dark:bg-indigo-500/[0.04] border-l-4 border-l-indigo-600 pl-3 bg-gradient-to-r from-indigo-500/[0.02] to-transparent' 
                    : 'hover:bg-muted/40 bg-background/30'
                }`}
              >
                {/* Visual Initial Avatar Box Component */}
                <div className={`h-9 w-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 uppercase tracking-wider transition-colors duration-200 ${
                  isActive 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' 
                    : 'bg-gradient-to-br from-slate-100 to-slate-200 dark:from-zinc-800 dark:to-zinc-900 text-slate-700 dark:text-zinc-300 border border-border/50'
                }`}>
                  {clientName.substring(0, 2)}
                </div>

                {/* Meta details preview layout */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-xs font-semibold truncate transition-colors duration-200 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-foreground'}`}>
                      {clientName}
                    </span>
                    <span className="text-[10px] font-medium text-muted-foreground/80 bg-muted/60 px-1.5 py-0.5 rounded-md whitespace-nowrap">
                      {thread.lastMessageAt ? new Date(thread.lastMessageAt).toLocaleDateString(undefined, {month: 'short', day: 'numeric'}) : ''}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground/90 font-medium truncate">
                    {thread.userId?.email || 'No secure channel profile'}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* 2. Right Chat Workspace Engine */}
      <div className={`h-full flex flex-col bg-background/50 backdrop-blur-md min-w-0 ${
        !activeThreadId ? 'hidden md:flex' : 'flex'
      }`}>
        {activeThreadId ? (
          <div className="flex flex-col h-full w-full min-w-0 bg-background/20">
            
            {/* Active Thread Context Header layout */}
            <div className="p-4 md:p-5 border-b border-border/50 flex items-center justify-between bg-background/80 backdrop-blur-md z-10 shrink-0">
              <div className="flex items-center gap-3.5 min-w-0">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="md:hidden h-9 w-9 rounded-xl shrink-0 border border-border/40 hover:bg-muted" 
                  onClick={() => setActiveThreadId(null)}
                >
                  <ArrowLeft size={16} />
                </Button>
                
                <div className="min-w-0 flex items-center gap-3">
                  <div className="hidden sm:flex h-9 w-9 rounded-xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 items-center justify-center font-bold text-xs shrink-0">
                    <User size={16} />
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-bold text-sm text-foreground truncate tracking-tight">
                      {singleThread?.userId ? `${singleThread.userId.firstName} ${singleThread.userId.lastName}` : 'Resolving User Profile...'}
                    </h2>
                    <p className="text-xs text-muted-foreground font-medium truncate flex items-center gap-1">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                      {singleThread?.userId?.email || 'Connecting structural interface payloads'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {isThreadFetching && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-600/5 text-[11px] text-indigo-600 font-medium border border-indigo-500/10">
                    <Loader2 size={12} className="animate-spin" />
                    <span className="hidden sm:inline">Polling</span>
                  </div>
                )}
                <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl text-muted-foreground hover:text-foreground border-border/60 hover:bg-muted" title="Archive Stream">
                  <Archive size={15} />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted">
                  <MoreVertical size={15} />
                </Button>
              </div>
            </div>

            {/* Core Message stream viewport container block */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 flex flex-col min-h-0 bg-slate-50/[0.2] dark:bg-zinc-950/[0.15]">
              {isThreadError && (
                <div className="p-3.5 text-center text-xs bg-red-500/10 text-red-600 border border-red-500/20 rounded-xl max-w-sm mx-auto font-semibold shadow-sm backdrop-blur-md">
                  Error parsing message payloads from target thread matrix.
                </div>
              )}

              {singleThread?.messages?.map((msg, index) => {
                const isAdmin = msg.senderType === 'ADMIN'
                
                return (
                  <div key={msg._id || index} className={`flex w-full flex-col ${
                    isAdmin ? 'items-end' : 'items-start'
                  }`}>
                    <div className={`max-w-[80%] md:max-w-[65%] rounded-2xl px-4 py-3 text-xs font-medium shadow-sm leading-relaxed transition-all duration-200 ${
                      isAdmin 
                        ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-tr-none shadow-indigo-600/10 font-normal tracking-wide' 
                        : 'bg-background border border-border/80 text-foreground rounded-tl-none font-normal shadow-slate-100/40 dark:shadow-none'
                    }`}>
                      <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                    </div>
                    
                    {/* Message Metadata Indicator Footer Container */}
                    <div className="flex items-center gap-1 mt-1.5 px-1 text-[10px] font-medium text-muted-foreground/70">
                      <span>
                        {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString(undefined, {hour: '2-digit', minute:'2-digit'}) : ''}
                      </span>
                      {isAdmin && <CheckCheck size={12} className="text-indigo-500 dark:text-indigo-400 ml-0.5" />}
                    </div>
                  </div>
                )
              })}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Action Form Subtext Control segment layout */}
            <div className="p-4 bg-background/80 backdrop-blur-md border-t border-border/50 shrink-0">
              <form onSubmit={handleMessageDispatch} className="flex gap-2.5 items-center max-w-6xl mx-auto w-full">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon" 
                  className="h-10 w-10 rounded-xl shrink-0 border-border/60 hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all duration-200"
                  title="Attach operational assets"
                >
                  <Paperclip size={16} />
                </Button>
                
                <div className="relative flex-1 flex items-center">
                  <Input 
                    value={typedMessage}
                    onChange={(e) => setTypedMessage(e.target.value)}
                    placeholder="Type an official administrative system resolution..."
                    className="w-full h-10 pr-10 text-xs bg-muted/40 border-border/60 focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 transition-all rounded-xl"
                    disabled={isSending}
                  />
                  <div className="absolute right-3 text-muted-foreground/40 pointer-events-none hidden sm:block" title="System Verified Route">
                    <Sparkles size={14} />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={!typedMessage.trim() || isSending}
                  className="h-10 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shrink-0 flex items-center justify-center gap-1.5 font-semibold text-xs tracking-wide shadow-md shadow-indigo-600/10 transition-all duration-200 disabled:opacity-40"
                >
                  {isSending ? (
                    <Loader2 size={15} className="animate-spin" />
                  ) : (
                    <>
                      <span className="hidden sm:inline">Send</span>
                      <Send size={13} />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
         ) : (
          /* Empty Sandbox Default Active Frame View */
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-muted/[0.02] to-muted/[0.1] h-full transition-all duration-300">
            <div className="h-16 w-16 rounded-2xl bg-indigo-600/5 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 border border-indigo-500/10 shadow-inner group-hover:scale-105 transition-transform duration-300">
              <MessageSquare size={26} className="animate-pulse" />
            </div>
            <h3 className="font-bold text-base text-foreground tracking-tight">No Active Channel Selected</h3>
            <p className="text-xs text-muted-foreground max-w-sm mt-1.5 font-medium leading-relaxed">
              Select an open client operational communication thread from the side ledger index to start parsing resolution states.
            </p>
          </div>
        )}
      </div>

    </Card>
  )
}