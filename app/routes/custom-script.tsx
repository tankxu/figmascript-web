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
    <main className="flex min-h-screen flex-col">
      <Nav />
      <section className="py-16">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="mb-8 text-3xl font-bold">Unlock Your Team’s Full Potential with Custom Figma Scripts and Plugins</h2>
          <div className="flex flex-col gap-4 mb-6 text-base text-neutral-800">
            <p>
              Do you have repetitive design tasks or unique workflow needs? Our Custom Script Service empowers your team to work smarter, not harder. We create tailor-made Figma plugins and automation scripts that fit your exact requirements—saving time, reducing errors, and boosting productivity.
            </p>
            <p>
              Whether you need to automate tedious processes, enforce design consistency, or integrate Figma with your favorite tools, we’re here to help. Let us know your needs, and we’ll deliver a solution that helps your team move faster and focus on what matters most: great design.
            </p>
          </div>
        </div>
        <div className="bg-neutral-100 py-12 rounded-xl mx-auto max-w-4xl px-4 mt-16">
          <div className="max-w-2xl mx-auto px-4">
          <h3 className="mb-3 text-2xl font-bold">
            Start to custom your Figma script or plugin
          </h3>
          <p className="mb-8 text-base text-neutral-500">
            Please fill out the form below to request a custom Figma script or plugin. We will contact you via email.
          </p>
          {/* Tally Form embed. The script is loaded via useEffect. */}
          <div style={{ minHeight: 379 }}>
            <iframe
              data-tally-src="https://tally.so/embed/3q8oBd?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
              loading="lazy"
              width="100%"
              height="379"
              title="Custom Figma Script/Plugin Service"
            ></iframe>
          </div>
          </div>
        </div>
      </section>
    </main>
  );
} 