// import { useState } from "react";
// import { Link } from "@remix-run/react";
import { TaskListProvider, useTaskList } from "~/context/TaskListContext";
import { Nav } from "~/components/Nav";
import { Hero } from "~/components/Hero";
import { PropertyCatalog } from "~/components/PropertyCatalog";
import { ScriptBuilderFAB } from "~/components/ScriptBuilder";

/**
 * Home route – wraps everything in TaskListProvider so
 * any child component can read / mutate the queued tasks.
 */
export default function Home() {
  return (
    <TaskListProvider>
      <main className="flex min-h-screen flex-col">
        <Nav />
        <Hero />
        {/* -------- What is a Figma Script -------- */}
        <section className="mx-auto w-full max-w-5xl px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              What is a Figma Script?
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              A <strong className="text-gray-900">Figma Script</strong> is a short snippet of JavaScript you
              run inside Figma's Console or via custom actions in the{" "}
              <em className="text-blue-600 font-medium">Shortcuts</em> plugin. It's the fastest way to automate
              repetitive tasks—no compile step, instant undo, AI‑friendly.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            <MiniSnippet 
              label="Round corners" 
              icon="🔄"
              description="Quickly apply consistent corner radius to any element"
            >
              node.cornerRadius&nbsp;=&nbsp;8
            </MiniSnippet>
            <MiniSnippet 
              label="Font size" 
              icon="📝"
              description="Instantly adjust text properties across selections"
            >
              node.fontSize&nbsp;=&nbsp;12
            </MiniSnippet>
            <MiniSnippet 
              label="Set gap" 
              icon="📏"
              description="Control spacing in auto-layout frames effortlessly"
            >
              node.itemSpacing&nbsp;=&nbsp;16
            </MiniSnippet>
          </div>
          
          {/* Features grid */}
          <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <span className="text-xl">⚡</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Instant</h3>
              <p className="text-sm text-gray-600 mt-2">No compile step, run immediately in Figma</p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                <span className="text-xl">↩️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Undoable</h3>
              <p className="text-sm text-gray-600 mt-2">All changes support Figma's undo system</p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                <span className="text-xl">🤖</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">AI-Friendly</h3>
              <p className="text-sm text-gray-600 mt-2">Perfect format for AI assistants to generate</p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
                <span className="text-xl">🎯</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Precise</h3>
              <p className="text-sm text-gray-600 mt-2">Target specific elements with surgical precision</p>
            </div>
          </div>
        </section>

        {/* -------- Friendly API Docs -------- */}
        <PropertyCatalog />

        {/* Floating Script‑Builder */}
        <ScriptBuilderFAB />
      </main>
    </TaskListProvider>
  );
}

/* --- local helper --- */
function MiniSnippet({
  label,
  children,
  icon,
  description,
}: {
  label: string;
  children: React.ReactNode;
  icon: string;
  description: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:scale-105">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
      <div className="relative">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">{icon}</span>
          <div className="font-semibold text-gray-900">{label}</div>
        </div>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <div className="bg-gray-50 rounded-lg p-4 border">
          <code className="text-sm font-mono text-gray-800">{children}</code>
        </div>
      </div>
    </div>
  );
}