"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2, Calendar, FlaskConical } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  };
}

interface Experiment {
  id: string;
  user_id: string;
  prompt: string;
  num_responses: number;
  responses: ExperimentResponse[];
  created_at: string;
}

const HistoryPage = () => {
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchExperiments();
  }, []);

  const fetchExperiments = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/experiments?limit=100&skip=0");
      if (!response.ok) {
        throw new Error("Failed to fetch experiments");
      }
      const data = await response.json();
      setExperiments(data.experiments || []);
    } catch (error) {
      console.error("Error fetching experiments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (experimentId: string) => {
    if (!confirm("Are you sure you want to delete this experiment?")) {
      return;
    }

    try {
      setDeletingId(experimentId);
      const response = await fetch(`/api/experiments/${experimentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete experiment");
      }

      // Remove from local state
      setExperiments((prev) => prev.filter((exp) => exp.id !== experimentId));
    } catch (error) {
      console.error("Error deleting experiment:", error);
      alert("Failed to delete experiment. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const getBestQuality = (responses: ExperimentResponse[]): number => {
    if (responses.length === 0) return 0;
    return Math.max(...responses.map((r) => r.metrics.overall_quality));
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const truncatePrompt = (prompt: string, maxLength: number = 100): string => {
    if (prompt.length <= maxLength) return prompt;
    return prompt.substring(0, maxLength) + "...";
  };

  if (loading) {
    return (
      <div className="h-full w-full">
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Experiment History
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            View and manage your past LLM experiments
          </p>
        </div>

        {experiments.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-20rem)] text-center px-4">
            <FlaskConical className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mb-4" />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
              No experiments yet
            </h2>
            <p className="text-sm sm:text-base text-gray-500 mb-6">
              Start experimenting to see your history here
            </p>
            <Link href="/dashboard">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-3 sm:gap-4">
            {experiments.map((experiment) => {
              const bestQuality = getBestQuality(experiment.responses);
              const qualityPercentage = Math.round(bestQuality * 100);

              return (
                <Link
                  key={experiment.id}
                  href={`/history/${experiment.id}`}
                  className="block bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 wrap-break-word line-clamp-2">
                          {experiment.prompt}
                        </h3>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-2">
                          <FlaskConical className="w-4 h-4 shrink-0" />
                          <span>{experiment.num_responses} responses</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 shrink-0" />
                          <span className="wrap-break-word">
                            {formatDate(experiment.created_at)}
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <span className="font-medium">Best Quality:</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 sm:w-24 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-orange-500 h-2 rounded-full transition-all"
                                style={{ width: `${qualityPercentage}%` }}
                              />
                            </div>
                            <span className="text-xs sm:text-sm font-semibold text-gray-700">
                              {qualityPercentage}%
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-gray-500 mb-4 line-clamp-2 wrap-break-word">
                        {experiment.prompt}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 sm:ml-4 shrink-0 w-full sm:w-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 flex-1 sm:flex-initial w-full sm:w-auto"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDelete(experiment.id);
                        }}
                        disabled={deletingId === experiment.id}
                      >
                        {deletingId === experiment.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                        <span className="hidden sm:inline">Delete</span>
                      </Button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
