import React, { useEffect } from "react";
import { Nav } from "~/components/Nav";

// Declare Tally on window for TypeScript
declare global {
  interface Window {
    Tally?: { loadEmbeds: () => void };
  }
}

export default function CustomScript() {
  // Dynamically load Tally embed script and initialize embeds
  useEffect(() => {
    const w = "https://tally.so/widgets/embed.js";
    const v = function () {
      if (typeof window.Tally !== "undefined") {
        window.Tally.loadEmbeds();
      } else {
        document.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((e) => {
          (e as HTMLIFrameElement).src = (e as HTMLIFrameElement).dataset.tallySrc || "";
        });
      }
    };
    if (typeof window.Tally !== "undefined") {
      v();
    } else if (!document.querySelector(`script[src="${w}"]`)) {
      const s = document.createElement("script");
      s.src = w;
      s.onload = v;
      s.onerror = v;
      document.body.appendChild(s);
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-gray-50 to-white">
      <Nav />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 opacity-60" />
        <div className="absolute top-20 left-1/3 w-40 h-40 bg-purple-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/3 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl" />
        
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700 ring-1 ring-purple-200/50 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            Custom Solutions Available
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl mb-6">
            Unlock Your Team's{" "}
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Full Potential
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Custom Figma Scripts and Plugins tailored to your workflow
          </p>
          
          {/* Benefits grid */}
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                <span className="text-xl">⚡</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Save Time</h3>
              <p className="text-sm text-gray-600 mt-2">Automate repetitive tasks and focus on creativity</p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <span className="text-xl">🎯</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Boost Productivity</h3>
              <p className="text-sm text-gray-600 mt-2">Custom tools that fit your exact workflow needs</p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4">
                <span className="text-xl">🛠️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Reduce Errors</h3>
              <p className="text-sm text-gray-600 mt-2">Consistent, automated processes mean fewer mistakes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 lg:p-12">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Transform Your Design Workflow
              </h2>
              
              <div className="prose prose-gray max-w-none">
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Do you have repetitive design tasks or unique workflow needs? Our Custom Script Service empowers your team to work smarter, not harder. We create tailor-made Figma plugins and automation scripts that fit your exact requirements—saving time, reducing errors, and boosting productivity.
                </p>
                
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Whether you need to automate tedious processes, enforce design consistency, or integrate Figma with your favorite tools, we're here to help. Let us know your needs, and we'll deliver a solution that helps your team move faster and focus on what matters most: great design.
                </p>
              </div>

              {/* Form Section */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-100">
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Ready to Get Started?
                  </h3>
                  <p className="text-gray-600">
                    Fill out the form below to request your custom Figma script or plugin. We'll contact you via email to discuss your project.
                  </p>
                </div>
                
                {/* Tally Form embed */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div style={{ minHeight: 400 }}>
                    <iframe
                      data-tally-src="https://tally.so/embed/3q8oBd?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                      loading="lazy"
                      width="100%"
                      height="400"
                      title="Custom Figma Script/Plugin Service"
                      className="border-0"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 