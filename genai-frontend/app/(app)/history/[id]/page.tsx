"use client";

import React, { useState, useEffect, use } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";
import ComparisonView from "@/components/dashboard/ComparisonView";
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

const ExperimentDetailPage = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const resolvedParams = use(params);
  const [experiment, setExperiment] = useState<Experiment | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchExperiment();
  }, [resolvedParams.id]);

  const fetchExperiment = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/experiments/${resolvedParams.id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch experiment");
      }
      const data = await response.json();
      setExperiment(data);
    } catch (error) {
      console.error("Error fetching experiment:", error);
    } finally {
      setLoading(false);
    }
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

  if (!experiment) {
    return (
      <div className="h-full w-full">
        <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Experiment not found
          </h2>
          <p className="text-gray-500 mb-6">
            The experiment you're looking for doesn't exist or has been deleted.
          </p>
          <Button onClick={() => router.push("/history")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to History
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <div className="h-[calc(100vh-4rem)] flex flex-col">
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/history")}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to History
            </Button>
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-gray-900">
                Experiment Details
              </h1>
              <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                {experiment.prompt}
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <ComparisonView
            prompt={experiment.prompt}
            responses={experiment.responses}
            highlightBest={true}
            onBack={() => router.push("/history")}
          />
        </div>
      </div>
    </div>
  );
};

export default ExperimentDetailPage;
