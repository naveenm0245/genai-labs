"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { RangeSlider } from "../ui/range-slider";
import { Switch } from "../ui/switch";
import {  Loader2, Play, X } from "lucide-react";
import ComparisonView from "./ComparisonView";
import { inter } from "@/config/font";
import Link from "next/link";

interface ExperimentResponse {
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

const PlaygroundExperimentMode: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [numResponses, setNumResponses] = useState(3);
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<{
    prompt: string;
    responses: ExperimentResponse[];
  } | null>(null);

  // Parameter ranges [min, max]
  const [temperatureRange, setTemperatureRange] = useState<[number, number]>([
    0.4, 1.0,
  ]);
  const [topPRange, setTopPRange] = useState<[number, number]>([0.7, 1.0]);
  const [topKRange, setTopKRange] = useState<[number, number]>([20, 60]);
  const [maxTokensRange, setMaxTokensRange] = useState<[number, number]>([
    100, 1024,
  ]);
  const [streamResponse, setStreamResponse] = useState(false);
  const [highlightBest, setHighlightBest] = useState(true);
  const [selectedModel, setSelectedModel] = useState("GPT-5.1");

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    try {
      // Use the range values directly
      const requestBody: any = {
        prompt: prompt.trim(),
        num_responses: numResponses,
        temperature_range: {
          min: temperatureRange[0],
          max: temperatureRange[1],
          step: 0.1,
        },
        top_p_range: {
          min: topPRange[0],
          max: topPRange[1],
          step: 0.1,
        },
        top_k_range: {
          min: topKRange[0],
          max: topKRange[1],
          step: 1,
        },
        max_tokens_range: {
          min: maxTokensRange[0],
          max: maxTokensRange[1],
          step: 100,
        },
      };

      const response = await fetch("/api/experiments/generate-batch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      setResults({
        prompt: data.prompt,
        responses: data.responses,
      });
    } catch (error) {
      console.error("Error generating experiments:", error);
      alert("Error generating experiments. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // If we have results, show them in the right panel
  if (results) {
    return (
      <div className="flex flex-col lg:flex-row h-full w-full gap-0 lg:gap-4 overflow-hidden">
        {/* Left Panel - Controls */}
        <div className="w-full lg:w-96 bg-white lg:bg-gray-50 border-b lg:border-r border-border flex flex-col shrink-0 overflow-y-auto max-h-[50vh] lg:h-full">
          <div className="p-4 lg:p-6 border-b border-border bg-background">
            {/* <h1 className="text-lg lg:text-xl font-semibold tracking-tight text-orange-600 mb-4 lg:mb-6">
              PLAYGROUND
            </h1> */}
            <Link href="/">
              <h1 className="text-lg lg:text-xl font-semibold tracking-tight text-orange-600 mb-4 lg:mb-6">
                Model Tuner Playground
              </h1>
            </Link>
            <p className="text-xs text-gray-500 mb-4 lg:mb-6">
              This is a playground for experimenting with the model.
            </p>

            {/* Input Prompt */}
            <div className="mb-4 lg:mb-6">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
                INPUT PROMPT
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the function you want to generate..."
                className="w-full min-h-[100px] lg:min-h-[120px] p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                disabled={isGenerating}
              />
            </div>

            {/* Variables */}
            <div className="mb-4 lg:mb-6">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
                MODEL
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm bg-white"
                disabled={isGenerating}
              >
                <option value="GPT-4">GPT-5.1</option>
                <option value="GPT-3.5">GPT-4o</option>
                <option value="Claude">Claude 3.5 Sonnet</option>
                <option value="Gemini">Gemini 3</option>
              </select>
            </div>

            {/* Sliders */}
            <div className="space-y-4 lg:space-y-6 mb-4 lg:mb-6">
              <RangeSlider
                label="Temperature"
                value={temperatureRange}
                onValueChange={setTemperatureRange}
                min={0}
                max={2}
                step={0.01}
                disabled={isGenerating}
                helperLabels={{ left: "Precise", right: "Creative" }}
              />

              <div>
                <RangeSlider
                  label="Top P"
                  value={topPRange}
                  onValueChange={setTopPRange}
                  min={0}
                  max={1}
                  step={0.01}
                  disabled={isGenerating}
                />
              </div>

              <div>
                <RangeSlider
                  label="Top K"
                  value={topKRange}
                  onValueChange={setTopKRange}
                  min={1}
                  max={100}
                  step={1}
                  disabled={isGenerating}
                />
              </div>

              <div>
                <RangeSlider
                  label="Max Tokens"
                  value={maxTokensRange}
                  onValueChange={setMaxTokensRange}
                  min={100}
                  max={4096}
                  step={100}
                  disabled={isGenerating}
                />
              </div>
            </div>

            {/* Toggles */}
            <div className="space-y-3 lg:space-y-4 mb-4 lg:mb-6">
              {/* <Switch
                checked={streamResponse}
                onCheckedChange={setStreamResponse}
                label="Stream Response"
                disabled={isGenerating}
              /> */}
              <Switch
                checked={highlightBest}
                onCheckedChange={setHighlightBest}
                label="Highlight Best"
                disabled={isGenerating}
              />
            </div>

            {/* Clear Results Button */}
            <Button
              onClick={() => {
                setResults(null);
                setPrompt("");
              }}
              variant="outline"
              disabled={isGenerating}
              className="w-full border-gray-300 hover:bg-gray-50 text-gray-700 h-11 lg:h-12 text-sm lg:text-base font-medium mb-3"
            >
              <X className="w-5 h-5 mr-2" />
              Clear Results
            </Button>

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="w-full bg-black hover:bg-gray-800 text-white h-11 lg:h-12 text-sm lg:text-base font-medium"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Generate Variations
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Right Panel - Results */}
        <div className="flex-1 min-w-0 overflow-hidden flex flex-col min-h-0">
          <div className="flex-1 min-h-0 overflow-hidden">
            <ComparisonView
              prompt={results.prompt}
              responses={results.responses}
              highlightBest={highlightBest}
              onExport={() => {
                // Could add toast notification here
              }}
              onBack={() => {
                setResults(null);
                setPrompt("");
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  // Initial state - show both panels, right panel empty
  return (
    <div
      className={`${inter.className} flex flex-col lg:flex-row h-full w-full gap-0 lg:gap-4 overflow-hidden`}
    >
      {/* Left Panel - Controls */}
      <div className="w-full lg:w-96 bg-white lg:bg-gray-50 border-b lg:border-r border-border flex flex-col shrink-0 overflow-y-auto">
        <div className="p-4 lg:p-6 border-b border-border bg-background">
          <Link href="/">
            <h1 className="text-lg lg:text-xl font-semibold tracking-tight text-orange-600 mb-4 lg:mb-6">
              Model Tuner Playground
            </h1>
          </Link>

          {/* <h1 className="text-lg lg:text-xl font-semibold tracking-tight text-orange-600 mb-4 lg:mb-6">
            PLAYGROUND
          </h1> */}
          <p className="text-xs text-gray-500 mb-4 lg:mb-6">
            Playground provide quick experiments without signing up. For Saving
            history, please sign in.
          </p>

          {/* Input Prompt */}
          <div className="mb-4 lg:mb-6">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
              INPUT PROMPT
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the input prompt for the model."
              className="w-full min-h-[100px] lg:min-h-[120px] p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              disabled={isGenerating}
            />
          </div>

          {/* Variables */}
          <div className="mb-4 lg:mb-6">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
              MODEL
            </label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm bg-white"
              disabled={isGenerating}
            >
              <option value="GPT-4">GPT-5.1</option>
              <option value="GPT-3.5">GPT-4o</option>
              <option value="Claude">Claude 3.5 Sonnet</option>
              <option value="Gemini">Gemini 3</option>
            </select>
          </div>

          {/* Sliders */}
          <div className="space-y-4 lg:space-y-6 mb-4 lg:mb-6">
            <RangeSlider
              label="Temperature"
              value={temperatureRange}
              onValueChange={setTemperatureRange}
              min={0}
              max={2}
              step={0.01}
              disabled={isGenerating}
              helperLabels={{ left: "Precise", right: "Creative" }}
            />

            <div>
              <RangeSlider
                label="Top P"
                value={topPRange}
                onValueChange={setTopPRange}
                min={0}
                max={1}
                step={0.01}
                disabled={isGenerating}
              />
            </div>

            <div>
              <RangeSlider
                label="Top K"
                value={topKRange}
                onValueChange={setTopKRange}
                min={1}
                max={100}
                step={1}
                disabled={isGenerating}
              />
            </div>

            <div>
              <RangeSlider
                label="Max Tokens"
                value={maxTokensRange}
                onValueChange={setMaxTokensRange}
                min={100}
                max={4096}
                step={100}
                disabled={isGenerating}
              />
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-3 lg:space-y-4 mb-4 lg:mb-6">
            {/* <Switch
              checked={streamResponse}
              onCheckedChange={setStreamResponse}
              label="Stream Response"
              disabled={isGenerating}
            /> */}
            <Switch
              checked={highlightBest}
              onCheckedChange={setHighlightBest}
              label="Highlight Best"
              disabled={isGenerating}
            />
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="w-full bg-black hover:bg-gray-800 text-white h-11 lg:h-12 text-sm lg:text-base font-medium"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Generating...
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" />
                Generate Variations
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Right Panel - Empty State */}
      <div className="hidden lg:flex flex-1 min-w-0 items-center justify-center bg-gray-50">
        <div className="text-center text-gray-400 px-4">
          <p className="text-base lg:text-lg mb-2">No results yet</p>
          <p className="text-xs lg:text-sm">
            Generate variations to see results here
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlaygroundExperimentMode;
