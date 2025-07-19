import type { Route } from "./+types/home";
import { TaskListProvider, useTaskList } from "~/context/TaskListContext";
import { Nav } from "~/components/Nav";
import { Hero } from "~/components/Hero";
import { PropertyCatalog } from "~/components/PropertyCatalog";
import { ScriptBuilderFAB } from "~/components/ScriptBuilder";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Figma Scripts - Automate Your Design Workflow | FigmaScript.com" },
    { 
      name: "description", 
      content: "Discover powerful Figma Scripts to automate repetitive design tasks. Run JavaScript instantly in Figma Console. No compile step, instant undo, AI-friendly automation for designers." 
    },
    { 
      name: "keywords", 
      content: "Figma Scripts, Figma automation, design automation, Figma JavaScript, design workflow, Figma Console, UI automation, design tools, Figma API, design productivity" 
    },
    { name: "author", content: "FigmaScript" },
    { name: "robots", content: "index, follow" },
    { name: "googlebot", content: "index, follow" },
    // Canonical URL
    { rel: "canonical", href: "https://figmascript.com" },
    // Open Graph tags
    { property: "og:type", content: "website" },
    { property: "og:title", content: "Figma Scripts - Automate Your Design Workflow" },
    { property: "og:url", content: "https://figmascript.com" },
    { 
      property: "og:description", 
      content: "Discover powerful Figma Scripts to automate repetitive design tasks. Run JavaScript instantly in Figma Console with no compile step and instant undo support." 
    },
    { property: "og:site_name", content: "FigmaScript" },
    { property: "og:locale", content: "en_US" },
    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Figma Scripts - Automate Your Design Workflow" },
    { 
      name: "twitter:description", 
      content: "Discover powerful Figma Scripts to automate repetitive design tasks. Run JavaScript instantly in Figma Console." 
    },
    // Additional SEO tags
    { name: "theme-color", content: "#6366f1" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "default" },
    { name: "format-detection", content: "telephone=no" },
  ];
};

/**
 * Home route – wraps everything in TaskListProvider so
 * any child component can read / mutate the queued tasks.
 */
export default function Home() {
  return (
    <TaskListProvider>
      {/* JSON-LD Structured Data for Homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Figma Scripts - Automate Your Design Workflow",
            "description": "Discover powerful Figma Scripts to automate repetitive design tasks. Run JavaScript instantly in Figma Console.",
            "url": "https://figmascript.com",
            "mainEntity": {
              "@type": "SoftwareApplication",
              "name": "Figma Scripts",
              "applicationCategory": "DesignApplication",
              "operatingSystem": "Web Browser",
              "description": "JavaScript automation scripts for Figma design tool",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": [
                "Instant execution in Figma Console",
                "No compile step required",
                "Undo support",
                "AI-friendly format"
              ]
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://figmascript.com"
                }
              ]
            }
          })
        }}
      />
      <main className="flex min-h-screen flex-col">
        <Nav />
        <Hero />
        {/* -------- What is a Figma Script -------- */}
        <section className="mx-auto w-full max-w-5xl px-4 py-20">
          <header className="text-center mb-16">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              What is a Figma Script?
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              A <strong className="text-gray-900">Figma Script</strong> is a short snippet of JavaScript you
              run inside Figma's Console or via custom actions in the{" "}
              <em className="text-blue-600 font-medium">Shortcuts</em> plugin. It's the fastest way to automate
              repetitive tasks—no compile step, instant undo, AI‑friendly.
            </p>
          </header>
          
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