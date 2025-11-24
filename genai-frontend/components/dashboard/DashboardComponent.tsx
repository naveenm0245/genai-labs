"use client";

import React, { useState, useRef, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import {
  Send,
  Loader2,
  ArrowUp,
  RotateCcw,
  MessageSquare,
  FlaskConical,
  Settings,
  X,
} from "lucide-react";
import ExperimentMode from "./ExperimentMode";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface LLMParameters {
  top_p: number;
  top_k: number;
  min_tokens: number;
  max_tokens: number;
  temperature: number;
  frequency_penalty: number;
  presence_penalty: number;
}

const DashboardComponent = () => {
  const [mode, setMode] = useState<"chat" | "experiment">("experiment");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // LLM Parameters state
  const [parameters, setParameters] = useState<LLMParameters>({
    top_p: 1.0,
    top_k: 40,
    min_tokens: 1,
    max_tokens: 2048,
    temperature: 0.7,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input.trim();
    setInput("");
    setIsLoading(true);

    try {
      // Convert messages to OpenAI format
      const messagesForAPI = [
        ...messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        {
          role: "user",
          content: currentInput,
        },
      ];

      // Call Next.js API route (which proxies to backend)
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: messagesForAPI,
          ...parameters,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.content || "Sorry, I couldn't generate a response.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error calling chat API:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Sorry, there was an error processing your request. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Show experiment mode
  if (mode === "experiment") {
    return (
      <div className="flex h-full w-full">
        <div className="flex-1 min-w-0 overflow-hidden">
          <ExperimentMode />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full relative">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Chat Area */}
      <div className="flex flex-col flex-1 min-w-0 lg:pr-4">
        {/* Mobile Header with Settings Button */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-border bg-background">
          <h3 className="text-lg font-semibold">Chat</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="h-9 w-9 p-0"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-4 lg:py-6 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div className="text-gray-400 text-base sm:text-lg mb-2">
                Start a conversation
              </div>
              <div className="text-gray-400 text-xs sm:text-sm">
                Ask anything and get AI-powered responses
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[80%] rounded-2xl sm:rounded-3xl px-4 py-2.5 sm:px-8 sm:py-3 ${
                    message.role === "user"
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <div className="text-sm sm:text-base whitespace-pre-wrap wrap-break-word">
                    {message.content}
                  </div>
                  {/* <div
                  className={`text-xs mt-2 ${
                    message.role === "user"
                      ? "text-emerald-100 text-right"
                      : "text-gray-500 dark:text-gray-400 text-left"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div> */}
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl px-4 py-3">
                <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="sticky bottom-0 bg-background border-t border-border p-3 sm:p-4">
          <div className="flex gap-2 items-center">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className="flex-1 rounded-full text-sm sm:text-base"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="rounded-full bg-emerald-500 hover:bg-emerald-600 text-white h-9 sm:h-10 px-4 sm:px-6 shrink-0"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ArrowUp className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Control Panel Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 right-0 w-full sm:w-96 lg:w-80 bg-white border-l border-border flex flex-col shrink-0 z-50 lg:z-auto transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        } shadow-xl lg:shadow-none`}
      >
        <div className="p-4 border-b border-border bg-background">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">LLM Parameters</h3>
            <div className="flex items-center gap-2">
              <Button
                onClick={() =>
                  setParameters({
                    top_p: 1.0,
                    top_k: 40,
                    min_tokens: 1,
                    max_tokens: 2048,
                    temperature: 0.7,
                    frequency_penalty: 0.0,
                    presence_penalty: 0.0,
                  })
                }
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                title="Reset to defaults"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Adjust parameters to control model behavior
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4 sm:space-y-5">
          <div className="space-y-2 p-3 bg-background rounded-lg border border-border">
            <Slider
              label="Temperature"
              value={parameters.temperature}
              onValueChange={(value) =>
                setParameters((prev) => ({ ...prev, temperature: value }))
              }
              min={0}
              max={2}
              step={0.1}
            />
            <p className="text-xs text-muted-foreground">
              Controls randomness. Higher = more creative
            </p>
          </div>

          <div className="space-y-2 p-3 bg-background rounded-lg border border-border">
            <Slider
              label="Top P"
              value={parameters.top_p}
              onValueChange={(value) =>
                setParameters((prev) => ({ ...prev, top_p: value }))
              }
              min={0}
              max={1}
              step={0.01}
            />
            <p className="text-xs text-muted-foreground">
              Nucleus sampling threshold
            </p>
          </div>

          <div className="space-y-2 p-3 bg-background rounded-lg border border-border">
            <Slider
              label="Top K"
              value={parameters.top_k}
              onValueChange={(value) =>
                setParameters((prev) => ({ ...prev, top_k: value }))
              }
              min={1}
              max={100}
              step={1}
            />
            <p className="text-xs text-muted-foreground">
              Number of top tokens to consider
            </p>
          </div>

          <div className="space-y-2 p-3 bg-background rounded-lg border border-border">
            <Slider
              label="Min Tokens"
              value={parameters.min_tokens}
              onValueChange={(value) =>
                setParameters((prev) => ({ ...prev, min_tokens: value }))
              }
              min={1}
              max={512}
              step={1}
            />
            <p className="text-xs text-muted-foreground">
              Minimum tokens in response
            </p>
          </div>

          <div className="space-y-2 p-3 bg-background rounded-lg border border-border">
            <Slider
              label="Max Tokens"
              value={parameters.max_tokens}
              onValueChange={(value) =>
                setParameters((prev) => ({ ...prev, max_tokens: value }))
              }
              min={1}
              max={4096}
              step={1}
            />
            <p className="text-xs text-muted-foreground">
              Maximum tokens in response
            </p>
          </div>

          <div className="space-y-2 p-3 bg-background rounded-lg border border-border">
            <Slider
              label="Frequency Penalty"
              value={parameters.frequency_penalty}
              onValueChange={(value) =>
                setParameters((prev) => ({ ...prev, frequency_penalty: value }))
              }
              min={-2}
              max={2}
              step={0.1}
            />
            <p className="text-xs text-muted-foreground">
              Reduces repetition of frequent tokens
            </p>
          </div>

          <div className="space-y-2 p-3 bg-background rounded-lg border border-border">
            <Slider
              label="Presence Penalty"
              value={parameters.presence_penalty}
              onValueChange={(value) =>
                setParameters((prev) => ({ ...prev, presence_penalty: value }))
              }
              min={-2}
              max={2}
              step={0.1}
            />
            <p className="text-xs text-muted-foreground">
              Encourages new topics in response
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
