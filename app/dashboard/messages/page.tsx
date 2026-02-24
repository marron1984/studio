"use client";

import { useState } from "react";
import { messages } from "@/lib/mock-data";
import { MessageCircle, Send, Hash } from "lucide-react";

const channels = [
  { id: "all", name: "全体", unread: 0 },
  { id: "managers", name: "店長会議", unread: 2 },
  { id: "zen-en", name: "禅園", unread: 0 },
  { id: "oden", name: "おでん×スタンド", unread: 1 },
  { id: "yakiniku", name: "やきにく新", unread: 0 },
];

export default function MessagesPage() {
  const [activeChannel, setActiveChannel] = useState("all");
  const [newMessage, setNewMessage] = useState("");

  const filteredMessages =
    activeChannel === "all"
      ? messages
      : messages.filter((m) => m.channel === activeChannel);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">メッセージ</h1>
        <p className="text-sm text-gray-500 mt-1">
          社内コミュニケーション
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex" style={{ height: "calc(100vh - 220px)" }}>
        {/* Channel sidebar */}
        <div className="w-56 border-r border-gray-200 flex-shrink-0 hidden md:block">
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700">チャンネル</h3>
          </div>
          <div className="p-2">
            {channels.map((ch) => (
              <button
                key={ch.id}
                onClick={() => setActiveChannel(ch.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeChannel === ch.id
                    ? "bg-navy-50 text-navy-900 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Hash className="w-3.5 h-3.5 text-gray-400" />
                <span className="flex-1 text-left">{ch.name}</span>
                {ch.unread > 0 && (
                  <span className="bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {ch.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-1 flex flex-col">
          {/* Channel header */}
          <div className="px-6 py-3 border-b border-gray-100 flex items-center gap-2">
            <Hash className="w-4 h-4 text-gray-400" />
            <span className="font-medium text-gray-900">
              {channels.find((c) => c.id === activeChannel)?.name}
            </span>
          </div>

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {filteredMessages.map((msg) => (
              <div key={msg.id} className="flex gap-3">
                <div className="w-9 h-9 rounded-full bg-navy-100 flex items-center justify-center text-sm font-medium text-navy-700 flex-shrink-0">
                  {msg.senderName[0]}
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-semibold text-gray-900">
                      {msg.senderName}
                    </span>
                    <span className="text-xs text-gray-400">
                      {msg.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mt-0.5">
                    {msg.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message input */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="メッセージを入力..."
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy-900"
              />
              <button className="p-2.5 bg-navy-950 text-white rounded-lg hover:bg-navy-900 transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
