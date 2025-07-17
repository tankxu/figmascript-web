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
        <section className="mx-auto w-full max-w-3xl space-y-6 px-4 py-16">
          <h2 className="text-2xl font-semibold">What is a Figma Script?</h2>
          <p>
            A <strong>Figma Script</strong> is a short snippet of JavaScript you
            run inside Figma’s Console or via custom actions in the{" "}
            <em>Shortcuts</em> plugin. It’s the fastest way to automate
            repetitive tasks—no compile step, instant undo, AI‑friendly.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <MiniSnippet label="Round corners">
              node.cornerRadius&nbsp;=&nbsp;8
            </MiniSnippet>
            <MiniSnippet label="Font size">
              node.fontSize&nbsp;=&nbsp;12
            </MiniSnippet>
            <MiniSnippet label="Set gap">
              node.itemSpacing&nbsp;=&nbsp;16
            </MiniSnippet>
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
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-md border bg-muted p-4 text-sm">
      <div className="mb-1 font-medium">{label}</div>
      <code className="whitespace-pre">{children}</code>
    </div>
  );
}