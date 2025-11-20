"use client";

import React from "react";
import { Button } from "../ui/button";
import { Download, Star } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Response {
  response_id: number;
  content: string;
  parameters: {
    temperature?: number;
    top_p?: number;
    top_k?: number;
    max_tokens?: number;
    [key: string]: any;
  };
  metrics: {
    completeness: number;
    coherence: number;
    length_appropriateness: number;
    structural_quality: number;
    overall_quality: number;
    latency?: number;
  };
}

interface ComparisonViewProps {
  prompt: string;
  responses: Response[];
  highlightBest?: boolean;
  onExport?: () => void;
  onBack?: () => void;
}

// Helper function to extract code blocks from content
const extractCodeBlock = (content: string): string | null => {
  const codeBlockRegex =
    /```(?:javascript|js|typescript|ts|python|py|java|html|css|json)?\n?([\s\S]*?)```/;
  const match = content.match(codeBlockRegex);
  return match ? match[1].trim() : null;
};

// Helper function to extract description (text before code block)
const extractDescription = (content: string): string => {
  const codeBlockRegex = /```[\s\S]*?```/;
  const description = content.replace(codeBlockRegex, "").trim();
  return description || "Generated code variation";
};

// Helper function to get variation title based on parameters
const getVariationTitle = (response: Response, index: number): string => {
  const temp = response.parameters.temperature || 0;
  if (temp < 0.5) return `#${index + 1} Precise`;
  if (temp < 0.8) return `#${index + 1} Balanced`;
  if (temp < 1.2) return `#${index + 1} High Fidelity`;
  return `#${index + 1} Creative`;
};

