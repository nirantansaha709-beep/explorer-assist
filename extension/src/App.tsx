import React, { useState } from "react";
import ChatBox from "./components/ChatBox";
import InputBar from "./components/InputBar";
import Loader from "./components/Loader";

interface Message {
  role: "user" | "assistant";
  text: string;
}

const App = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "👋 Hi! Ask me about your Looker data." },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg = { role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      const reply = data.reply || "Sorry, no response.";
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch (e) {
      setMessages((prev) => [...prev, { role: "assistant", text: "Error fetching data." }]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white shadow-md rounded-xl p-4">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Looker Explore Assistant
        </h1>
        <ChatBox messages={messages} />
        {loading && <Loader />}
        <InputBar onSend={sendMessage} />
      </div>
    </div>
  );
};

export default App;
