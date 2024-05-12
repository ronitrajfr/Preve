"use client";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  ChatSession,
} from "@google/generative-ai";
import { useEffect, useState } from "react";
const genAI = new GoogleGenerativeAI("YOUR_API_KEY");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export function InputCom({ content }: any) {
  const [input, setinput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chat, setchat] = useState<ChatSession | null>(null);
  const [history, setHistory] = useState([
    {
      role: "model",
      parts: "Great to meet you. Im Gemini, your chatbot.",
    },
  ]);

  useEffect(() => {
    // the moment I felt , Im the GOD !
    if (!chat) {
      setchat(
        model.startChat({
          generationConfig: {
            maxOutputTokens: 400,
          },
        })
      );
    }
  }, [chat, model]);

  async function chatting() {
    setLoading(true);
    setHistory((oldHistory) => [
      ...oldHistory,
      {
        role: "user",
        parts: input,
      },
      {
        role: "model",
        parts: "Thinking...",
      },
    ]);
    setinput("");
    try {
      const result = await chat?.sendMessage(input);
      const response = await result?.response;
      const text = response.text();
      setLoading(false);
      setHistory((oldHistory) => {
        const newHistory = oldHistory.slice(0, oldHistory.length - 1);
        newHistory.push({
          role: "model",
          parts: text,
        });
        return newHistory;
      });
    } catch (error) {
      setHistory((oldHistory) => {
        const newHistory = oldHistory.slice(0, oldHistory.length - 1);
        newHistory.push({
          role: "model",
          parts: "Oops! Something went wrong.",
        });
        return newHistory;
      });
      setLoading(false);
      console.log(error);
      alert("Oops! Something went wrong.");
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      chatting();
    }
  }

  function reset() {
    setHistory([
      {
        role: "model",
        parts: "Great to meet you. Im Gemini, your chatbot.",
      },
    ]);
    setinput("");
    setchat(null);
  }

  return (
    <div>
      {history.map((item, index) => (
        <div
          key={index}
          className={`chat ${
            item.role === "model" ? "chat-start" : "chat-end"
          }`}
        >
          <div className="chat-image avatar">
            <div className="w-6 md:w-10 rounded-full"></div>
          </div>
          <div className="chat-header mx-2 font-semibold opacity-80">
            {item.role === "model" ? "Gemini" : "You"}
          </div>
          <div
            className={`chat-bubble font-medium ${
              item.role === "model" ? "chat-bubble-primary" : ""
            }`}
          >
            <h1>{item.parts}</h1>
          </div>
        </div>
      ))}
      <textarea
        value={input}
        required
        rows={1}
        onKeyDown={handleKeyDown}
        onChange={(e) => setinput(e.target.value)}
        placeholder="Start Chatting..."
        className="textarea backdrop-blur textarea-primary w-full mx-auto bg-opacity-60 font-medium shadow rounded-3xl"
      />
      <button
        className={`btn rounded-3xl shadow-md ${
          loading ? "btn-accent cursor-wait pointer-events-none" : "btn-primary"
        }`}
        title="send"
        onClick={chatting}
      >
        {loading ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          <div>send</div>
        )}
      </button>
    </div>
  );
}
