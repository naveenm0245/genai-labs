"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import { inter } from "@/config/font";
import {
  SlidersHorizontal,
  ArrowRight,
  ChevronRight,
  Book,
  GitBranch,
  Zap,
  Code2,
  Check,
  Users,
  Triangle,
  Box,
  Layers,
  Globe,
  Twitter,
  Github,
  Linkedin,
  CheckCircle2,
  BarChart3,
  FlaskConical,
  History,
} from "lucide-react";
import NavBarNew from "@/components/NavBar/NavBarNew";

const HomePage = () => {
  return (
    <div
      className={`${inter.className} selection:bg-orange-100 selection:text-orange-900 overflow-x-hidden bg-[#FAFAF9] text-[#1C1917] antialiased`}
    >
      {/* Navigation */}
      <NavBarNew />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Grid */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundSize: "40px 40px",
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)",
            maskImage:
              "linear-gradient(to bottom, black 40%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 40%, transparent 100%)",
          }}
        ></div>

        {/* Orange Glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(249, 115, 22, 0.15), transparent 60%)",
          }}
        ></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200 shadow-sm mb-8 animate-fade-up">
            <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
            <span className="text-xs font-medium text-stone-600">
              v2.0 is now available
            </span>
            <ArrowRight className="w-3 h-3 text-stone-400" />
          </div>

          {/* Headline */}
          <h1 className="text-5xl lg:text-7xl font-semibold tracking-tight text-stone-900 mb-6 max-w-4xl mx-auto leading-[1.1] animate-fade-up delay-1">
            The missing control panel <br /> for{" "}
            <span className="text-stone-400">LLM Engineering.</span>
          </h1>

          {/* Subhead */}
          <p className="text-lg lg:text-xl text-stone-500 mb-10 max-w-2xl mx-auto leading-relaxed font-normal animate-fade-up delay-2">
            Iterate prompts, tune parameters, and benchmark latency in
            real-time. Stop guessing and start engineering predictable outputs.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 animate-fade-up delay-3">
            <Button
              asChild
              className="h-12 px-12 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-medium text-sm transition-all shadow-[0_4px_20px_rgba(234,88,12,0.25)] hover:shadow-[0_4px_24px_rgba(234,88,12,0.4)] flex items-center gap-2"
            >
              <Link href="/sign-in" className="flex items-center gap-2">
                Get Started for Free <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-12 px-8 rounded-full bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 font-medium text-sm transition-all flex items-center gap-2 shadow-sm"
            >
              <Book className="w-4 h-4 text-stone-400" /> Documentation
            </Button>
          </div>

          {/* 3D App Visual */}
          <div className="perspective-container w-full max-w-5xl mx-auto h-[500px] md:h-[600px] flex justify-center animate-fade-up delay-3">
            {/* Mockup Container */}
            <div
              className="hero-interface w-full h-full bg-white rounded-xl border border-stone-200 overflow-hidden flex flex-row relative"
              style={{
                transform:
                  "rotateX(20deg) rotateY(-10deg) rotateZ(4deg) scale(0.9)",
                transition: "transform 0.5s ease-out",
                boxShadow:
                  "0 0 0 1px rgba(0,0,0,0.05), 0 20px 50px -10px rgba(0,0,0,0.15), 0 40px 80px -20px rgba(0,0,0,0.1)",
              }}
            >
              {/* Sidebar Mockup */}
              <div className="hidden md:flex w-64 bg-stone-50 border-r border-stone-100 h-full p-4 flex-col gap-4">
                <div className="h-8 w-full bg-white border border-stone-200 rounded-md shadow-sm flex items-center px-2">
                  <div className="w-2 h-2 rounded-full bg-red-400 mr-1.5"></div>
                  <div className="w-2 h-2 rounded-full bg-amber-400 mr-1.5"></div>
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-12 bg-stone-200 rounded-full mb-4"></div>
                  <div className="h-20 w-full bg-white border border-stone-200 rounded-lg">
                    <h1 className="text-[8px] leading-3 text-stone-500 py-2 px-4">
                      Create a poem on sky, flower and moon.
                      <br />
                    </h1>
                  </div>
                  <div className="h-20 w-full bg-white border border-stone-200 rounded-lg opacity-50"></div>
                </div>
                <div className="mt-auto h-10 bg-stone-900 rounded-lg w-full opacity-10"></div>
              </div>

              {/* Main Content Mockup */}
              <div className="flex-1 flex flex-col bg-white">
                <div className="h-14 border-b border-stone-100 flex items-center justify-between px-6">
                  <div className="w-24 h-3 bg-stone-100 rounded-full"></div>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 bg-stone-50 rounded-full"></div>
                    <div className="w-8 h-8 bg-stone-50 rounded-full"></div>
                  </div>
                </div>
                <div className="p-8 grid grid-cols-2 gap-6">
                  <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm">
                    <div className="flex justify-between mb-4">
                      <div className="w-16 h-3 bg-stone-100 rounded-full"></div>
                      <div className="w-4 h-4 bg-green-100 rounded-full text-green-600 flex items-center justify-center">
                        <Check className="w-2 h-2" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="w-full h-2 bg-stone-50 rounded-full"></div>
                      <div className="w-3/4 h-2 bg-stone-50 rounded-full"></div>
                      <div className="w-5/6 h-2 bg-stone-50 rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-white border-2 border-orange-100 rounded-xl p-5 shadow-lg shadow-orange-500/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-orange-500 text-white text-[8px] px-2 py-1 rounded-bl-lg font-bold tracking-wider">
                      BEST
                    </div>
                    <div className="flex justify-between mb-4">
                      <div className="w-20 h-3 bg-stone-100 rounded-full"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="w-full h-2 bg-orange-50/50 rounded-full"></div>
                      <div className="w-full h-2 bg-orange-50/50 rounded-full"></div>
                      <div className="w-2/3 h-2 bg-orange-50/50 rounded-full"></div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <div className="h-4 w-12 bg-stone-100 rounded text-[8px] flex items-center justify-center text-stone-400">
                        98ms
                      </div>
                      <div className="h-4 w-12 bg-green-50 rounded text-[8px] flex items-center justify-center text-green-600">
                        99%
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h1 className="text-[8px] leading-3 text-stone-500 py-2 px-4">
                    © Powered by LLM Labs , Brain child of GenAI Labs
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="border-y border-stone-100 bg-white py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-8">
            Trusted by engineering teams at
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2 text-xl font-bold font-sans tracking-tighter text-stone-800">
              <div className="w-5 h-5 bg-stone-800 rounded-full"></div> GenAI
              Labs
            </div>
            <div className="flex items-center gap-2 text-xl font-semibold font-serif text-stone-800">
              <Triangle className="w-5 h-5 fill-current" /> CSEAI
            </div>
            <div className="flex items-center gap-2 text-xl font-bold font-mono text-stone-800">
              <Box className="w-5 h-5" /> LLM Labs
            </div>
            <div className="flex items-center gap-2 text-xl font-medium italic text-stone-800">
              <Layers className="w-5 h-5" /> Layers
            </div>
            <div className="flex items-center gap-2 text-xl font-bold tracking-wide text-stone-800">
              <Globe className="w-5 h-5" /> Global
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section
        className="py-24 lg:py-32 bg-stone-50 relative scroll-mt-20"
        id="features"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16 md:text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-semibold text-stone-900 tracking-tight mb-4">
              Precision tools for the prompt era.
            </h2>
            <p className="text-stone-500 leading-relaxed">
              We provide the granular control typically reserved for machine
              learning engineers, wrapped in a beautiful interface designed for
              product teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-xl hover:shadow-stone-200/50 transition-all duration-300">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-6 text-orange-600 group-hover:scale-110 transition-transform">
                <SlidersHorizontal className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-medium text-stone-900 mb-3">
                Parameter Sweeps
              </h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                Systematically vary temperature, top_p, and tokens. Run batch
                experiments to find the exact settings that yield the best
                results.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-xl hover:shadow-stone-200/50 transition-all duration-300">
              <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center mb-6 text-stone-700 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-medium text-stone-900 mb-3">
                Automated Metrics
              </h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                Instantly score responses on coherence, completeness, and
                structural quality using our proprietary metric algorithms.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-xl hover:shadow-stone-200/50 transition-all duration-300">
              <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center mb-6 text-stone-700 group-hover:scale-110 transition-transform">
                <FlaskConical className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-medium text-stone-900 mb-3">
                Visual Comparison
              </h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                Compare outputs side-by-side. Identify patterns and outliers
                with a dashboard designed for high-velocity iteration.
              </p>
            </div>
          </div>

          {/* Large Feature Layout */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-10 bg-stone-900 rounded-2xl text-white flex flex-col justify-between h-[400px] relative overflow-hidden">
              <div className="relative z-10 mb-8 pb-8">
                <h3 className="text-xl font-medium mb-3">
                  Data-Driven Decisions
                </h3>
                <p className="text-stone-400 text-sm max-w-sm leading-relaxed">
                  Turn qualitative &quot;vibes&quot; into quantitative data. Our
                  scoring engine evaluates every response, giving you objective
                  benchmarks.
                </p>
              </div>

              {/* Code Abstract Visual */}
              <div className="absolute right-0 bottom-0 w-1/2 h-[60%] bg-stone-800 rounded-tl-2xl p-6 border-t border-l border-stone-700 shadow-2xl">
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                </div>
                <div className="space-y-3 font-mono text-xs text-stone-400">
                  <div className="flex gap-4 justify-between border-b border-stone-700 pb-2">
                    <span className="text-stone-500">METRIC</span>
                    <span className="text-stone-500">SCORE</span>
                  </div>
                  <div className="flex gap-4 justify-between">
                    <span className="text-blue-400">Coherence</span>
                    <span className="text-white">0.98</span>
                  </div>
                  <div className="flex gap-4 justify-between">
                    <span className="text-purple-400">Completeness</span>
                    <span className="text-white">0.95</span>
                  </div>
                  <div className="flex gap-4 justify-between">
                    <span className="text-orange-400">Structure</span>
                    <span className="text-white">1.00</span>
                  </div>
                  <div className="pt-2 text-stone-600 text-[10px]">
                    // Analysis complete
                  </div>
                </div>
              </div>
            </div>

            <div className="p-10 bg-orange-500 rounded-2xl text-white flex flex-col justify-between h-[400px] relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl font-medium mb-2">Experiment History</h3>
                <p className="text-orange-100 text-sm max-w-sm">
                  Never lose a breakthrough. Automatically save every
                  experiment, response, and configuration to your history for
                  future reference.
                </p>
              </div>

              {/* History Visual */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center transform rotate-6 transition-transform hover:rotate-0">
                    <History className="w-8 h-8 text-orange-600" />
                  </div>
                  <div className="absolute top-10 left-10 bg-stone-900 text-white text-[10px] px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-green-400" />
                    Experiment #42 Saved
                  </div>
                </div>
              </div>

              <div
                className="absolute bottom-0 left-0 w-full h-32 opacity-50"
                style={{
                  background:
                    "linear-gradient(to top, rgb(234, 88, 12), transparent)",
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        className="py-24 bg-white border-t border-stone-100 scroll-mt-20"
        id="pricing"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-stone-900 tracking-tight mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-stone-500 text-lg max-w-2xl mx-auto">
              Choose the plan that fits your team. Upgrade or downgrade at any
              time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Tier */}
            <div className="p-8 bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-stone-900 mb-2">
                  Free
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-semibold text-stone-900">
                    $0
                  </span>
                  <span className="text-stone-500">/month</span>
                </div>
                <p className="text-sm text-stone-500 mt-2">
                  Perfect for getting started
                </p>
              </div>

              <Button
                variant="outline"
                className="w-full mb-8 rounded-full border-stone-200 hover:bg-stone-50"
                asChild
              >
                <Link href="/sign-in">Get Started</Link>
              </Button>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-stone-400 mt-0.5 shrink-0" />
                  <span className="text-sm text-stone-600">
                    Up to 100 API calls/month
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-stone-400 mt-0.5 shrink-0" />
                  <span className="text-sm text-stone-600">
                    Basic prompt tuning
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-stone-400 mt-0.5 shrink-0" />
                  <span className="text-sm text-stone-600">
                    Community support
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-stone-400 mt-0.5 shrink-0" />
                  <span className="text-sm text-stone-600">1 project</span>
                </li>
              </ul>
            </div>

            {/* Pro Tier - Featured */}
            <div className="p-8 bg-white rounded-2xl border-2 border-orange-200 shadow-xl hover:shadow-2xl transition-all duration-300 relative">
              <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs px-3 py-1 rounded-bl-lg rounded-tr-2xl font-semibold tracking-wider">
                POPULAR
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-stone-900 mb-2">
                  Pro
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-semibold text-stone-900">
                    $29
                  </span>
                  <span className="text-stone-500">/month</span>
                </div>
                <p className="text-sm text-stone-500 mt-2">For growing teams</p>
              </div>

              <Button
                className="w-full mb-8 rounded-full bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 transition-all"
                asChild
              >
                <Link href="/sign-in">Start Free Trial</Link>
              </Button>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-orange-600 mt-0.5 shrink-0" />
                  <span className="text-sm text-stone-600">
                    10,000 API calls/month
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-orange-600 mt-0.5 shrink-0" />
                  <span className="text-sm text-stone-600">
                    Advanced prompt tuning
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-orange-600 mt-0.5 shrink-0" />
                  <span className="text-sm text-stone-600">
                    Latency benchmarking
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-orange-600 mt-0.5 shrink-0" />
                  <span className="text-sm text-stone-600">
                    Priority support
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-orange-600 mt-0.5 shrink-0" />
                  <span className="text-sm text-stone-600">
                    Unlimited projects
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-orange-600 mt-0.5 shrink-0" />
                  <span className="text-sm text-stone-600">TypeScript SDK</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-orange-600 mt-0.5 shrink-0" />
                  <span className="text-sm text-stone-600">
                    Regression testing
                  </span>
                </li>
              </ul>
            </div>

            {/* Enterprise Tier */}
            <div className="p-8 bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-stone-900 mb-2">
                  Enterprise
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-semibold text-stone-900">
                    Custom
                  </span>
                </div>
                <p className="text-sm text-stone-500 mt-2">
                  For large organizations
                </p>
              </div>

              <Button
                variant="outline"
                className="w-full mb-8 rounded-full border-stone-200 hover:bg-stone-50"
                asChild
              >
                <Link href="/sign-in">Contact Sales</Link>
              </Button>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-stone-400 mt-0.5 shrink-0" />
                  <span className="text-sm text-stone-600">
                    Unlimited API calls
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-stone-400 mt-0.5 shrink-0" />
                  <span className="text-sm text-stone-600">
                    All Pro features
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-stone-400 mt-0.5 shrink-0" />
                  <span className="text-sm text-stone-600">
                    Dedicated support
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-stone-400 mt-0.5 shrink-0" />
                  <span className="text-sm text-stone-600">
                    Custom integrations
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-stone-400 mt-0.5 shrink-0" />
                  <span className="text-sm text-stone-600">SLA guarantee</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-stone-400 mt-0.5 shrink-0" />
                  <span className="text-sm text-stone-600">
                    On-premise deployment
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-stone-400 mt-0.5 shrink-0" />
                  <span className="text-sm text-stone-600">Team training</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white border-t border-stone-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold text-stone-900 tracking-tight mb-6">
            Ready to tune your models?
          </h2>
          <p className="text-stone-500 mb-10 text-lg">
            Join 10,000+ developers building reliable AI products.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="h-12 w-full sm:w-80 px-4 rounded-lg bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm"
            />
            <Button className="h-12 px-8 w-full sm:w-auto rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-medium text-sm shadow-lg transition-all">
              Get Early Access
            </Button>
          </div>
          <p className="mt-4 text-xs text-stone-400">
            No credit card required. Free tier available.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-50 border-t border-stone-200 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between gap-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-stone-900 rounded-md flex items-center justify-center text-white">
                  <SlidersHorizontal className="w-3 h-3" />
                </div>
                <span className="font-semibold text-sm tracking-tight">
                  Model Tuner
                </span>
              </div>
              <p className="text-stone-400 text-sm max-w-xs">
                Designed for developers who demand precision in a probabilistic
                world.
              </p>
              <div className="flex gap-4 text-stone-400">
                <Twitter className="w-4 h-4 hover:text-stone-900 cursor-pointer transition-colors" />
                <Github className="w-4 h-4 hover:text-stone-900 cursor-pointer transition-colors" />
                <Linkedin className="w-4 h-4 hover:text-stone-900 cursor-pointer transition-colors" />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-sm">
              <div>
                <h4 className="font-semibold text-stone-900 mb-4">Product</h4>
                <ul className="space-y-2 text-stone-500">
                  <li>
                    <Link
                      href="#"
                      className="hover:text-stone-900 transition-colors"
                    >
                      Playground
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-stone-900 transition-colors"
                    >
                      SDKs
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-stone-900 transition-colors"
                    >
                      Observability
                    </Link>
                  </li>
                  {/* <li>
                    <Link
                      href="#"
                      className="hover:text-stone-900 transition-colors"
                    >
                      Enterprise
                    </Link>
                  </li> */}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-stone-900 mb-4">Resources</h4>
                <ul className="space-y-2 text-stone-500">
                  <li>
                    <Link
                      href="#"
                      className="hover:text-stone-900 transition-colors"
                    >
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-stone-900 transition-colors"
                    >
                      API Reference
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-stone-900 transition-colors"
                    >
                      Blog
                    </Link>
                  </li>
                  {/* <li>
                    <Link
                      href="#"
                      className="hover:text-stone-900 transition-colors"
                    >
                      Community
                    </Link>
                  </li> */}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-stone-900 mb-4">Company</h4>
                <ul className="space-y-2 text-stone-500">
                  <li>
                    <Link
                      href="#"
                      className="hover:text-stone-900 transition-colors"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-stone-900 transition-colors"
                    >
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-stone-900 transition-colors"
                    >
                      Legal
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-400">
            <p>&copy; 2025 Model Tuner Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-stone-900">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-stone-900">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-up {
          animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
          transform: translateY(20px);
        }

        .delay-1 {
          animation-delay: 0.1s;
        }

        .delay-2 {
          animation-delay: 0.2s;
        }

        .delay-3 {
          animation-delay: 0.3s;
        }

        .perspective-container {
          perspective: 2000px;
        }

        .hero-interface:hover {
          transform: rotateX(10deg) rotateY(-5deg) rotateZ(2deg) scale(0.95)
            translateY(-10px) !important;
          box-shadow: 0 0 0 1px rgba(249, 115, 22, 0.3),
            0 30px 60px -12px rgba(0, 0, 0, 0.2),
            0 50px 90px -20px rgba(249, 115, 22, 0.15) !important;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
