import React from "react";

const ChatBox = ({ messages }: { messages: { role: string; text: string }[] }) => (
  <div className="border rounded-lg p-4 h-80 overflow-y-auto bg-gray-50 mb-4">
    {messages.map((m, i) => (
      <div
        key={i}
        className={`my-2 p-2 rounded-lg ${
          m.role === "user"
            ? "bg-blue-100 text-right"
            : "bg-gray-200 text-left"
        }`}
      >
        {m.text}
      </div>
    ))}
  </div>
);

export default ChatBox;
