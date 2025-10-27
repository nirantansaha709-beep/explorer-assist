import React, { useState } from "react";

const InputBar = ({ onSend }: { onSend: (text: string) => void }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="flex">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your query..."
        className="flex-grow border rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={handleSend}
        className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700"
      >
        Send
      </button>
    </div>
  );
};

export default InputBar;
