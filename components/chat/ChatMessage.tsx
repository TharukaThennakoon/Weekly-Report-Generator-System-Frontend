// components/chat/ChatMessage.tsx
export function ChatMessage({ role, content }: { role: "user" | "assistant"; content: string }) {
  return (
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] rounded-lg px-4 py-2 text-sm whitespace-pre-wrap
          ${role === "user" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-800"}`}
      >
        {content}
      </div>
    </div>
  );
}