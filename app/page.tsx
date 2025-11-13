"use client";

import {
  ArrowRight,
  Shield,
  Zap,
  Heart,
  Brain,
  TrendingUp,
  Lock,
  Users,
  Code,
  CheckCircle2,
  Menu,
  X,
  Sparkles,
  Github,
  Twitter,
  Linkedin,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-50">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl blur-sm group-hover:blur-md transition-all" />
                <div className="relative w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Quanto
                </span>
                <div className="text-[10px] text-zinc-500 -mt-1">
                  Emotional AI Banking
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <Link
                href="#features"
                className="text-zinc-400 hover:text-zinc-100 transition-colors text-sm font-medium"
              >
                Features
              </Link>
              <Link
                href="#integration"
                className="text-zinc-400 hover:text-zinc-100 transition-colors text-sm font-medium"
              >
                Integration
              </Link>
              <Link
                href="#impact"
                className="text-zinc-400 hover:text-zinc-100 transition-colors text-sm font-medium"
              >
                Business Impact
              </Link>
              <Link
                href="#team"
                className="text-zinc-400 hover:text-zinc-100 transition-colors text-sm font-medium"
              >
                Team
              </Link>
              <div className="w-px h-6 bg-zinc-800" />
              <button className="text-zinc-400 hover:text-zinc-100 transition-colors text-sm font-medium">
                Sign In
              </button>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-lg font-medium text-sm transition-all shadow-lg shadow-blue-500/20">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-zinc-800 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-zinc-400" />
              ) : (
                <Menu className="w-5 h-5 text-zinc-400" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-6 space-y-4 border-t border-zinc-800/50 animate-slide-up">
              <Link
                href="#features"
                className="block text-zinc-400 hover:text-zinc-100 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#integration"
                className="block text-zinc-400 hover:text-zinc-100 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Integration
              </Link>
              <Link
                href="#impact"
                className="block text-zinc-400 hover:text-zinc-100 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Business Impact
              </Link>
              <Link
                href="#team"
                className="block text-zinc-400 hover:text-zinc-100 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Team
              </Link>
              <div className="pt-4 space-y-3">
                <button className="w-full text-zinc-400 hover:text-zinc-100 transition-colors py-2 text-left">
                  Sign In
                </button>
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium transition-all">
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-purple-950/20 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_50%)]" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 sm:py-32">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="inline-block">
              <div className="flex items-center gap-2 bg-blue-950/50 border border-blue-900/50 px-4 py-2 rounded-full text-sm text-blue-300">
                <Zap className="w-4 h-4" />
                <span>Emotionally Intelligent Banking</span>
              </div>
            </div>

            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight">
              Money Moves.
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Quanto Listens.
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
              The AI-powered personalization engine that transforms banking data
              into human empathy. Move beyond traditional segmentation to
              emotionally intelligent, context-aware experiences.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2">
                Schedule a Demo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-100 px-8 py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2">
                <Code className="w-5 h-5" />
                View Integration Docs
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="relative py-20 sm:py-32 bg-gradient-to-b from-zinc-950 to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Your Customers Are More Than{" "}
              <span className="text-red-400">Data Points</span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Banks possess oceans of customer data but still fail to connect
              meaningfully.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 space-y-4">
              <div className="w-12 h-12 bg-red-950/50 border border-red-900/50 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-zinc-50">The Reality</h3>
              <p className="text-zinc-400 leading-relaxed">
                Customers receive generic "offers" and cold reminders while
                banks miss the life moments that actually matter—like a new
                baby, a delayed salary, or a business milestone.
              </p>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 space-y-4">
              <div className="w-12 h-12 bg-orange-950/50 border border-orange-900/50 rounded-xl flex items-center justify-center">
                <span className="text-2xl">😔</span>
              </div>
              <h3 className="text-xl font-bold text-zinc-50">
                The Consequence
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                Customers feel unseen and undervalued, leading to lost loyalty
                and churn. They switch banks seeking connection, not just
                transactions.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-950/50 to-purple-950/50 border border-blue-900/50 rounded-2xl p-8 space-y-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-zinc-50">The Gap</h3>
              <p className="text-zinc-400 leading-relaxed">
                There's an empathy gap between what banks know and what
                customers feel. Data without context is just noise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section className="relative py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/20 via-transparent to-blue-950/20" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Meet Quanto: The{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Emotionally Intelligent
              </span>{" "}
              Banking Companion
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Powered by our proprietary 3-Layer Intelligence System
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-4 hover:border-zinc-700 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-blue-400">
                    STEP 1
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-50">Sense</h3>
                </div>
                <p className="text-zinc-400 leading-relaxed">
                  We continuously analyze contextual signals—spending spikes,
                  location changes, and transaction timing—to detect real-life
                  patterns.
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-4 hover:border-zinc-700 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-purple-400">
                    STEP 2
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-50">
                    Understand
                  </h3>
                </div>
                <p className="text-zinc-400 leading-relaxed">
                  Our Generative Insight Engine interprets these signals through
                  an emotion-aware model to identify stress, joy, or anxiety.
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600/20 to-orange-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-4 hover:border-zinc-700 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-pink-600 to-pink-700 rounded-xl flex items-center justify-center">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-pink-400">
                    STEP 3
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-50">Act</h3>
                </div>
                <p className="text-zinc-400 leading-relaxed">
                  We predict the "next best action," delivering
                  hyper-personalized advice, fee waivers, or partner offers that
                  fit the exact moment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities Section */}
      <section
        id="features"
        className="relative py-20 sm:py-32 bg-gradient-to-b from-zinc-950 to-[#0a0a0a]"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Intelligence for Every Moment
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Five response categories that transform how customers experience
              their money
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="bg-blue-950/30 border border-blue-900/50 rounded-2xl p-8 space-y-4 hover:border-blue-800/70 transition-all group">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-semibold text-blue-400 bg-blue-950/50 px-3 py-1 rounded-full">
                  EMPATHETIC
                </span>
              </div>
              <h3 className="text-2xl font-bold text-zinc-50">
                Empathetic Support
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                Detects financial distress (e.g., salary delays). Proactively
                pauses fees or offers overdraft protection before the user asks.
              </p>
              <div className="bg-blue-950/50 border border-blue-900/30 rounded-lg p-4 space-y-2">
                <p className="text-sm text-blue-300 font-medium">Example:</p>
                <p className="text-sm text-zinc-400 italic">
                  "Your salary hasn't arrived. We've waived all transaction fees
                  for 24 hours."
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-amber-950/30 border border-amber-900/50 rounded-2xl p-8 space-y-4 hover:border-amber-800/70 transition-all group">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">⚠️</span>
                </div>
                <span className="text-xs font-semibold text-amber-400 bg-amber-950/50 px-3 py-1 rounded-full">
                  PREVENTIVE
                </span>
              </div>
              <h3 className="text-2xl font-bold text-zinc-50">
                Proactive Prevention
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                Identifies risk patterns like recurring silent charges. Helps
                manage subscriptions before they drain the account.
              </p>
              <div className="bg-amber-950/50 border border-amber-900/30 rounded-lg p-4 space-y-2">
                <p className="text-sm text-amber-300 font-medium">Example:</p>
                <p className="text-sm text-zinc-400 italic">
                  "3 subscriptions renew this weekend (₦7,100). Want to pause
                  one?"
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-purple-950/30 border border-purple-900/50 rounded-2xl p-8 space-y-4 hover:border-purple-800/70 transition-all group">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🎉</span>
                </div>
                <span className="text-xs font-semibold text-purple-400 bg-purple-950/50 px-3 py-1 rounded-full">
                  AMBIENT
                </span>
              </div>
              <h3 className="text-2xl font-bold text-zinc-50">
                Context-Aware Ambient Banking
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                Uses location and cultural trends (e.g., "Detty December").
                Offers real-time mini-trackers to balance enjoyment with budget
                safety.
              </p>
              <div className="bg-purple-950/50 border border-purple-900/30 rounded-lg p-4 space-y-2">
                <p className="text-sm text-purple-300 font-medium">Example:</p>
                <p className="text-sm text-zinc-400 italic">
                  "Detty December is here! Track your fun budget with our party
                  spending tracker."
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-green-950/30 border border-green-900/50 rounded-2xl p-8 space-y-4 hover:border-green-800/70 transition-all group">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🎁</span>
                </div>
                <span className="text-xs font-semibold text-green-400 bg-green-950/50 px-3 py-1 rounded-full">
                  REWARD
                </span>
              </div>
              <h3 className="text-2xl font-bold text-zinc-50">
                Reward-Driven Growth
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                Matches spending milestones with ecosystem partners. Delivers
                instant value through contextual partnerships.
              </p>
              <div className="bg-green-950/50 border border-green-900/30 rounded-lg p-4 space-y-2">
                <p className="text-sm text-green-300 font-medium">Example:</p>
                <p className="text-sm text-zinc-400 italic">
                  "You just booked a flight. Here's 15% off travel insurance
                  with our partner."
                </p>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="md:col-span-2 bg-indigo-950/30 border border-indigo-900/50 rounded-2xl p-8 space-y-4 hover:border-indigo-800/70 transition-all group">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">📚</span>
                </div>
                <span className="text-xs font-semibold text-indigo-400 bg-indigo-950/50 px-3 py-1 rounded-full">
                  EDUCATIONAL
                </span>
              </div>
              <h3 className="text-2xl font-bold text-zinc-50">
                Educational Advisory
              </h3>
              <p className="text-zinc-400 leading-relaxed max-w-3xl">
                Notices high spending velocity after payday. Suggests a "24-hour
                cool-off" period to help the budget go further without being
                judgmental.
              </p>
              <div className="bg-indigo-950/50 border border-indigo-900/30 rounded-lg p-4 space-y-2">
                <p className="text-sm text-indigo-300 font-medium">Example:</p>
                <p className="text-sm text-zinc-400 italic">
                  "You've spent 60% in 3 days. Want to activate a 24-hour
                  cool-off to help your budget last?"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration & Security Section */}
      <section id="integration" className="relative py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Built for Scale, Secured by Ethics
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Enterprise-ready infrastructure with human-centered AI principles
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Integration */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-blue-950/50 border border-blue-900/50 px-4 py-2 rounded-full text-sm text-blue-300">
                <Code className="w-4 h-4" />
                <span>Seamless Integration</span>
              </div>
              <h3 className="text-3xl font-bold text-zinc-50">
                Cloud-Native API Layer
              </h3>
              <p className="text-lg text-zinc-400 leading-relaxed">
                Designed for easy deployment within existing banking systems.
                Compatible with Mobile, Web, and USSD channels.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-zinc-300">
                    RESTful API with comprehensive documentation
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-zinc-300">
                    Webhook support for real-time events
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-zinc-300">
                    SDKs for major languages (Python, Node.js, Java)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-zinc-300">
                    99.9% uptime SLA with global CDN
                  </span>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-green-950/50 border border-green-900/50 px-4 py-2 rounded-full text-sm text-green-300">
                <Lock className="w-4 h-4" />
                <span>The Ethical AI Framework</span>
              </div>
              <h3 className="text-3xl font-bold text-zinc-50">
                Privacy-First Architecture
              </h3>
              <p className="text-lg text-zinc-400 leading-relaxed">
                Users act as co-pilots, controlling what the AI learns. Built
                with NDPR/GDPR compliance from day one.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-zinc-300 font-medium">Privacy First</p>
                    <p className="text-sm text-zinc-500">
                      User consent controls, data anonymization, opt-out anytime
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-zinc-300 font-medium">
                      Human-in-the-Loop
                    </p>
                    <p className="text-sm text-zinc-500">
                      Smart fallback systems flag uncertain interactions for
                      review
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-zinc-300 font-medium">Compliance</p>
                    <p className="text-sm text-zinc-500">
                      NDPR/GDPR transparency with bias detection modules
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Impact Section */}
      <section
        id="impact"
        className="relative py-20 sm:py-32 bg-gradient-to-b from-zinc-950 to-[#0a0a0a]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_50%)]" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Turning Empathy into{" "}
              <span className="text-green-400">Revenue</span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Measurable business outcomes that justify the investment
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-4 hover:border-green-700/50 transition-all group">
              <div className="w-12 h-12 bg-green-950/50 border border-green-900/50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-3xl font-bold text-zinc-50">↓35%</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                <span className="text-zinc-300 font-semibold">
                  Reduce Churn
                </span>{" "}
                through predictive retention triggers
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-4 hover:border-blue-700/50 transition-all group">
              <div className="w-12 h-12 bg-blue-950/50 border border-blue-900/50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-2xl">💎</span>
              </div>
              <h3 className="text-3xl font-bold text-zinc-50">↑42%</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                <span className="text-zinc-300 font-semibold">
                  Maximize LTV
                </span>{" "}
                through hyper-relevant engagement
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-4 hover:border-purple-700/50 transition-all group">
              <div className="w-12 h-12 bg-purple-950/50 border border-purple-900/50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-3xl font-bold text-zinc-50">+3</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                <span className="text-zinc-300 font-semibold">
                  Revenue Streams
                </span>{" "}
                via Partner API Hub commissions
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-4 hover:border-amber-700/50 transition-all group">
              <div className="w-12 h-12 bg-amber-950/50 border border-amber-900/50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-3xl font-bold text-zinc-50">↓58%</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                <span className="text-zinc-300 font-semibold">
                  Reduce Waste
                </span>{" "}
                by targeting real needs with precision
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Team Section */}
      <section id="team" className="relative py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              The Minds Behind the Machine
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              We bridge technology, strategy, and human insight to embody the
              spirit of Quantum Marketing
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4 hover:border-zinc-700 transition-all group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-2xl font-bold text-white">
                SO
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-50">Saka Suliat</h3>
                <p className="text-sm text-zinc-400">
                  Product Strategist & Business Lead
                </p>
              </div>
              <p className="text-sm text-zinc-500 leading-relaxed">
                The bridge between emotion and innovation
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4 hover:border-zinc-700 transition-all group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-2xl font-bold text-white">
                BB
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-50">
                  AbdulBaseet Mustapha
                </h3>
                <p className="text-sm text-zinc-400">AI/ML Engineer</p>
              </div>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Master of scalable AI infrastructure
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4 hover:border-zinc-700 transition-all group">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-600 to-orange-600 rounded-xl flex items-center justify-center text-2xl font-bold text-white">
                AM
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-50">Ononobi Praise</h3>
                <p className="text-sm text-zinc-400">Full Stack Engineer</p>
              </div>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Turning ideas into seamless experiences
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4 hover:border-zinc-700 transition-all group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-blue-600 rounded-xl flex items-center justify-center text-2xl font-bold text-white">
                LA
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-50">
                  AbdulMujeeb Lawal
                </h3>
                <p className="text-sm text-zinc-400">Project Manager</p>
              </div>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Aligning vision, design, and execution
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 sm:py-32 bg-gradient-to-b from-zinc-950 to-[#0a0a0a] border-t border-zinc-800">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-purple-950/20 to-transparent" />

        <div className="relative max-w-5xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-4xl sm:text-6xl font-bold">
            Make Banking{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Personal
            </span>{" "}
            Again.
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Join the pilot phase to integrate Quantum Personalization into your
            sandbox.
          </p>
          <button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-5 rounded-xl font-bold text-xl transition-all shadow-2xl shadow-blue-500/25 flex items-center justify-center gap-3 mx-auto">
            Partner with Us
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-zinc-800">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-950/50" />

        <div className="relative max-w-7xl mx-auto px-6 py-16">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
            {/* Brand Column */}
            <div className="lg:col-span-2 space-y-6">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl blur-sm group-hover:blur-md transition-all" />
                  <div className="relative w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Quanto
                  </span>
                  <div className="text-[10px] text-zinc-500 -mt-1">
                    Emotional AI Banking
                  </div>
                </div>
              </Link>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
                Transforming banking data into human empathy through emotionally
                intelligent AI. We bridge the gap between transactions and
                genuine customer connections.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg flex items-center justify-center transition-all group"
                >
                  <Twitter className="w-4 h-4 text-zinc-400 group-hover:text-blue-400 transition-colors" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg flex items-center justify-center transition-all group"
                >
                  <Github className="w-4 h-4 text-zinc-400 group-hover:text-zinc-100 transition-colors" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg flex items-center justify-center transition-all group"
                >
                  <Linkedin className="w-4 h-4 text-zinc-400 group-hover:text-blue-500 transition-colors" />
                </a>
                <a
                  href="mailto:hello@quanto.ai"
                  className="w-10 h-10 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg flex items-center justify-center transition-all group"
                >
                  <Mail className="w-4 h-4 text-zinc-400 group-hover:text-purple-400 transition-colors" />
                </a>
              </div>
            </div>

            {/* Product Column */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-zinc-50 uppercase tracking-wider">
                Product
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#features"
                    className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#integration"
                    className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
                  >
                    Integration
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
                  >
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
                  >
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-zinc-50 uppercase tracking-wider">
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#team"
                    className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
                  >
                    Press Kit
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Column */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-zinc-50 uppercase tracking-wider">
                Legal
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
                  >
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
                  >
                    Data Processing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
                  >
                    GDPR Compliance
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="border-t border-zinc-800 pt-12 mb-12">
            <div className="max-w-2xl mx-auto text-center space-y-4">
              <h3 className="text-xl font-bold text-zinc-50">Stay Updated</h3>
              <p className="text-sm text-zinc-400">
                Get the latest insights on AI-powered banking and product
                updates delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-zinc-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-zinc-500">
                © 2025 Quanto. Emotionally Intelligent Banking. All rights
                reserved.
              </p>
              <div className="flex items-center gap-6 text-xs text-zinc-500">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  All systems operational
                </span>
                <span>Built with ❤️ for better banking</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
