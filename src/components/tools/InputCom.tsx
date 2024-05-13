"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import Markdown from "react-markdown";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_APIKEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

interface ConversationTurn {
  user: string;
  ai: string | null;
}

interface InputComProps {
  content: string;
}

export function InputCom({ content }: InputComProps): JSX.Element {
  const [input, setInput] = useState<string>("");
  const [conversation, setConversation] = useState<ConversationTurn[]>([]);
  const conversationEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (conversationEndRef.current) {
      conversationEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const generateResponse = async (userInput: string): Promise<string> => {
    const parts = [
      { text: `act as a genius and give an answer to this ${content}` },
      { text: `input: ${userInput}` },
      { text: "output: your response" },
    ];

    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
    });

    const responseText: string =
      result.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    return responseText;
  };

  const handleSend = async (): Promise<void> => {
    const newConversation: ConversationTurn[] = [
      ...conversation,
      { user: input, ai: null },
    ]; // Add a placeholder for the AI response
    setConversation(newConversation);

    const response: string = await generateResponse(input);
    const updatedConversation: ConversationTurn[] = [...newConversation];
    updatedConversation[newConversation.length - 1].ai = response;
    setConversation(updatedConversation);

    setInput(""); // Clear input after sending
  };
  async function handleKeyDown(e: any) {
    if (e.key === "Enter") {
      const newConversation: ConversationTurn[] = [
        ...conversation,
        { user: input, ai: null },
      ]; // Add a placeholder for the AI response
      setConversation(newConversation);

      const response: string = await generateResponse(input);
      const updatedConversation: ConversationTurn[] = [...newConversation];
      updatedConversation[newConversation.length - 1].ai = response;
      setConversation(updatedConversation);

      setInput("");
    }
  }
  return (
    <div className="mt-24">
      <center>
        <div className="w-[400px] md:w-[700px] px-4 md:px-0 text-left">
          {conversation.map((item, index) => (
            <div key={index} className="mt-7">
              {(index !== 0 || item.user !== "") && (
                <p className=" text-xl font-semibold mb-2 text-slate-950">
                  {" "}
                  <Markdown>{item.user}</Markdown>
                </p>
              )}
              {item.ai !== null && (
                <p className=" text-md font-medium text-slate-700">
                  {" "}
                  <Markdown>{item.ai}</Markdown>
                </p>
              )}
              {index === conversation.length - 1 && item.ai === null && (
                <p>Loading...</p>
              )}
            </div>
          ))}
          <div ref={conversationEndRef}></div>
        </div>
      </center>
      <center>
        <div className="px-4 pt-4 mx-auto">
          <input
            type="text"
            value={input}
            onKeyDown={handleKeyDown}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Start Chatting..."
            className=" shadow bg-gray-50 border-2 border-orange-400 text-black text-sm rounded-lg focus:border-orange-500 p-2.5 w-[400px] md:w-[700px] "
            style={{ marginBottom: "10px" }}
          />
          <button
            onClick={handleSend}
            className="bg-orange-400 text-white p-2.5 rounded-lg ml-2"
          >
            Send
          </button>
        </div>
      </center>
    </div>
  );
}
