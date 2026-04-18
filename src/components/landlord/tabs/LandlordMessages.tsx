
import React, { useState } from 'react';
import { Send, MessageSquare, Search, User, Clock, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import {
  getMessagesForLandlord,
  sendMessage,
  markMessageRead,
  type SharedMessage,
} from '@/data/sharedMockData';

const LandlordMessages = () => {
  const landlordId = 'landlord-1';
  const [messages, setMessages] = useState<SharedMessage[]>(getMessagesForLandlord(landlordId));
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCompose, setShowCompose] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [composeForm, setComposeForm] = useState({ to: '', subject: '', message: '' });

  const refreshMessages = () => setMessages(getMessagesForLandlord(landlordId));

  // Group messages by thread
  const threads = messages.reduce((acc, msg) => {
    if (!acc[msg.threadId]) {
      acc[msg.threadId] = [];
    }
    acc[msg.threadId].push(msg);
    return acc;
  }, {} as Record<string, SharedMessage[]>);

  // Get latest message per thread for the list view
  const threadList = Object.entries(threads)
    .map(([threadId, msgs]) => ({
      threadId,
      messages: msgs.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()),
      latestMessage: msgs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0],
      hasUnread: msgs.some(m => m.to.id === landlordId && !m.read),
    }))
    .filter(t =>
      t.latestMessage.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.messages.some(m => m.from.name.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => new Date(b.latestMessage.timestamp).getTime() - new Date(a.latestMessage.timestamp).getTime());

  const selectedThread = selectedThreadId ? threads[selectedThreadId] : null;

  const handleReply = () => {
    if (!replyText.trim() || !selectedThread) return;

    const lastMsg = selectedThread[selectedThread.length - 1];
    const recipient = lastMsg.from.id === landlordId ? lastMsg.to : lastMsg.from;

    sendMessage({
      threadId: selectedThreadId!,
      from: { id: landlordId, name: 'James Smith (Property Manager)', role: 'landlord' },
      to: { id: recipient.id, name: recipient.name, role: recipient.role as 'tenant' | 'landlord' },
      subject: `Re: ${lastMsg.subject}`,
      content: replyText,
      relatedTo: lastMsg.relatedTo,
    });

    toast.success('Reply sent!');
    setReplyText('');
    refreshMessages();
  };

  const handleCompose = () => {
    if (!composeForm.to || !composeForm.subject || !composeForm.message) {
      toast.error('Please fill in all fields');
      return;
    }

    sendMessage({
      threadId: `thread-${Date.now()}`,
      from: { id: landlordId, name: 'James Smith (Property Manager)', role: 'landlord' },
      to: { id: 'tenant-1', name: composeForm.to, role: 'tenant' },
      subject: composeForm.subject,
      content: composeForm.message,
      relatedTo: 'general',
    });

    toast.success('Message sent!');
    setShowCompose(false);
    setComposeForm({ to: '', subject: '', message: '' });
    refreshMessages();
  };

  const handleSelectThread = (threadId: string) => {
    setSelectedThreadId(threadId);
    // Mark all unread messages in this thread as read
    const threadMsgs = threads[threadId];
    threadMsgs?.forEach(m => {
      if (m.to.id === landlordId && !m.read) {
        markMessageRead(m.id);
      }
    });
    refreshMessages();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Messages</h2>
          <p className="text-muted-foreground text-sm">Communicate with your tenants</p>
        </div>
        <Button onClick={() => setShowCompose(true)}>
          <MessageSquare size={16} className="mr-2" /> New Message
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[60vh]">
        {/* Thread List */}
        <div className="bg-white border border-border rounded-xl overflow-hidden">
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
              <Input
                placeholder="Search messages..."
                className="pl-9 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <ScrollArea className="h-[55vh]">
            {threadList.map((thread) => {
              const otherParty = thread.latestMessage.from.id === landlordId
                ? thread.latestMessage.to
                : thread.latestMessage.from;

              return (
                <button
                  key={thread.threadId}
                  onClick={() => handleSelectThread(thread.threadId)}
                  className={`w-full p-4 text-left border-b border-border hover:bg-secondary/20 transition-colors ${
                    selectedThreadId === thread.threadId ? 'bg-secondary/30' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <User size={14} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm truncate ${thread.hasUnread ? 'font-bold' : 'font-medium'}`}>
                          {otherParty.name}
                        </p>
                        {thread.hasUnread && <div className="h-2 w-2 rounded-full bg-primary shrink-0" />}
                      </div>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{thread.latestMessage.subject}</p>
                      <p className="text-[10px] text-muted-foreground mt-1">
                        {new Date(thread.latestMessage.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </ScrollArea>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2 bg-white border border-border rounded-xl overflow-hidden flex flex-col">
          {selectedThread ? (
            <>
              <div className="p-4 border-b">
                <h3 className="font-semibold text-sm">{selectedThread[0]?.subject}</h3>
                {selectedThread[0]?.relatedTo && (
                  <Badge variant="secondary" className="text-[10px] mt-1 capitalize">{selectedThread[0].relatedTo}</Badge>
                )}
              </div>
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {selectedThread
                    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
                    .map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.from.id === landlordId ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[75%] rounded-xl p-3 ${
                          msg.from.id === landlordId
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary/20'
                        }`}>
                          <p className="text-xs font-medium mb-1 opacity-70">{msg.from.name}</p>
                          <p className="text-sm">{msg.content}</p>
                          <div className="flex items-center gap-1 mt-2 opacity-50">
                            <Clock size={10} />
                            <span className="text-[10px]">{new Date(msg.timestamp).toLocaleString()}</span>
                            {msg.from.id === landlordId && <CheckCheck size={10} className="ml-1" />}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </ScrollArea>
              <div className="p-3 border-t flex gap-2">
                <Input
                  placeholder="Type your reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleReply()}
                  className="flex-1"
                />
                <Button onClick={handleReply} disabled={!replyText.trim()}>
                  <Send size={16} />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center p-8">
              <div>
                <MessageSquare size={48} className="mx-auto text-muted-foreground/30 mb-4" />
                <p className="font-medium text-muted-foreground">Select a conversation</p>
                <p className="text-sm text-muted-foreground/60 mt-1">Choose a thread from the list to view messages</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Compose Dialog */}
      <Dialog open={showCompose} onOpenChange={setShowCompose}>
        <DialogContent className="bg-white sm:max-w-md">
          <DialogTitle>New Message</DialogTitle>
          <div className="space-y-4 mt-2">
            <div>
              <label className="text-sm font-medium">To (Tenant Name)</label>
              <Input
                value={composeForm.to}
                onChange={(e) => setComposeForm(prev => ({ ...prev, to: e.target.value }))}
                placeholder="e.g. John Doe"
                className="mt-1.5"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Subject</label>
              <Input
                value={composeForm.subject}
                onChange={(e) => setComposeForm(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Message subject"
                className="mt-1.5"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Message</label>
              <Textarea
                value={composeForm.message}
                onChange={(e) => setComposeForm(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Type your message..."
                rows={4}
                className="mt-1.5"
              />
            </div>
            <Button onClick={handleCompose} className="w-full">
              <Send size={14} className="mr-2" /> Send Message
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LandlordMessages;