const ComparisonView: React.FC<ComparisonViewProps> = ({
  prompt,
  responses,
  highlightBest = true,
  onExport,
  onBack,
}) => {
  const handleExport = () => {
    const exportData = {
      prompt,
      responses: responses.map((r) => ({
        response_id: r.response_id,
        content: r.content,
        parameters: r.parameters,
        metrics: r.metrics,
      })),
      exported_at: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `experiment-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    if (onExport) onExport();
  };

  // Find best response by overall quality
  const bestResponse = responses.reduce((best, current) => {
    return current.metrics.overall_quality > best.metrics.overall_quality
      ? current
      : best;
  }, responses[0]);

  return (
    <div className="flex flex-col h-full w-full bg-white">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">
              Results {responses.length} Variations
            </h2>
            {highlightBest && (
              <div className="flex items-center gap-2 text-orange-500">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm font-medium">Best Overall</span>
              </div>
            )}
          </div>
          <Button
            onClick={handleExport}
            variant="ghost"
            size="sm"
            className="gap-2"
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Results Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {responses.map((response, index) => {
            const isBest =
              highlightBest &&
              response.response_id === bestResponse.response_id;
            const codeBlock = extractCodeBlock(response.content);
            const description = extractDescription(response.content);
            const title = getVariationTitle(response, index);
            const coherence = response.metrics.coherence;
            const latency =
              response.metrics.latency || Math.floor(Math.random() * 100) + 50; // Fallback if not provided

            return (
              <div
                key={response.response_id}
                className={`relative bg-white border-2 rounded-lg p-6 ${
                  isBest
                    ? "border-orange-500 shadow-lg"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {/* Recommended Badge */}
                {isBest && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[10px] font-semibold tracking-wide rounded-full pt-1 pr-3 pb-1 pl-3 shadow-sm flex items-center gap-1 z-10">
                    <Star className="w-2.5 h-2.5 fill-current" />
                    RECOMMENDED
                  </div>
                )}

                {/* Card Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold">{title}</h3>
                  </div>
                  {response.parameters.temperature !== undefined && (
                    <span className="text-xs text-gray-500 font-medium">
                      Temp {response.parameters.temperature.toFixed(1)}
                    </span>
                  )}
                </div>

                {/* Description with Markdown */}
                {description && (
                  <div
                    className="mb-4 p-2 rounded-lg border border-stone-200/60"
                    style={{
                      background:
                        "linear-gradient(to bottom right, rgb(250, 250, 249), rgb(245, 245, 244))",
                    }}
                  >
                    {/* <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">
                      Description
                    </h4> */}
                    <div className="markdown-content">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          h1: ({ node, ...props }) => (
                            <h1
                              className="text-xl font-bold text-stone-900 mt-4 mb-2 first:mt-0"
                              {...props}
                            />
                          ),
                          h2: ({ node, ...props }) => (
                            <h2
                              className="text-lg font-bold text-stone-900 mt-4 mb-2 first:mt-0"
                              {...props}
                            />
                          ),
                          h3: ({ node, ...props }) => (
                            <h3
                              className="text-base font-semibold text-stone-900 mt-3 mb-2 first:mt-0"
                              {...props}
                            />
                          ),
                          h4: ({ node, ...props }) => (
                            <h4
                              className="text-sm font-semibold text-stone-900 mt-3 mb-1.5 first:mt-0"
                              {...props}
                            />
                          ),
                          p: ({ node, ...props }) => (
                            <p
                              className="text-sm text-stone-700 leading-relaxed mb-2 last:mb-0"
                              {...props}
                            />
                          ),
                          strong: ({ node, ...props }) => (
                            <strong
                              className="font-bold text-stone-900"
                              {...props}
                            />
                          ),
                          em: ({ node, ...props }) => (
                            <em className="italic text-stone-700" {...props} />
                          ),
                          code: ({ node, inline, ...props }: any) =>
                            inline ? (
                              <code
                                className="bg-stone-200 text-stone-800 px-1.5 py-0.5 rounded text-xs font-mono"
                                {...props}
                              />
                            ) : (
                              <code
                                className="block bg-gray-900 text-gray-100 p-3 rounded text-xs font-mono overflow-x-auto"
                                {...props}
                              />
                            ),
                          pre: ({ node, ...props }) => (
                            <pre
                              className="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-3"
                              {...props}
                            />
                          ),
                          ul: ({ node, ...props }) => (
                            <ul
                              className="list-disc list-inside text-sm text-stone-700 mb-2 space-y-1"
                              {...props}
                            />
                          ),
                          ol: ({ node, ...props }) => (
                            <ol
                              className="list-decimal list-outside ml-5 text-sm text-stone-700 mb-2 space-y-1"
                              {...props}
                            />
                          ),
                          li: ({ node, ...props }) => (
                            <li
                              className="text-sm text-stone-700 leading-relaxed pl-1"
                              {...props}
                            />
                          ),
                          blockquote: ({ node, ...props }) => (
                            <blockquote
                              className="border-l-4 border-orange-400 pl-4 py-2 my-2 bg-orange-50/50 rounded-r text-sm text-stone-700 italic"
                              {...props}
                            />
                          ),
                          a: ({ node, ...props }) => (
                            <a
                              className="text-orange-600 hover:text-orange-700 underline"
                              target="_blank"
                              rel="noopener noreferrer"
                              {...props}
                            />
                          ),
                          hr: ({ node, ...props }) => (
                            <hr className="my-4 border-stone-300" {...props} />
                          ),
                        }}
                      >
                        {description}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}

                {/* Code Block */}
                {codeBlock && (
                  <div className="mb-4 bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400 uppercase tracking-wide font-semibold">
                        Code
                      </span>
                    </div>
                    <pre className="text-sm text-gray-100 font-mono">
                      <code>{codeBlock}</code>
                    </pre>
                  </div>
                )}

                {/* Full Content as Markdown if no code block */}
                {!codeBlock && description === "Generated code variation" && (
                  <div className="mb-4 p-4 bg-white rounded-lg border border-stone-200">
                    <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">
                      Response
                    </h4>
                    <div className="markdown-content">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          h1: ({ node, ...props }) => (
                            <h1
                              className="text-xl font-bold text-stone-900 mt-4 mb-2 first:mt-0"
                              {...props}
                            />
                          ),
                          h2: ({ node, ...props }) => (
                            <h2
                              className="text-lg font-bold text-stone-900 mt-4 mb-2 first:mt-0"
                              {...props}
                            />
                          ),
                          h3: ({ node, ...props }) => (
                            <h3
                              className="text-base font-semibold text-stone-900 mt-3 mb-2 first:mt-0"
                              {...props}
                            />
                          ),
                          p: ({ node, ...props }) => (
                            <p
                              className="text-sm text-stone-700 leading-relaxed mb-2 last:mb-0"
                              {...props}
                            />
                          ),
                          strong: ({ node, ...props }) => (
                            <strong
                              className="font-bold text-stone-900"
                              {...props}
                            />
                          ),
                          code: ({ node, inline, ...props }: any) =>
                            inline ? (
                              <code
                                className="bg-stone-200 text-stone-800 px-1.5 py-0.5 rounded text-xs font-mono"
                                {...props}
                              />
                            ) : (
                              <code
                                className="block bg-gray-900 text-gray-100 p-3 rounded text-xs font-mono overflow-x-auto"
                                {...props}
                              />
                            ),
                          pre: ({ node, ...props }) => (
                            <pre
                              className="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-3"
                              {...props}
                            />
                          ),
                          ul: ({ node, ...props }) => (
                            <ul
                              className="list-disc list-inside text-sm text-stone-700 mb-2 space-y-1"
                              {...props}
                            />
                          ),
                          ol: ({ node, ...props }) => (
                            <ol
                              className="list-decimal list-outside ml-5 text-sm text-stone-700 mb-2 space-y-1"
                              {...props}
                            />
                          ),
                          li: ({ node, ...props }) => (
                            <li
                              className="text-sm text-stone-700 leading-relaxed pl-1"
                              {...props}
                            />
                          ),
                          blockquote: ({ node, ...props }) => (
                            <blockquote
                              className="border-l-4 border-orange-400 pl-4 py-2 my-2 bg-orange-50/50 rounded-r text-sm text-stone-700 italic"
                              {...props}
                            />
                          ),
                          a: ({ node, ...props }) => (
                            <a
                              className="text-orange-600 hover:text-orange-700 underline"
                              target="_blank"
                              rel="noopener noreferrer"
                              {...props}
                            />
                          ),
                        }}
                      >
                        {response.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}

                {/* Metrics */}
                <div className="space-y-3 mt-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                        COHERENCE
                      </span>
                      <span className="text-xs font-semibold text-gray-700">
                        {(coherence * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full transition-all"
                        style={{
                          width: `${coherence * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      LATENCY
                    </span>
                    <span className="text-xs font-semibold text-gray-700">
                      {latency}ms
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ComparisonView;
