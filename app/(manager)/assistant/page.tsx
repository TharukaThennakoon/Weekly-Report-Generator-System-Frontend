// app/(manager)/assistant/page.tsx
import { ChatWidget } from "@/components/chat/ChatWidget";

export default function AssistantPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 mb-1">AI assistant</h1>
      <p className="text-sm text-gray-500 mb-6">
        Ask questions about your team&apos;s recent reports.
      </p>
      <div className="max-w-2xl">
        <ChatWidget />
      </div>
    </div>
  );
}