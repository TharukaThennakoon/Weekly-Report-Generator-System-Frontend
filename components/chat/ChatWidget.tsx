// components/chat/ChatWidget.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import { api } from "@/lib/api";
import { IconSend } from "@tabler/icons-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "What did the team work on last week?",
  "Summarize any open blockers",
  "Who hasn't submitted this week?",
];

export function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await api.post<{ reply: string }>("/assistant/chat", { message: text });
      setMessages((prev) => [...prev, { role: "assistant", content: res.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl flex flex-col h-[600px]">
      <div className="flex-1 overflow-y-auto p-5 space-y-3">
        {messages.length === 0 && (
          <div>
            <p className="text-sm text-gray-500 mb-3">Ask about your team&apos;s recent activity.</p>
            <div className="flex flex-col gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-left text-sm text-indigo-600 border border-indigo-100 bg-indigo-50
                             rounded-md px-3 py-2 hover:bg-indigo-100 transition"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <ChatMessage key={i} role={m.role} content={m.content} />
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg px-4 py-2 text-sm text-gray-400">Thinking...</div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="border-t border-gray-100 p-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send(input)}
          placeholder="Ask about team activity..."
          className="flex-1 text-sm border border-gray-300 rounded-md px-3 py-2
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={() => send(input)}
          disabled={loading}
          className="bg-indigo-600 text-white rounded-md px-3 py-2 hover:bg-indigo-700 disabled:opacity-50"
        >
          <IconSend size={16} />
        </button>
      </div>
    </div>
  );
}